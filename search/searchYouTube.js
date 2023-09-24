const { exec } = require("child_process");
const path = require("path");
const axios = require("axios");

const fetchTrendsScriptPath = path.join(
  __dirname,
  "../algorithm/fetchTrends.py"
);

let trends;

// exec(`python ${fetchTrendsScriptPath}`, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error: ${error.message}`);
//     return;
//   }
//   if (stderr) {
//     console.error(`Error: ${stderr}`);
//     return;
//   }
//   trends = JSON.parse(stdout);

//   // trends will contain the JSON data fetched from Python
//   console.log("Trends fetched from Python:");
//   //console.log(trends);

//   // Now, you can process the trends in JavaScript and call your other functions
//   // For example, you can pass the trends to your searchYouTube function
// });

const { google } = require("googleapis");
const {
  calculateOverallImpactfulness,
} = require("../algorithm/calculateImpact");
require("dotenv").config();
const fs = require("fs");

const addCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const writeVideosToFile = (videos, query) => {
  const filteredVideos = videos.filter(
    (video) => video.moreViewsThanSubscribers
  );

  // Format numbers with commas
  const formattedVideos = filteredVideos.map((video) => ({
    ...video,
    views: addCommas(video.views),
    likes: addCommas(video.likes),
    comments: addCommas(video.comments),
    subscribers: addCommas(video.subscribers),
  }));

  const jsonData = JSON.stringify(formattedVideos, null, 2);

  fs.writeFile(`${query}_filteredVideos.json`, jsonData, (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("Filtered videos written to file!");
    }
  });
};

function formatUploadDate(isoDate) {
  const date = new Date(isoDate);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

const fetchChannelStatistics = async (channelId) => {
  try {
    const response = await google.youtube("v3").channels.list({
      key: process.env.YOUTUBE_TOKEN,
      part: "statistics",
      id: channelId,
    });

    const channel = response.data.items[0];
    const subscribers = parseInt(channel.statistics.subscriberCount);

    return {
      subscribers,
    };
  } catch (error) {
    throw new Error(`Error fetching channel statistics: ${error.message}`);
  }
};

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
            views,
            likes,
            comments,
            impactfulness,
          };
        } else {
          console.log("Statistics not available for this video.");
          return null; // Return null to indicate no statistics available
        }
      } else {
        console.log(`No data available for video with ID: ${videoId}`);
        return null; // Return null to indicate no video data available
      }
    })
    .catch((err) => {
      console.log(err);
      return null; // Return null to indicate an error occurred
    });
};

// Define the searchAndFetchStatistics function
const searchAndFetchStatistics = async (query) => {
  try {
    const response = await google.youtube("v3").search.list({
      key: process.env.YOUTUBE_TOKEN,
      part: "snippet",
      q: query,
      maxResults: 50,
      order: "viewCount", // Sort by view count
      publishedAfter: "2023-08-21T00:00:00Z",
      regionCode: "US",
    });

    const { data } = response;
    const videoItems = data.items.filter(
      (item) => item.id.kind === "youtube#video"
    );

    const videoData = await Promise.all(
      videoItems.map(async (item) => {
        const videoId = item.id.videoId;
        const channelId = item.snippet.channelId;

        const videoStats = await fetchVideoStatistics(videoId);
        const channelStats = await fetchChannelStatistics(channelId);

        // Compare video views with channel subscribers
        const moreViewsThanSubscribers =
          videoStats.views > channelStats.subscribers;

        console.log(`Video:`);
        console.log(`Title: ${item.snippet.title}`);

        if (videoStats) {
          const { views, likes, comments, impactfulness } = videoStats;
          console.log(`Views: ${views}`);
          console.log(`Likes: ${likes}`);
          console.log(`Comments: ${comments}`);
          //console.log(`Impactfulness: ${impactfulness}`);
          console.log(`Subscribers: ${channelStats.subscribers}`);
        } else {
          console.log("Statistics not available for this video.");
        }

        console.log(
          `Upload Date: ${formatUploadDate(item.snippet.publishedAt)}`
        );

        if (moreViewsThanSubscribers) {
          console.log(
            "This video has more views than the channel has subscribers."
          );
        }

        console.log("\n");

        return {
          id: videoId,
          title: item.snippet.title,
          views: videoStats.views || 0,
          likes: videoStats.likes || 0,
          comments: videoStats.comments || 0,
          impactfulness: videoStats.impactfulness || 0,
          uploadDate: formatUploadDate(item.snippet.publishedAt),
          moreViewsThanSubscribers,
          subscribers: channelStats.subscribers,
        };
      })
    );

    writeVideosToFile(videoData, query); // Write filtered videos to file

    // API call to post in DATABASE
    // const responseFromBackend = await axios.post("/api/videos", videoData);

    // // Handle the response from your backend
    // if (responseFromBackend.status === 201) {
    //   console.log("Video data successfully saved to database.");
    // } else {
    //   console.error(
    //     "Error saving video data to database:",
    //     responseFromBackend.data.message
    //   );
    // }

    return videoData;
  } catch (error) {
    throw new Error(
      `Error fetching and processing video data: ${error.message}`
    );
  }
};

// const topTwoTrends = Object.keys(trends.query)
//   .slice(0, 2)
//   .map((key) => trends.query[key]);

// topTwoTrends.forEach((trend) => {
//   searchAndFetchStatistics(trend);
// });
searchAndFetchStatistics("artificial intelligence");
