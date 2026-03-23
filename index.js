const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");
const axios = require("axios");
const localDatabase = require("./imaxDatabase");

// ======================== GOOGLE SHEET CONFIG ========================
// To use a Google Sheet as your database:
// 1. Create a Google Sheet with columns: imdb, title, year, ratio, tags
// 2. Make it public: Share > Anyone with the link > Viewer
// 3. Copy the Sheet ID from the URL and paste it below
// 4. The addon fetches fresh data every 10 minutes
//
// Sheet URL format: https://docs.google.com/spreadsheets/d/SHEET_ID/edit
// Example row: tt0816692 | Interstellar | 2014 | 1.43:1 sequences | nolan,sci-fi

const SHEET_ID = process.env.SHEET_ID || "YOUR_SHEET_ID_HERE";
const SHEET_TAB = process.env.SHEET_TAB || "Sheet1";
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_TAB)}`;

// ======================== CACHING ========================
let cachedMovies = null;
let lastFetchTime = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

async function getMovies() {
  const now = Date.now();

  // Return cache if fresh
  if (cachedMovies && now - lastFetchTime < CACHE_DURATION) {
    return cachedMovies;
  }

  // Try fetching from Google Sheet
  if (SHEET_ID && SHEET_ID !== "YOUR_SHEET_ID_HERE") {
    try {
      console.log("[Sheet] Fetching movie data from Google Sheet...");
      const { data: csv } = await axios.get(SHEET_CSV_URL, { timeout: 10000 });
      const movies = parseCSV(csv);

      if (movies.length > 0) {
        cachedMovies = movies;
        lastFetchTime = now;
        console.log(`[Sheet] Loaded ${movies.length} movies from Google Sheet`);
        return cachedMovies;
      }
    } catch (err) {
      console.error("[Sheet] Failed to fetch from Google Sheet:", err.message);
    }
  }

  // Fallback to local database
  if (!cachedMovies) {
    console.log("[Local] Using local database as fallback");
    cachedMovies = localDatabase;
    lastFetchTime = now;
  }

  return cachedMovies;
}

// ======================== CSV PARSER ========================
function parseCSV(csv) {
  const lines = csv.trim().split("\n");
  if (lines.length < 2) return [];

  // Parse header row
  const headers = parseCSVLine(lines[0]).map((h) => h.toLowerCase().trim());

  const imdbIdx = headers.indexOf("imdb");
  const titleIdx = headers.indexOf("title");
  const yearIdx = headers.indexOf("year");
  const ratioIdx = headers.indexOf("ratio");
  const tagsIdx = headers.indexOf("tags");

  if (imdbIdx === -1 || titleIdx === -1) {
    console.error("[Sheet] Missing required columns: imdb, title");
    return [];
  }

  const movies = [];
  const seen = new Set();

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i]);
    const imdb = (cols[imdbIdx] || "").trim();
    const title = (cols[titleIdx] || "").trim();
    const year = parseInt(cols[yearIdx]) || 0;
    const ratio = (cols[ratioIdx] || "").trim();
    const tagsRaw = (cols[tagsIdx] || "").trim();

    // Skip empty or duplicate rows
    if (!imdb || !title || !imdb.startsWith("tt")) continue;
    if (seen.has(imdb)) continue;
    seen.add(imdb);

    const tags = tagsRaw
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    movies.push({ imdb, title, year, ratio, tags });
  }

  return movies;
}

function parseCSVLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current.replace(/^"|"$/g, ""));
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.replace(/^"|"$/g, ""));
  return result;
}

// ======================== MANIFEST ========================
const manifest = {
  id: "community.imax.catalog",
  version: "1.1.0",
  catalogs: [
    {
      type: "movie",
      id: "imax-all",
      name: "IMAX Movies",
      extra: [
        { name: "genre", isRequired: false },
        { name: "skip", isRequired: false },
        { name: "search", isRequired: false },
      ],
      genres: [
        "Nolan",
        "Marvel",
        "DC",
        "Star Wars",
        "Sci-Fi",
        "Action",
        "Horror",
        "Animation",
        "Family",
        "Fantasy",
        "Drama",
        "Monsterverse",
      ],
    },
    {
      type: "movie",
      id: "imax-143",
      name: "IMAX 1.43:1 (Full Frame)",
      extra: [{ name: "skip", isRequired: false }],
    },
    {
      type: "movie",
      id: "imax-190",
      name: "IMAX 1.90:1 (Expanded)",
      extra: [{ name: "skip", isRequired: false }],
    },
  ],
  resources: ["catalog", "meta"],
  types: ["movie"],
  name: "IMAX Movies Catalog",
  description:
    "Browse movies that have IMAX versions available (expanded aspect ratio, open matte, IMAX Enhanced). Helps you find the right version to stream.",
  logo: "https://raw.githubusercontent.com/zeetstar/stremio-imax-catalog/main/logo.png",
  idPrefixes: ["tt"],
  behaviorHints: {
    adult: false,
    p2p: false,
  },
};

const builder = new addonBuilder(manifest);

// ======================== HELPERS ========================
const PAGE_SIZE = 100;

function moviesToMetas(movies) {
  return movies.map((m) => ({
    id: m.imdb,
    type: "movie",
    name: m.title,
    poster: `https://images.metahub.space/poster/medium/${m.imdb}/img`,
    posterShape: "poster",
    year: m.year,
    description: `IMAX Version: ${m.ratio}`,
    imdbRating: undefined,
    releaseInfo: String(m.year),
    links: [],
    logo: null,
    background: `https://images.metahub.space/background/medium/${m.imdb}/img`,
  }));
}

