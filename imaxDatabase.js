// Curated database of movies with known IMAX versions
// Each entry includes IMDb ID, title, year, IMAX ratio info, and category tags
// Sources: IMAX Enhanced releases, Disney+ IMAX Enhanced, open matte releases

const imaxMovies = [
  // ===================== CHRISTOPHER NOLAN =====================
  { imdb: "tt0468569", title: "The Dark Knight", year: 2008, ratio: "1.43:1 sequences", tags: ["nolan", "dc", "action"] },
  { imdb: "tt1345836", title: "The Dark Knight Rises", year: 2012, ratio: "1.43:1 sequences", tags: ["nolan", "dc", "action"] },
  { imdb: "tt0816692", title: "Interstellar", year: 2014, ratio: "1.43:1 sequences", tags: ["nolan", "sci-fi"] },
  { imdb: "tt5013056", title: "Dunkirk", year: 2017, ratio: "1.43:1 sequences", tags: ["nolan", "war"] },
  { imdb: "tt6723592", title: "Tenet", year: 2020, ratio: "1.43:1 sequences", tags: ["nolan", "sci-fi", "action"] },
  { imdb: "tt15398776", title: "Oppenheimer", year: 2023, ratio: "1.43:1 sequences", tags: ["nolan", "drama", "biography"] },

  // ===================== MCU / MARVEL =====================
  { imdb: "tt4154756", title: "Avengers: Infinity War", year: 2018, ratio: "1.90:1 full", tags: ["marvel", "mcu", "action"] },
  { imdb: "tt4154796", title: "Avengers: Endgame", year: 2019, ratio: "1.90:1 full", tags: ["marvel", "mcu", "action"] },
  { imdb: "tt9032400", title: "Eternals", year: 2021, ratio: "1.90:1 full", tags: ["marvel", "mcu", "action"] },
  { imdb: "tt9376612", title: "Shang-Chi and the Legend of the Ten Rings", year: 2021, ratio: "1.90:1 full", tags: ["marvel", "mcu", "action"] },
  { imdb: "tt10872600", title: "Spider-Man: No Way Home", year: 2021, ratio: "1.90:1 full", tags: ["marvel", "mcu", "action"] },
  { imdb: "tt9419884", title: "Doctor Strange in the Multiverse of Madness", year: 2022, ratio: "1.90:1 full", tags: ["marvel", "mcu", "action"] },
  { imdb: "tt10648342", title: "Thor: Love and Thunder", year: 2022, ratio: "1.90:1 full", tags: ["marvel", "mcu", "action"] },
  { imdb: "tt9114286", title: "Black Panther: Wakanda Forever", year: 2022, ratio: "1.90:1 full", tags: ["marvel", "mcu", "action"] },
  { imdb: "tt10954600", title: "Ant-Man and the Wasp: Quantumania", year: 2023, ratio: "1.90:1 full", tags: ["marvel", "mcu", "action"] },
  { imdb: "tt6791350", title: "Guardians of the Galaxy Vol. 3", year: 2023, ratio: "1.90:1 full", tags: ["marvel", "mcu", "action"] },
  { imdb: "tt10676048", title: "The Marvels", year: 2023, ratio: "1.90:1 full", tags: ["marvel", "mcu", "action"] },
  { imdb: "tt14513804", title: "Deadpool & Wolverine", year: 2024, ratio: "1.90:1 full", tags: ["marvel", "mcu", "action"] },
  { imdb: "tt6263850", title: "Black Widow", year: 2021, ratio: "1.90:1 full", tags: ["marvel", "mcu", "action"] },
  { imdb: "tt1825683", title: "Black Panther", year: 2018, ratio: "1.90:1 full", tags: ["marvel", "mcu", "action"] },
  { imdb: "tt2250912", title: "Spider-Man: Homecoming", year: 2017, ratio: "1.90:1 full", tags: ["marvel", "mcu", "action"] },
  { imdb: "tt4633694", title: "Spider-Man: Far from Home", year: 2019, ratio: "1.90:1 full", tags: ["marvel", "mcu", "action"] },
  { imdb: "tt1211837", title: "Doctor Strange", year: 2016, ratio: "1.90:1 full", tags: ["marvel", "mcu", "action"] },
  { imdb: "tt3498820", title: "Captain America: Civil War", year: 2016, ratio: "1.90:1 full", tags: ["marvel", "mcu", "action"] },
  { imdb: "tt3501632", title: "Thor: Ragnarok", year: 2017, ratio: "1.90:1 full", tags: ["marvel", "mcu", "action"] },
  { imdb: "tt5095030", title: "Ant-Man and the Wasp", year: 2018, ratio: "1.90:1 full", tags: ["marvel", "mcu", "action"] },
  { imdb: "tt0478970", title: "Ant-Man", year: 2015, ratio: "1.90:1 full", tags: ["marvel", "mcu", "action"] },
  { imdb: "tt2395427", title: "Avengers: Age of Ultron", year: 2015, ratio: "1.90:1 full", tags: ["marvel", "mcu", "action"] },
  { imdb: "tt0848228", title: "The Avengers", year: 2012, ratio: "1.90:1 full", tags: ["marvel", "mcu", "action"] },
  { imdb: "tt4154664", title: "Captain Marvel", year: 2019, ratio: "1.90:1 full", tags: ["marvel", "mcu", "action"] },
  { imdb: "tt3896198", title: "Guardians of the Galaxy Vol. 2", year: 2017, ratio: "1.90:1 full", tags: ["marvel", "mcu", "action"] },
  { imdb: "tt2015381", title: "Guardians of the Galaxy", year: 2014, ratio: "1.90:1 full", tags: ["marvel", "mcu", "action"] },

  // ===================== DC =====================
  { imdb: "tt1877830", title: "The Batman", year: 2022, ratio: "1.85:1 IMAX", tags: ["dc", "action"] },
  { imdb: "tt0770828", title: "Man of Steel", year: 2013, ratio: "1.43:1 sequences", tags: ["dc", "action"] },
  { imdb: "tt2975590", title: "Batman v Superman: Dawn of Justice", year: 2016, ratio: "1.43:1 sequences", tags: ["dc", "action"] },
  { imdb: "tt0974015", title: "Justice League", year: 2017, ratio: "1.43:1 Snyder Cut", tags: ["dc", "action"] },
  { imdb: "tt12361974", title: "Zack Snyder's Justice League", year: 2021, ratio: "1.33:1 full", tags: ["dc", "action"] },
  { imdb: "tt1160419", title: "Dune", year: 2021, ratio: "1.43:1 sequences", tags: ["sci-fi", "action"] },
  { imdb: "tt15239678", title: "Dune: Part Two", year: 2024, ratio: "1.43:1 sequences", tags: ["sci-fi", "action"] },
  { imdb: "tt7286456", title: "Joker", year: 2019, ratio: "1.85:1 IMAX open matte", tags: ["dc", "drama"] },
  { imdb: "tt11315808", title: "Joker: Folie à Deux", year: 2024, ratio: "1.85:1 IMAX", tags: ["dc", "drama"] },
  { imdb: "tt1630029", title: "Avatar: The Way of Water", year: 2022, ratio: "1.43:1 sequences", tags: ["sci-fi", "action", "cameron"] },

  // ===================== SCI-FI / ACTION BLOCKBUSTERS =====================
  { imdb: "tt0499549", title: "Avatar", year: 2009, ratio: "1.78:1 IMAX", tags: ["sci-fi", "action", "cameron"] },
  { imdb: "tt1375666", title: "Inception", year: 2010, ratio: "1.43:1 sequences", tags: ["nolan", "sci-fi", "action"] },
  { imdb: "tt3170832", title: "No Time to Die", year: 2021, ratio: "1.43:1 sequences", tags: ["action", "bond"] },
  { imdb: "tt1745960", title: "Top Gun: Maverick", year: 2022, ratio: "1.90:1 sequences", tags: ["action"] },
  { imdb: "tt5177120", title: "The Flash", year: 2023, ratio: "1.90:1 full", tags: ["dc", "action"] },
  { imdb: "tt6718170", title: "The Super Mario Bros. Movie", year: 2023, ratio: "1.90:1 full", tags: ["animation", "family"] },
  { imdb: "tt1517268", title: "Barbie", year: 2023, ratio: "1.90:1 IMAX", tags: ["comedy"] },
  { imdb: "tt5433140", title: "Fast X", year: 2023, ratio: "1.90:1 IMAX", tags: ["action"] },
  { imdb: "tt6443346", title: "Black Adam", year: 2022, ratio: "1.90:1 IMAX", tags: ["dc", "action"] },
  { imdb: "tt1160419", title: "Dune", year: 2021, ratio: "1.43:1 sequences", tags: ["sci-fi", "action"] },

  // ===================== MISSION: IMPOSSIBLE =====================
  { imdb: "tt2381249", title: "Mission: Impossible - Rogue Nation", year: 2015, ratio: "1.90:1 IMAX", tags: ["action", "mi"] },
  { imdb: "tt4912910", title: "Mission: Impossible - Fallout", year: 2018, ratio: "1.90:1 sequences", tags: ["action", "mi"] },
  { imdb: "tt9603212", title: "Mission: Impossible - Dead Reckoning Part One", year: 2023, ratio: "1.43:1 sequences", tags: ["action", "mi"] },
  { imdb: "tt13991232", title: "Mission: Impossible - The Final Reckoning", year: 2025, ratio: "1.43:1 sequences", tags: ["action", "mi"] },

  // ===================== TRANSFORMERS =====================
  { imdb: "tt2109248", title: "Transformers: Age of Extinction", year: 2014, ratio: "1.90:1 IMAX sequences", tags: ["action", "sci-fi"] },
  { imdb: "tt3371366", title: "Transformers: The Last Knight", year: 2017, ratio: "1.90:1 IMAX sequences", tags: ["action", "sci-fi"] },
  { imdb: "tt5090568", title: "Transformers: Rise of the Beasts", year: 2023, ratio: "1.90:1 IMAX", tags: ["action", "sci-fi"] },
  { imdb: "tt14858658", title: "Transformers One", year: 2024, ratio: "1.90:1 IMAX", tags: ["animation", "action"] },

  // ===================== STAR WARS =====================
  { imdb: "tt2488496", title: "Star Wars: The Force Awakens", year: 2015, ratio: "1.90:1 IMAX", tags: ["star-wars", "sci-fi", "action"] },
  { imdb: "tt2527336", title: "Star Wars: The Last Jedi", year: 2017, ratio: "1.90:1 IMAX", tags: ["star-wars", "sci-fi", "action"] },
  { imdb: "tt2527338", title: "Star Wars: The Rise of Skywalker", year: 2019, ratio: "1.90:1 IMAX", tags: ["star-wars", "sci-fi", "action"] },
  { imdb: "tt3748528", title: "Rogue One: A Star Wars Story", year: 2016, ratio: "1.90:1 IMAX", tags: ["star-wars", "sci-fi", "action"] },

  // ===================== DISNEY / PIXAR =====================
  { imdb: "tt6105098", title: "The Lion King", year: 2019, ratio: "1.43:1 full", tags: ["disney", "animation", "family"] },
  { imdb: "tt8946378", title: "Jungle Cruise", year: 2021, ratio: "1.90:1 IMAX", tags: ["disney", "adventure"] },
  { imdb: "tt5113044", title: "Moana 2", year: 2024, ratio: "1.90:1 IMAX", tags: ["disney", "animation", "family"] },
  { imdb: "tt3521164", title: "Moana", year: 2016, ratio: "1.90:1 IMAX", tags: ["disney", "animation", "family"] },
  { imdb: "tt2948356", title: "Zootopia", year: 2016, ratio: "1.90:1 IMAX", tags: ["disney", "animation", "family"] },
  { imdb: "tt4520988", title: "Frozen II", year: 2019, ratio: "1.90:1 IMAX", tags: ["disney", "animation", "family"] },
  { imdb: "tt1049413", title: "Up", year: 2009, ratio: "1.90:1 IMAX", tags: ["pixar", "animation", "family"] },

  // ===================== HORROR / THRILLER =====================
  { imdb: "tt7784604", title: "Hereditary", year: 2018, ratio: "1.85:1 open matte", tags: ["horror"] },
  { imdb: "tt7349950", title: "It Chapter Two", year: 2019, ratio: "1.90:1 IMAX", tags: ["horror"] },
  { imdb: "tt1396484", title: "It", year: 2017, ratio: "1.90:1 IMAX", tags: ["horror"] },

  // ===================== GODZILLA / MONSTERVERSE =====================
  { imdb: "tt3741700", title: "Godzilla: King of the Monsters", year: 2019, ratio: "1.90:1 IMAX", tags: ["action", "sci-fi", "monsterverse"] },
  { imdb: "tt5034838", title: "Godzilla vs. Kong", year: 2021, ratio: "1.90:1 IMAX", tags: ["action", "sci-fi", "monsterverse"] },
  { imdb: "tt14539740", title: "Godzilla x Kong: The New Empire", year: 2024, ratio: "1.90:1 IMAX", tags: ["action", "sci-fi", "monsterverse"] },
  { imdb: "tt11389872", title: "Godzilla Minus One", year: 2023, ratio: "1.43:1 IMAX", tags: ["action", "sci-fi"] },

  // ===================== RECENT BIG RELEASES =====================
  { imdb: "tt11304740", title: "Furiosa: A Mad Max Saga", year: 2024, ratio: "1.90:1 IMAX", tags: ["action"] },
  { imdb: "tt12037194", title: "Alien: Romulus", year: 2024, ratio: "1.90:1 IMAX", tags: ["sci-fi", "horror"] },
  { imdb: "tt6263850", title: "Gladiator II", year: 2024, ratio: "1.90:1 IMAX", tags: ["action", "drama"] },
  { imdb: "tt13623148", title: "The Wild Robot", year: 2024, ratio: "1.90:1 IMAX", tags: ["animation", "family"] },
  { imdb: "tt11866324", title: "Terrifier 3", year: 2024, ratio: "1.85:1 IMAX", tags: ["horror"] },
  { imdb: "tt14230458", title: "Gladiator II", year: 2024, ratio: "1.90:1 IMAX", tags: ["action", "drama"] },
  { imdb: "tt12747748", title: "Twisters", year: 2024, ratio: "1.90:1 IMAX", tags: ["action", "thriller"] },
  { imdb: "tt6263850", title: "Kingdom of the Planet of the Apes", year: 2024, ratio: "1.90:1 IMAX", tags: ["sci-fi", "action"] },
  { imdb: "tt21692408", title: "Wicked", year: 2024, ratio: "1.90:1 IMAX", tags: ["musical", "fantasy"] },
  { imdb: "tt6166392", title: "Wonka", year: 2023, ratio: "1.90:1 IMAX", tags: ["family", "fantasy"] },
  { imdb: "tt9362722", title: "Spider-Man: Across the Spider-Verse", year: 2023, ratio: "IMAX variable", tags: ["animation", "marvel", "action"] },
  { imdb: "tt6467266", title: "Sing 2", year: 2021, ratio: "1.90:1 IMAX", tags: ["animation", "family"] },

  // ===================== OLDER IMAX FILMS =====================
  { imdb: "tt1663662", title: "Pacific Rim", year: 2013, ratio: "1.90:1 IMAX", tags: ["sci-fi", "action"] },
  { imdb: "tt1170358", title: "The Hobbit: An Unexpected Journey", year: 2012, ratio: "1.90:1 IMAX HFR", tags: ["fantasy", "adventure"] },
  { imdb: "tt1170358", title: "The Hobbit: The Desolation of Smaug", year: 2013, ratio: "1.90:1 IMAX HFR", tags: ["fantasy", "adventure"] },
  { imdb: "tt2310332", title: "The Hobbit: The Battle of the Five Armies", year: 2014, ratio: "1.90:1 IMAX HFR", tags: ["fantasy", "adventure"] },
  { imdb: "tt0120915", title: "Star Wars: Episode I - The Phantom Menace", year: 1999, ratio: "1.43:1 IMAX remaster", tags: ["star-wars", "sci-fi"] },
  { imdb: "tt0167260", title: "The Lord of the Rings: The Return of the King", year: 2003, ratio: "1.90:1 IMAX", tags: ["fantasy", "adventure"] },
  { imdb: "tt0770828", title: "Man of Steel", year: 2013, ratio: "1.43:1 sequences", tags: ["dc", "action"] },
  { imdb: "tt2911666", title: "John Wick: Chapter 2", year: 2017, ratio: "1.85:1 IMAX", tags: ["action"] },
  { imdb: "tt6146586", title: "John Wick: Chapter 3 - Parabellum", year: 2019, ratio: "1.85:1 IMAX", tags: ["action"] },
  { imdb: "tt10366206", title: "John Wick: Chapter 4", year: 2023, ratio: "1.85:1 IMAX", tags: ["action"] },
  { imdb: "tt1049413", title: "Gravity", year: 2013, ratio: "1.90:1 IMAX", tags: ["sci-fi", "thriller"] },
  { imdb: "tt1392190", title: "Mad Max: Fury Road", year: 2015, ratio: "1.90:1 IMAX", tags: ["action"] },
  { imdb: "tt1856101", title: "Blade Runner 2049", year: 2017, ratio: "1.90:1 IMAX", tags: ["sci-fi"] },
  { imdb: "tt6710474", title: "Everything Everywhere All at Once", year: 2022, ratio: "1.85:1 IMAX", tags: ["sci-fi", "action", "comedy"] },
  { imdb: "tt1464335", title: "Gravity", year: 2013, ratio: "1.90:1 IMAX 3D", tags: ["sci-fi", "thriller"] },
  { imdb: "tt1392170", title: "The Hunger Games: Catching Fire", year: 2013, ratio: "1.43:1 sequences", tags: ["action", "sci-fi"] },
  { imdb: "tt3659388", title: "The Martian", year: 2015, ratio: "1.90:1 IMAX", tags: ["sci-fi"] },
  { imdb: "tt1485796", title: "The Greatest Showman", year: 2017, ratio: "1.90:1 IMAX", tags: ["musical", "drama"] },
  { imdb: "tt4123430", title: "Fantastic Beasts: The Crimes of Grindelwald", year: 2018, ratio: "1.90:1 IMAX", tags: ["fantasy"] },
  { imdb: "tt4123432", title: "Fantastic Beasts and Where to Find Them", year: 2016, ratio: "1.90:1 IMAX", tags: ["fantasy"] },
  { imdb: "tt3315342", title: "Logan", year: 2017, ratio: "1.85:1 IMAX", tags: ["marvel", "action"] },
];

// Deduplicate by IMDb ID (keep first occurrence)
const seen = new Set();
const dedupedMovies = imaxMovies.filter((movie) => {
  if (seen.has(movie.imdb)) return false;
  seen.add(movie.imdb);
  return true;
});

module.exports = dedupedMovies;
