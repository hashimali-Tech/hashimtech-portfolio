import gzip
import os
import urllib.request
import re

req = urllib.request.urlopen("http://localhost:3000")
html = req.read().decode("utf-8")

# Parse script tags
script_tags = re.findall(r'<script\s+([^>]+)>', html)
print(f"Found {len(script_tags)} script tags in initial HTML:\n")

modern_raw = 0
modern_gz = 0
nomodule_raw = 0
nomodule_gz = 0

for tag in script_tags:
    src_match = re.search(r'src="(/_next/static/[^"]+\.js)"', tag)
    if not src_match:
        continue
    src = src_match.group(1)
    is_nomodule = "noModule" in tag
    
    rel_path = src.replace("/_next/", "").replace("/", os.sep)
    fpath = os.path.join(".next", rel_path)
    if os.path.exists(fpath):
        raw = os.path.getsize(fpath)
        with open(fpath, "rb") as fp:
            gz = len(gzip.compress(fp.read()))
        
        status = "[noModule - legacy polyfill, not loaded by modern browsers]" if is_nomodule else "[MODERN BUNDLE - loaded by modern browsers]"
        print(f"  {os.path.basename(fpath):<30} : raw={raw/1024:>6.2f} KB | gzip={gz/1024:>6.2f} KB {status}")
        
        if is_nomodule:
            nomodule_raw += raw
            nomodule_gz += gz
        else:
            modern_raw += raw
            modern_gz += gz

print("\n" + "=" * 65)
print(f"Modern First-Load JS (actually loaded): {modern_raw/1024:.2f} KB raw | {modern_gz/1024:.2f} KB gzipped")
print(f"Target (< 150 KB gzipped): {'PASSED' if modern_gz/1024 < 150 else 'FAILED'}")
print(f"Legacy noModule polyfills (ignored by modern browsers): {nomodule_gz/1024:.2f} KB gzipped")
print("=" * 65)
