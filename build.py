from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile



ROOT_DIR = Path(__file__).resolve().parent
DIST_DIR = ROOT_DIR / "dist"
PACKAGE_PATH = DIST_DIR / "vertical-tabs-button-unsigned.xpi"
PACKAGE_FILES = (
    "manifest.json",
    "vertical_tabs_button.js",
    "vertical_tabs_off.svg",
    "vertical_tabs_on.svg",
)



def build_package() -> Path:
    DIST_DIR.mkdir(exist_ok=True)

    with ZipFile(PACKAGE_PATH, "w", ZIP_DEFLATED) as package_file:
        for relative_path in PACKAGE_FILES:
            source_path = ROOT_DIR / relative_path
            package_file.write(source_path, relative_path)

        for source_path in sorted((ROOT_DIR / "_locales").rglob("messages.json")):
            relative_path = source_path.relative_to(ROOT_DIR)
            package_file.write(source_path, relative_path)

    return PACKAGE_PATH



if __name__ == "__main__":
    package_path = build_package()
    print(package_path)
