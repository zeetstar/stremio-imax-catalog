const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");
const imaxMovies = require("./imaxDatabase");

// ======================== MANIFEST ========================
const manifest = {
  id: "community.imax.catalog",
  version: "1.0.0",
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
  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/IMAX_logo.svg/1200px-IMAX_logo.svg.png",
  idPrefixes: ["tt"],
  behaviorHints: {
    adult: false,
    p2p: false,
  },
};
{
  "stremioAddonsConfig": {
    "issuer": "https://stremio-addons.net",
    "signature": "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..u4MVAS5Z2fajBobIkrDimg.wFRpEs2kVNoUoFJBWrgnjB4kQDHgHMjWak0oZ7vynV9wya2oeYGDXd25G3K2fWQHLEZnj4-LjeCDo1iNck_TTB6nsqDbHH3BCWZEoEJwdqLjECK_gca-HEz5NLomVoe5.dLenJWqzolG6ddAy7ZsgYg"
  }
}
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
builder.defineCatalogHandler(({ type, id, extra }) => {
  if (type !== "movie") return Promise.resolve({ metas: [] });

  let movies = imaxMovies;

  // Filter by catalog
  if (id === "imax-143") {
    movies = movies.filter((m) => m.ratio.includes("1.43") || m.ratio.includes("1.33"));
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

  return Promise.resolve({ metas: moviesToMetas(movies) });
});

// ======================== META HANDLER ========================
builder.defineMetaHandler(({ type, id }) => {
  if (type !== "movie") return Promise.resolve({ meta: null });

  const movie = imaxMovies.find((m) => m.imdb === id);
  if (!movie) return Promise.resolve({ meta: null });

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

  return Promise.resolve({ meta });
});

// ======================== START SERVER ========================
const PORT = process.env.PORT || 7000;

serveHTTP(builder.getInterface(), { port: PORT });

console.log(`
╔══════════════════════════════════════════════════════╗
║          IMAX Movies Catalog - Stremio Addon         ║
╠══════════════════════════════════════════════════════╣
║  Addon running at: http://localhost:${PORT}             ║
║                                                      ║
║  Install in Stremio:                                 ║
║  http://localhost:${PORT}/manifest.json                 ║
║                                                      ║
║  Catalogs:                                           ║
║    • IMAX Movies (all)                               ║
║    • IMAX 1.43:1 (full IMAX frame)                   ║
║    • IMAX 1.90:1 (expanded ratio)                    ║
║                                                      ║
║  Total movies in database: ${imaxMovies.length.toString().padEnd(25)}║
╚══════════════════════════════════════════════════════╝
`);

{
  "stremioAddonsConfig": {
    "issuer": "https://stremio-addons.net",
    "signature": "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..u4MVAS5Z2fajBobIkrDimg.wFRpEs2kVNoUoFJBWrgnjB4kQDHgHMjWak0oZ7vynV9wya2oeYGDXd25G3K2fWQHLEZnj4-LjeCDo1iNck_TTB6nsqDbHH3BCWZEoEJwdqLjECK_gca-HEz5NLomVoe5.dLenJWqzolG6ddAy7ZsgYg"
  }
}
