const { MongoClient } = require("mongodb");
const createError = require("http-errors");

// Initialize MongoDB client
const client = new MongoClient(process.env.MONGO_URI);

function adjustScoresAndSort(results) {
  results.forEach((item) => {
    // Default values if missing
    const imdbRating = item.imdbRating || 1;
    item.year = item.year || 1980;
    item.score = item.score + imdbRating / 20;

    // Round score to 4 decimal places
    item.score = Math.round(item.score * 100) / 100;
  });

  // Sort by score and then by year if scores are tied
  results.sort((a, b) => {
    if (a.score === b.score) {
      return b.year - a.year;
    }
    return b.score - a.score;
  });
  return results;
}

// Search endpoint
const fuzzySearchResults = async (request, response) => {
  const { term } = request.query;
  if (!term) {
    throw createError.BadRequest("Search query is empty");
  }

  try {
    await client.connect();
    const database = client.db(process.env.DB_NAME);
    const coll = database.collection("movies");

    const agg = [
      {
        $search: {
          index: "autocomplete",
          autocomplete: {
            query: `${term}`,
            path: "title",
            fuzzy: {
              maxEdits: 2,
              prefixLength: 3,
              maxExpansions: 100,
            },
          },
        },
      },
      {
        $addFields: {
          customScore: {
            $switch: {
              branches: [
                { case: { $eq: ["$title", term] }, then: 5 },
                {
                  case: {
                    $regexMatch: {
                      input: "$title",
                      regex: new RegExp(`^${term}`, "i"),
                    },
                  },
                  then: 0.2,
                },
              ],
              default: 0,
            },
          },
        },
      },
      {
        $addFields: {
          score: { $add: ["$customScore", { $meta: "searchScore" }] },
        },
      },
      {
        $project: {
          _id: 0,
          title: 1,
          score: 1,
          imdbRating: "$imdb.rating" || 0,
          year: 1,
        },
      },
      { $sort: { score: -1 } },
      { $limit: 40 },
    ];

    const result = await coll.aggregate(agg).toArray();
    const adjustedResults = adjustScoresAndSort(result);

    response.status(200).send(adjustedResults);
  } catch (e) {
    console.error(e);
    throw createError.InternalServerError();
  } finally {
    await client.close();
  }
};

module.exports = fuzzySearchResults;
