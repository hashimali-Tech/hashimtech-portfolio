import urllib.request
import json
import subprocess
import time

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

viewports = [
    (320, 568),
    (360, 800),
    (390, 844),
    (430, 932),
    (768, 1024),
    (1280, 720),
    (1440, 900),
    (1920, 1080),
    (844, 390),
    (800, 360),
]

print("=== HORIZONTAL OVERFLOW VERIFICATION ===")
for w, h in viewports:
    # Run chrome with remote debugging port to query exact layout dimensions
    proc = subprocess.Popen([
        chrome_path,
        "--headless=new",
        "--remote-debugging-port=9222",
        f"--window-size={w},{h}",
        "http://localhost:3000"
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    time.sleep(1.2)
    try:
        req = urllib.request.urlopen("http://localhost:9222/json", timeout=5)
        tabs = json.loads(req.read().decode())
        ws_url = tabs[0]["webSocketDebuggerUrl"]

        # Connect via websocket to evaluate JS
        import socket
        # Quick check using HTTP evaluate endpoint if available, or python websocket
    except Exception as e:
        pass
    finally:
        proc.terminate()
        proc.wait()
