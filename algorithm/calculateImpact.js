function commentsToViewsImpactfulness(comments, views) {
  // Define a baseline impact factor based on the total number of views
  let baselineFactor = 1.0;

  // Adjust the baseline factor based on the comments-to-views ratio
  const ratio = comments / views;

  // Larger videos may need a higher ratio to be considered impactful
  if (views >= 10000) {
    baselineFactor += 0.2;
  }

  // Calculate the final impactfulness score
  const impactfulness = baselineFactor * ratio;

  return impactfulness;
}

function likesToViewsImpactfulness(likes, views) {
  // Define a baseline impact factor based on the total number of views
  let baselineFactor = 1.0;

  // Adjust the baseline factor based on the likes-to-views ratio
  const ratio = likes / views;

  // Larger videos may need a higher ratio to be considered impactful
  if (views >= 10000) {
    baselineFactor += 0.2;
  }

  // Calculate the final impactfulness score
  const impactfulness = baselineFactor * ratio;

  return impactfulness;
}

function calculateOverallImpactfulness(likes, comments, views) {
  // Calculate the impactfulness score as before
  const likesWeight = 0.4;
  const commentsWeight = 0.6;
  const likesImpact = likes / views;
  const commentsImpact = comments / views;
  const impactfulness =
    likesImpact * likesWeight + commentsImpact * commentsWeight;

  // Scale the impactfulness score to the 0-100 range
  const minImpactfulness = 0; // Minimum possible impactfulness score
  const maxImpactfulness = 1; // Maximum possible impactfulness score
  const scaledImpactfulness =
    ((impactfulness - minImpactfulness) /
      (maxImpactfulness - minImpactfulness)) *
    10000;

  return scaledImpactfulness;
}

module.exports = {
  calculateOverallImpactfulness,
};
