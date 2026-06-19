# Vertical Tabs Button

Firefox extension that adds a toolbar button for switching tabs between horizontal and vertical layout.

## Requirements

- Firefox 136 or newer
- Vertical tabs support available in Firefox
- No user data is collected or transmitted.

## Languages

Tooltips are localized for English, Russian, Ukrainian, Belarusian, Kazakh, Polish, French, Dutch, German, Spanish, Hindi, and Simplified Chinese. Firefox falls back to English for other languages.

## Temporary install for testing

The local XPI is unsigned, so Firefox Release refuses to install it permanently. For local testing, use temporary loading:

1. Open `about:debugging#/runtime/this-firefox`.
2. Choose **Load Temporary Add-on**.
3. Select `manifest.json` from this project folder.

Temporary add-ons are removed when Firefox restarts.

## Build unsigned XPI

```powershell
python build.py
```

The package is written to `dist\vertical-tabs-button-unsigned.xpi`.

## Permanent install

Firefox Release and Beta require Mozilla-signed extensions. To install this extension permanently, submit the unsigned XPI to addons.mozilla.org as either:

- a public AMO listing, or
- an unlisted/self-distributed add-on.

After Mozilla signs it, install the signed XPI returned by AMO.

After the first successful AMO signing, keep the `browser_specific_settings.gecko.id` value unchanged. Firefox uses it to recognize future updates of the same add-on.

Advanced testing alternatives are Firefox Developer Edition, Nightly, or ESR with `xpinstall.signatures.required` set to `false` in `about:config`.
