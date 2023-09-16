require("dotenv").config();
const { google } = require("googleapis");

const fetchVideoStatistics = (videoId) => {
  return google
    .youtube("v3")
    .videos.list({
      key: process.env.YOUTUBE_TOKEN,
      part: "snippet,statistics",
      id: videoId,
    })
    .then((response) => {
      const { data } = response;
      const video = data.items[0];
      if (video) {
        console.log(`Title: ${video.snippet.title}\n`);
        const views = video.statistics.viewCount;
        console.log(`Views: ${views}\n`);
        const likes = video.statistics.likeCount;
        console.log(`Likes: ${likes}\n`);
        const comments = video.statistics.commentCount;
        console.log(`Comments: ${comments}\n`);
      } else {
        console.log(`No data available for video with ID: ${videoId}`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const searchAndFetchStatistics = () => {
  return google
    .youtube("v3")
    .search.list({
      key: process.env.YOUTUBE_TOKEN,
      part: "snippet",
      q: "best ships starfield",
      maxResults: 3,
    })
    .then((response) => {
      const { data } = response;
      const videoItems = data.items.filter(
        (item) => item.id.kind === "youtube#video"
      );
      const videoIds = videoItems.map((item) => item.id.videoId);
      return videoIds;
    })
    .then((videoIds) => {
      return Promise.all(videoIds.map(fetchVideoStatistics));
    })
    .catch((err) => {
      console.log(err);
    });
};

// Call the function
searchAndFetchStatistics();
