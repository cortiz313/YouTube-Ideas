// require("dotenv").config();
// const { google } = require("googleapis");
// const {
//   calculateOverallImpactfulness,
// } = require("../algorithm/calculateImpact");

// const fetchVideoStatistics = (videoId) => {
//   return google
//     .youtube("v3")
//     .videos.list({
//       key: process.env.YOUTUBE_TOKEN,
//       part: "snippet,statistics",
//       id: videoId,
//     })
//     .then((response) => {
//       const { data } = response;
//       const video = data.items[0];
//       if (video) {
//         const statistics = video.statistics;
//         if (statistics) {
//           const views = statistics.viewCount;
//           const likes = statistics.likeCount;
//           const comments = statistics.commentCount;
//           const impactfulness = calculateOverallImpactfulness(
//             likes,
//             comments,
//             views
//           );

//           // Print video information and impactfulness score
//           console.log(`Title: ${video.snippet.title}`);
//           console.log(`Views: ${views}`);
//           console.log(`Likes: ${likes}`);
//           console.log(`Comments: ${comments}`);
//           console.log(`Impactfulness Score: ${impactfulness}`);
//           console.log("\n");
//         } else {
//           console.log("Statistics not available for this video.");
//         }
//       } else {
//         console.log(`No data available for video with ID: ${videoId}`);
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// const searchAndFetchStatistics = () => {
//   return google
//     .youtube("v3")
//     .search.list({
//       key: process.env.YOUTUBE_TOKEN,
//       part: "snippet",
//       q: "best ships starfield",
//       maxResults: 3,
//     })
//     .then((response) => {
//       const { data } = response;
//       const videoItems = data.items.filter(
//         (item) => item.id.kind === "youtube#video"
//       );
//       const videoIds = videoItems.map((item) => item.id.videoId);
//       return videoIds;
//     })
//     .then((videoIds) => {
//       return Promise.all(videoIds.map(fetchVideoStatistics));
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// // Call the function
// searchAndFetchStatistics();

// const { exec } = require("child_process");

// exec("python fetchTrends.py", (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error: ${error.message}`);
//     return;
//   }
//   if (stderr) {
//     console.error(`Error: ${stderr}`);
//     return;
//   }
//   const trends = JSON.parse(stdout);
//   // Process the trends data in JavaScript
//   console.log(trends);
// });

// require("dotenv").config();
// const { google } = require("googleapis");
// const {
//   calculateOverallImpactfulness,
// } = require("../algorithm/calculateImpact");

// const fetchVideoStatistics = (videoId) => {
//   return google
//     .youtube("v3")
//     .videos.list({
//       key: process.env.YOUTUBE_TOKEN,
//       part: "snippet,statistics",
//       id: videoId,
//     })
//     .then((response) => {
//       const { data } = response;
//       const video = data.items[0];
//       if (video) {
//         const statistics = video.statistics;
//         if (statistics) {
//           const views = statistics.viewCount;
//           const likes = statistics.likeCount;
//           const comments = statistics.commentCount;
//           const impactfulness = calculateOverallImpactfulness(
//             likes,
//             comments,
//             views
//           );

//           // Return video information and impactfulness score
//           return {
//             video: video,
//             impactfulness: impactfulness,
//           };
//         } else {
//           console.log("Statistics not available for this video.");
//         }
//       } else {
//         console.log(`No data available for video with ID: ${videoId}`);
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// const searchAndFetchStatistics = () => {
//   return google
//     .youtube("v3")
//     .search.list({
//       key: process.env.YOUTUBE_TOKEN,
//       part: "snippet",
//       q: "best ships starfield",
//       maxResults: 3,
//     })
//     .then((response) => {
//       const { data } = response;
//       const videoItems = data.items.filter(
//         (item) => item.id.kind === "youtube#video"
//       );
//       const videoIds = videoItems.map((item) => item.id.videoId);
//       return videoIds;
//     })
//     .then((videoIds) => {
//       return Promise.all(videoIds.map(fetchVideoStatistics));
//     })
//     .then((impactScores) => {
//       // Sort videos by impactfulness score (in descending order)
//       impactScores.sort((a, b) => b.impactfulness - a.impactfulness);

//       // Print videos in order with their scores
//       impactScores.forEach((item, index) => {
//         console.log(`Video ${index + 1}:`);
//         console.log(`Title: ${item.video.snippet.title}`);
//         console.log(`Views: ${item.video.statistics.viewCount}`);
//         console.log(`Likes: ${item.video.statistics.likeCount}`);
//         console.log(`Comments: ${item.video.statistics.commentCount}`);
//         console.log(`Impactfulness Score: ${item.impactfulness}`);
//         console.log("\n");
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// // Call the function
// searchAndFetchStatistics();

function formatUploadDate(isoDate) {
  const date = new Date(isoDate);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  return date.toLocaleDateString("en-US", options);
}

const { exec } = require("child_process");
const path = require("path");

const fetchTrendsScriptPath = path.join(
  __dirname,
  "../algorithm/fetchTrends.py"
);

exec(`python ${fetchTrendsScriptPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Error: ${stderr}`);
    return;
  }
  const trends = JSON.parse(stdout);

  // trends will contain the JSON data fetched from Python
  console.log("Trends fetched from Python:");
  console.log(trends);

  // Now, you can process the trends in JavaScript and call your other functions
  // For example, you can pass the trends to your searchYouTube function

  const { google } = require("googleapis");
  const {
    calculateOverallImpactfulness,
  } = require("../algorithm/calculateImpact");
  require("dotenv").config();

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
          const statistics = video.statistics;
          if (statistics) {
            const views = statistics.viewCount;
            const likes = statistics.likeCount;
            const comments = statistics.commentCount;
            const impactfulness = calculateOverallImpactfulness(
              likes,
              comments,
              views
            );

            // Return video information and impactfulness score
            return {
              video: video,
              impactfulness: impactfulness,
            };
          } else {
            console.log("Statistics not available for this video.");
          }
        } else {
          console.log(`No data available for video with ID: ${videoId}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Define the searchAndFetchStatistics function
  const searchAndFetchStatistics = (query) => {
    return google
      .youtube("v3")
      .search.list({
        key: process.env.YOUTUBE_TOKEN,
        part: "snippet",
        q: query,
        maxResults: 2,
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
      .then((impactScores) => {
        // Sort videos by impactfulness score (in descending order)
        impactScores.sort((a, b) => b.impactfulness - a.impactfulness);

        // Print videos in order with their scores
        impactScores.forEach((item, index) => {
          console.log(`Video ${index + 1}:`);
          console.log(`Title: ${item.video.snippet.title}`);
          console.log(`Views: ${item.video.statistics.viewCount}`);
          console.log(`Likes: ${item.video.statistics.likeCount}`);
          console.log(`Comments: ${item.video.statistics.commentCount}`);
          console.log(
            `Upload Date: ${formatUploadDate(item.video.snippet.publishedAt)}`
          );
          console.log(`Impactfulness Score: ${item.impactfulness}`);
          console.log("\n");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const topTwoTrends = Object.keys(trends.query)
    .slice(0, 2)
    .map((key) => trends.query[key]);

  topTwoTrends.forEach((trend) => {
    searchAndFetchStatistics(trend);
  });
});
