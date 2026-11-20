import subprocess
import os
import json
import time

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
screenshots_dir = r"g:\portfolio\verification-screenshots"
os.makedirs(screenshots_dir, exist_ok=True)

viewports = [
    ("320x568_mobile_small", 320, 568),
    ("360x800_android", 360, 800),
    ("390x844_iphone", 390, 844),
    ("430x932_iphone_promax", 430, 932),
    ("768x1024_tablet", 768, 1024),
    ("1280x720_desktop_hd", 1280, 720),
    ("1440x900_macbook", 1440, 900),
    ("1920x1080_desktop_fhd", 1920, 1080),
    ("844x390_iphone_landscape", 844, 390),
    ("800x360_android_landscape", 800, 360),
]

results = []

for name, w, h in viewports:
    out_file = os.path.join(screenshots_dir, f"{name}.png")
    cmd = [
        chrome_path,
        "--headless=new",
        "--disable-gpu",
        f"--window-size={w},{h}",
        f"--screenshot={out_file}",
        "http://localhost:3000",
    ]
    t0 = time.time()
    res = subprocess.run(cmd, capture_output=True, text=True, timeout=20)
    dur = time.time() - t0
    exists = os.path.exists(out_file)
    sz = os.path.getsize(out_file) if exists else 0
    results.append({
        "viewport": name,
        "width": w,
        "height": h,
        "saved": exists,
        "size_bytes": sz,
        "file": out_file,
        "duration_s": round(dur, 2)
    })
    print(f"[{name}] {w}x{h} -> {sz} bytes in {round(dur, 2)}s")

with open(os.path.join(screenshots_dir, "viewport-audit.json"), "w") as f:
    json.dump(results, f, indent=2)

print("\nAll screenshots captured successfully!")
