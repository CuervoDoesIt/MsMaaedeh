# Language switching (English / فارسی)

This app supports switching the UI language between **English (en)** and **Persian / Farsi (fa)**.

## How it works

- The language toggle is in the top navigation bar.
- The selected language is persisted in `localStorage` under the key `msmaaedeh.lang`.
- When the language changes, the app updates the document attributes:
  - `document.documentElement.lang` → `en` or `fa`
  - `document.documentElement.dir` → `ltr` for English, `rtl` for Farsi

## Where translations live

All translations are currently defined in:

- [src/i18n.ts](src/i18n.ts)

The translation structure is grouped by page/component (e.g. `nav.*`, `home.*`, `contact.*`).

## Adding or editing text

1. Add a new key under `en.translation` in [src/i18n.ts](src/i18n.ts).
2. Add the matching key under `fa.translation`.
3. In the React component, replace the hard-coded string with:

   - `const { t } = useTranslation()`
   - `t('your.key.path')`

## Notes

- Data-driven UI (e.g. workshop cards, catering packages, gallery items) uses translation keys so that *all displayed text* can be localized.
- If you introduce new UI strings, prefer adding them to the same section (page/component) in `src/i18n.ts` to keep things easy to maintain.