function filterByGenre(movies, genre) {
  if (!genre) return movies;
  const g = genre.toLowerCase();
  return movies.filter((m) => m.tags.some((t) => t.toLowerCase() === g));
}

function searchMovies(movies, query) {
  if (!query) return movies;
  const q = query.toLowerCase();
  return movies.filter(
    (m) =>
      m.title.toLowerCase().includes(q) ||
      m.tags.some((t) => t.includes(q)) ||
      m.ratio.toLowerCase().includes(q)
  );
}

function paginate(items, skip) {
  const s = parseInt(skip) || 0;
  return items.slice(s, s + PAGE_SIZE);
}

// ======================== CATALOG HANDLER ========================
builder.defineCatalogHandler(async ({ type, id, extra }) => {
  if (type !== "movie") return { metas: [] };

  let movies = await getMovies();

  // Filter by catalog
  if (id === "imax-143") {
    movies = movies.filter(
      (m) => m.ratio.includes("1.43") || m.ratio.includes("1.33")
    );
  } else if (id === "imax-190") {
    movies = movies.filter(
      (m) => m.ratio.includes("1.90") && !m.ratio.includes("1.43")
    );
  }

  // Filter by genre if provided
  if (extra && extra.genre) {
    movies = filterByGenre(movies, extra.genre);
  }

  // Search
  if (extra && extra.search) {
    movies = searchMovies(movies, extra.search);
  }

  // Sort by year descending (newest first)
  movies = [...movies].sort((a, b) => b.year - a.year);

  // Paginate
  const skip = extra && extra.skip ? extra.skip : 0;
  movies = paginate(movies, skip);

  return { metas: moviesToMetas(movies) };
});

// ======================== META HANDLER ========================
builder.defineMetaHandler(async ({ type, id }) => {
  if (type !== "movie") return { meta: null };

  const movies = await getMovies();
  const movie = movies.find((m) => m.imdb === id);
  if (!movie) return { meta: null };

  const meta = {
    id: movie.imdb,
    type: "movie",
    name: movie.title,
    poster: `https://images.metahub.space/poster/medium/${movie.imdb}/img`,
    background: `https://images.metahub.space/background/medium/${movie.imdb}/img`,
    year: movie.year,
    releaseInfo: String(movie.year),
    description: `This film has an IMAX version available.\n\nIMAX Aspect Ratio: ${movie.ratio}\n\nWhen browsing streams, look for releases tagged with "IMAX", "IMAX Enhanced", or "Open Matte" in the filename to get the expanded aspect ratio version.`,
    genres: movie.tags.map((t) => t.charAt(0).toUpperCase() + t.slice(1)),
  };

  return { meta };
});

// ======================== START SERVER ========================
const PORT = process.env.PORT || 7000;

serveHTTP(builder.getInterface(), { port: PORT });

const sheetMode =
  SHEET_ID && SHEET_ID !== "YOUR_SHEET_ID_HERE"
    ? `Google Sheet (${SHEET_ID.substring(0, 12)}...)`
    : "Local database (imaxDatabase.js)";

console.log(`
╔══════════════════════════════════════════════════════╗
║          IMAX Movies Catalog - Stremio Addon         ║
╠══════════════════════════════════════════════════════╣
║  Addon running at: http://localhost:${PORT}             ║
║  Data source: ${sheetMode.padEnd(38)}║
║                                                      ║
║  Catalogs:                                           ║
║    • IMAX Movies (all)                               ║
║    • IMAX 1.43:1 (full IMAX frame)                   ║
║    • IMAX 1.90:1 (expanded ratio)                    ║
╚══════════════════════════════════════════════════════╝
`);
