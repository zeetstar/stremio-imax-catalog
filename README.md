# IMAX Movies Catalog — Stremio Addon

A Stremio addon that provides a curated catalog of movies with known IMAX versions (expanded aspect ratio, open matte, IMAX Enhanced).

## Updating the Movie Database

The addon can read its movie list from a **Google Sheet** — no code changes or redeployment needed. Just edit the sheet and the addon picks up changes within 10 minutes.

### Setting Up the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Set up these column headers in Row 1:

| imdb | title | year | ratio | tags |
|------|-------|------|-------|------|
| tt15398776 | Oppenheimer | 2023 | 1.43:1 sequences | nolan,drama,biography |
| tt4154756 | Avengers: Infinity War | 2018 | 1.90:1 full | marvel,mcu,action |

3. You can import the included `sheet-template.csv` to get started: File > Import > Upload
4. Make the sheet public: Click **Share** > **Anyone with the link** > **Viewer**
5. Copy the Sheet ID from the URL — it's the long string between `/d/` and `/edit`:
   ```
   https://docs.google.com/spreadsheets/d/THIS_IS_YOUR_SHEET_ID/edit
   ```

### Connecting the Sheet to the Addon

Set the `SHEET_ID` environment variable on Render:

1. Go to your Render dashboard > stremio-imax-catalog service
2. Click **Environment** in the sidebar
3. Add a new variable:
   - Key: `SHEET_ID`
   - Value: your Google Sheet ID
4. Click **Save Changes** — Render will auto-redeploy

### Column Reference

| Column | Required | Description | Example |
|--------|----------|-------------|---------|
| `imdb` | Yes | IMDb ID starting with `tt` | `tt15398776` |
| `title` | Yes | Movie display name | `Oppenheimer` |
| `year` | Yes | Release year | `2023` |
| `ratio` | Yes | IMAX aspect ratio info | `1.43:1 sequences` |
| `tags` | Yes | Comma-separated genre tags | `nolan,drama,biography` |

### Available Tags for Filtering

`nolan`, `marvel`, `mcu`, `dc`, `star-wars`, `sci-fi`, `action`, `horror`, `animation`, `family`, `fantasy`, `drama`, `monsterverse`, `cameron`, `bond`, `mi`, `war`, `comedy`, `thriller`, `musical`, `biography`

## Community Contributions

Want to suggest a movie to add? Open a GitHub Issue with:
- Movie title
- IMDb link
- IMAX ratio (1.43:1, 1.90:1, 1.85:1, etc.)
- Confirmation it has a digital IMAX release (Blu-ray, Disney+, streaming)

## Features

- **3 Catalogs:** IMAX Movies (all), IMAX 1.43:1 (full frame), IMAX 1.90:1 (expanded)
- **Genre filtering:** Marvel, Nolan, DC, Sci-Fi, etc.
- **Search** across titles, tags, and ratio info
- **Live updates** via Google Sheet (no redeploy needed)
- **Fallback** to local database if Sheet is unavailable

## Quick Start (Local)

```bash
npm install
npm start
```

Install in Stremio: `http://localhost:7000/manifest.json`

## License

MIT
