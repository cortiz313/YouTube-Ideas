require("dotenv").config();
const { google } = require("googleapis");

// Make a function and wrap this process in here and return the data
google
  .youtube("v3")
  .search.list({
    key: process.env.YOUTUBE_TOKEN,
    part: "snippet",
    q: "Better Ideas",
    maxResults: 10,
  })
  .then((response) => {
    const { data } = response;
    data.items.forEach((item) => {
      console.log(`Title: ${item.snippet.title}\n`);
      const views = item.snippet.views;
      console.log(`Views: ${views}\n`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
