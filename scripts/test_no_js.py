import asyncio
import json
import os
import subprocess
import tempfile
import urllib.request
import websockets

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
port = 9480

async def cdp_call(ws, method, params=None, msg_id=[1]):
    mid = msg_id[0]
    msg_id[0] += 1
    msg = {"id": mid, "method": method, "params": params or {}}
    await ws.send(json.dumps(msg))
    while True:
        resp = json.loads(await ws.recv())
        if resp.get("id") == mid:
            return resp.get("result", {})

async def test_no_js():
    temp_dir = tempfile.mkdtemp()
    proc = subprocess.Popen([
        chrome_path,
        "--headless=new",
        f"--user-data-dir={temp_dir}",
        f"--remote-debugging-port={port}",
        "--window-size=1280,800",
        "about:blank"
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    await asyncio.sleep(1.5)
    try:
        req = urllib.request.urlopen(f"http://localhost:{port}/json", timeout=5)
        tabs = json.loads(req.read().decode())
        page_tabs = [t for t in tabs if t.get("type") == "page"]
        ws_url = page_tabs[0]["webSocketDebuggerUrl"]

        async with websockets.connect(ws_url) as ws:
            # Disable JS execution
            await cdp_call(ws, "Emulation.setScriptExecutionDisabled", {"value": True})
            await cdp_call(ws, "Page.navigate", {"url": "http://localhost:3000"})
            await asyncio.sleep(2.0)

            # Re-enable JS execution only to query the static DOM computed state
            await cdp_call(ws, "Emulation.setScriptExecutionDisabled", {"value": False})
            eval_res = await cdp_call(ws, "Runtime.evaluate", {
                "expression": """
                (() => {
                    const hasJsClass = document.documentElement.classList.contains('js');
                    const elements = Array.from(document.querySelectorAll('[data-reveal]'));
                    const hiddenCount = elements.filter(el => {
                        const style = window.getComputedStyle(el);
                        return parseFloat(style.opacity) < 0.9;
                    }).length;
                    return JSON.stringify({
                        hasJsClassWhenJsDisabled: hasJsClass,
                        totalReveals: elements.length,
                        hiddenCount: hiddenCount,
                        allVisibleWithoutJs: hiddenCount === 0
                    });
                })()
                """,
                "returnByValue": True
            })
            val = json.loads(eval_res.get("result", {}).get("value", "{}"))
            return val
    except Exception as e:
        return {"error": str(e)}
    finally:
        proc.terminate()
        proc.wait()

async def main():
    print("=== TESTING NO-JS PROGRESSIVE ENHANCEMENT ===")
    res = await test_no_js()
    print(json.dumps(res, indent=2))

asyncio.run(main())
