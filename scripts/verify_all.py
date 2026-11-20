import asyncio
import json
import subprocess
import time
import urllib.request
import websockets

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

port_counter = 9300

def get_next_port():
    global port_counter
    port_counter += 1
    return port_counter

async def cdp_call(ws, method, params=None, msg_id=[1]):
    mid = msg_id[0]
    msg_id[0] += 1
    msg = {"id": mid, "method": method, "params": params or {}}
    await ws.send(json.dumps(msg))
    while True:
        resp = json.loads(await ws.recv())
        if resp.get("id") == mid:
            return resp.get("result", {})

async def test_viewport_overflow(w, h):
    port = get_next_port()
    proc = subprocess.Popen([
        chrome_path,
        "--headless=new",
        f"--remote-debugging-port={port}",
        f"--window-size={w},{h}",
        "http://localhost:3000"
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    await asyncio.sleep(1.2)
    try:
        req = urllib.request.urlopen(f"http://localhost:{port}/json", timeout=5)
        tabs = json.loads(req.read().decode())
        ws_url = tabs[0]["webSocketDebuggerUrl"]

        async with websockets.connect(ws_url) as ws:
            eval_res = await cdp_call(ws, "Runtime.evaluate", {
                "expression": "JSON.stringify({ scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth, hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth })",
                "returnByValue": True
            })
            val = json.loads(eval_res.get("result", {}).get("value", "{}"))
            return val
    except Exception as e:
        return {"error": str(e)}
    finally:
        proc.terminate()
        proc.wait()

async def test_fast_scroll():
    port = get_next_port()
    proc = subprocess.Popen([
        chrome_path,
        "--headless=new",
        f"--remote-debugging-port={port}",
        "--window-size=1280,800",
        "http://localhost:3000"
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    await asyncio.sleep(1.2)
    try:
        req = urllib.request.urlopen(f"http://localhost:{port}/json", timeout=5)
        tabs = json.loads(req.read().decode())
        ws_url = tabs[0]["webSocketDebuggerUrl"]

        async with websockets.connect(ws_url) as ws:
            await asyncio.sleep(0.5)

            # Rapid flick to bottom
            await cdp_call(ws, "Runtime.evaluate", {
                "expression": "window.scrollTo(0, document.body.scrollHeight)"
            })
            await asyncio.sleep(0.3)

            # Rapid flick back to top
            await cdp_call(ws, "Runtime.evaluate", {
                "expression": "window.scrollTo(0, 0)"
            })
            await asyncio.sleep(0.4)

            eval_res = await cdp_call(ws, "Runtime.evaluate", {
                "expression": """
                (() => {
                    const elements = Array.from(document.querySelectorAll('[data-reveal]'));
                    const stuckHidden = elements.filter(el => {
                        const style = window.getComputedStyle(el);
                        return parseFloat(style.opacity) < 0.5 && el.getBoundingClientRect().top < window.innerHeight;
                    });
                    return JSON.stringify({
                        totalReveals: elements.length,
                        stuckHiddenCount: stuckHidden.length,
                        allRevealed: stuckHidden.length === 0
                    });
                })()
                """,
                "returnByValue": True
            })
            return json.loads(eval_res.get("result", {}).get("value", "{}"))
    except Exception as e:
        return {"error": str(e)}
    finally:
        proc.terminate()
        proc.wait()

async def test_reduced_motion():
    port = get_next_port()
    proc = subprocess.Popen([
        chrome_path,
        "--headless=new",
        f"--remote-debugging-port={port}",
        "--window-size=1280,800",
        "http://localhost:3000"
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    await asyncio.sleep(1.2)
    try:
        req = urllib.request.urlopen(f"http://localhost:{port}/json", timeout=5)
        tabs = json.loads(req.read().decode())
        ws_url = tabs[0]["webSocketDebuggerUrl"]

        async with websockets.connect(ws_url) as ws:
            await cdp_call(ws, "Emulation.setEmulatedMedia", {
                "media": "screen",
                "features": [{"name": "prefers-reduced-motion", "value": "reduce"}]
            })
            await cdp_call(ws, "Page.reload")
            await asyncio.sleep(0.8)

            eval_res = await cdp_call(ws, "Runtime.evaluate", {
                "expression": """
                (() => {
                    const elements = Array.from(document.querySelectorAll('[data-reveal]'));
                    const visibleCount = elements.filter(el => {
                        const style = window.getComputedStyle(el);
                        return parseFloat(style.opacity) === 1;
                    }).length;
                    return JSON.stringify({
                        totalReveals: elements.length,
                        instantlyVisibleCount: visibleCount,
                        reducedMotionHonored: visibleCount === elements.length
                    });
                })()
                """,
                "returnByValue": True
            })
            return json.loads(eval_res.get("result", {}).get("value", "{}"))
    except Exception as e:
        return {"error": str(e)}
    finally:
        proc.terminate()
        proc.wait()

async def test_throttled_cpu_scroll():
    port = get_next_port()
    proc = subprocess.Popen([
        chrome_path,
        "--headless=new",
        f"--remote-debugging-port={port}",
        "--window-size=1280,800",
        "http://localhost:3000"
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    await asyncio.sleep(1.2)
    try:
        req = urllib.request.urlopen(f"http://localhost:{port}/json", timeout=5)
        tabs = json.loads(req.read().decode())
        ws_url = tabs[0]["webSocketDebuggerUrl"]

        async with websockets.connect(ws_url) as ws:
            # Set 4x CPU slowdown
            await cdp_call(ws, "Emulation.setCPUThrottlingRate", {"rate": 4})
            await asyncio.sleep(0.5)

            eval_res = await cdp_call(ws, "Runtime.evaluate", {
                "expression": """
                new Promise(resolve => {
                    const frameTimes = [];
                    let lastTime = performance.now();
                    let step = 0;
                    function onFrame() {
                        const now = performance.now();
                        frameTimes.push(now - lastTime);
                        lastTime = now;
                        window.scrollBy(0, 80);
                        step++;
                        if (step < 35) {
                            requestAnimationFrame(onFrame);
                        } else {
                            const avgDelta = frameTimes.reduce((a,b) => a+b, 0) / frameTimes.length;
                            const longTasks = frameTimes.filter(t => t > 50);
                            const approxFps = 1000 / avgDelta;
                            resolve(JSON.stringify({
                                totalFrames: frameTimes.length,
                                avgDeltaMs: Math.round(avgDelta * 10) / 10,
                                approxFps: Math.round(approxFps),
                                longTasksOver50ms: longTasks.length
                            }));
                        }
                    }
                    requestAnimationFrame(onFrame);
                })
                """,
                "awaitPromise": True,
                "returnByValue": True
            })
            return json.loads(eval_res.get("result", {}).get("value", "{}"))
    except Exception as e:
        return {"error": str(e)}
    finally:
        proc.terminate()
        proc.wait()

async def main():
    print("=== LANDSCAPE VIEWPORTS OVERFLOW ===")
    landscape = [("844x390_iphone_landscape", 844, 390), ("800x360_android_landscape", 800, 360)]
    for name, w, h in landscape:
        res = await test_viewport_overflow(w, h)
        status = "PASSED (0 overflow)" if not res.get("hasHorizontalScroll") else "FAILED"
        print(f"  [{name}] {w}x{h}: scrollWidth={res.get('scrollWidth')}px, innerWidth={res.get('innerWidth')}px -> {status}")

    print("\n=== FAST SCROLL TEST (FLICK TO BOTTOM & BACK) ===")
    fs = await test_fast_scroll()
    print(f"  Total reveal items: {fs.get('totalReveals')}")
    print(f"  Stuck hidden count: {fs.get('stuckHiddenCount')}")
    print(f"  All revealed properly: {fs.get('allRevealed')}")

    print("\n=== 4x CPU THROTTLED SCROLL TEST ===")
    cpu = await test_throttled_cpu_scroll()
    print(f"  Avg frame delta: {cpu.get('avgDeltaMs')} ms")
    print(f"  Approx scroll FPS: {cpu.get('approxFps')} FPS")
    print(f"  Long tasks > 50ms during scroll: {cpu.get('longTasksOver50ms')}")

    print("\n=== PREFERS-REDUCED-MOTION TEST ===")
    rm = await test_reduced_motion()
    print(f"  Total items: {rm.get('totalReveals')}")
    print(f"  Instantly visible: {rm.get('instantlyVisibleCount')}")
    print(f"  Reduced motion honored: {rm.get('reducedMotionHonored')}")

asyncio.run(main())
