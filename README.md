# IMAX Movies Catalog — Stremio Addon

A Stremio addon that provides a curated catalog of movies with known IMAX versions (expanded aspect ratio, open matte, IMAX Enhanced). Browse by ratio type, genre, or search — then use your existing streaming addons (Torrentio, AIOStreams, etc.) to find the IMAX release.

## Features

- **3 Catalogs:**
  - **IMAX Movies** — full list, filterable by genre (Marvel, Nolan, DC, Sci-Fi, etc.)
  - **IMAX 1.43:1** — films shot with full-frame IMAX cameras (the tallest ratio)
  - **IMAX 1.90:1** — films with the standard IMAX expanded ratio
- **Search** across titles, tags, and ratio info
- **Poster art & backgrounds** pulled from Metahub (same source as Cinemeta)
- **Meta descriptions** tell you exactly what IMAX ratio to look for

## Quick Start

```bash
# Clone or copy the addon folder
cd stremio-imax-addon

# Install dependencies
npm install

# Run the addon
npm start
```

The addon runs on `http://localhost:7000` by default.

### Install in Stremio

1. Open Stremio
2. Go to the **Addons** section
3. In the search bar at the top, paste:
   ```
   http://localhost:7000/manifest.json
   ```
4. Click **Install**

You'll now see "IMAX Movies", "IMAX 1.43:1", and "IMAX 1.90:1" catalogs in your Stremio home.

## Deploy Online (Optional)

To access the addon from any device (not just your local machine), deploy it to a free hosting platform:

### Render / Railway / Fly.io
1. Push the project to a GitHub repo
2. Connect the repo to Render/Railway/Fly
3. Set the start command to `npm start`
4. Set the `PORT` environment variable if needed (most platforms auto-detect)
5. Use the deployed URL as your manifest: `https://your-app.onrender.com/manifest.json`

### Beamup (Stremio Community Hosting)
Stremio offers free addon hosting via Beamup:
```bash
npm install -g stremio-beamup
cd stremio-imax-addon
beamup
```

## Adding More Movies

Edit `imaxDatabase.js` to add new entries. Each movie needs:

```js
{
  imdb: "tt1234567",       // IMDb ID
  title: "Movie Title",    // Display name
  year: 2024,              // Release year
  ratio: "1.90:1 IMAX",   // IMAX aspect ratio info
  tags: ["action", "sci-fi"]  // Genre tags for filtering
}
```

The database auto-deduplicates by IMDb ID.

## How to Find IMAX Streams

This addon is a **catalog only** — it helps you discover which movies have IMAX versions. To actually stream them:

1. Browse the IMAX catalog and pick a movie
2. Your streaming addons (Torrentio, AIOStreams, etc.) will show available streams
3. Look for filenames containing: `IMAX`, `IMAX Enhanced`, `Open Matte`, `1.43`, `1.90`
4. With AIOStreams, you can set keyword filters to prioritise IMAX results

## IMAX Ratio Guide

| Ratio | Description |
|-------|-------------|
| **1.43:1** | Full IMAX frame — the tallest image, shot on 15/70mm IMAX film or IMAX digital cameras. Only available on select sequences for most films. |
| **1.90:1** | Standard digital IMAX — wider than 16:9 but not as tall as 1.43. Most modern IMAX releases use this. |
| **1.85:1** | Near-IMAX open matte — slightly more image than the standard 2.39:1 theatrical crop. |
| **1.33:1** | Full frame / Academy ratio — used for Zack Snyder's Justice League. |

## License

MIT — do whatever you want with it.
