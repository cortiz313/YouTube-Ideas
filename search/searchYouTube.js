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

require("dotenv").config();
const { google } = require("googleapis");
const {
  calculateOverallImpactfulness,
} = require("../algorithm/calculateImpact");

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
        console.log(`Impactfulness Score: ${item.impactfulness}`);
        console.log("\n");
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Call the function
searchAndFetchStatistics();
