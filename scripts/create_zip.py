import os
import zipfile

output_zip = r"G:\portfolio\hashimtech-portfolio.zip"
root_dir = r"G:\portfolio"

exclude_dirs = {
    "node_modules",
    ".next",
    ".git",
    "raw-assets"
}

exclude_files = {
    "hashimtech-portfolio.zip",
    "tsconfig.tsbuildinfo"
}

with zipfile.ZipFile(output_zip, "w", zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(root_dir):
        # Filter directories in-place
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        for f in files:
            if f in exclude_files:
                continue
            abs_path = os.path.join(root, f)
            rel_path = os.path.relpath(abs_path, root_dir)
            zipf.write(abs_path, rel_path)

print(f"Created {output_zip} ({os.path.getsize(output_zip):,} bytes)")
