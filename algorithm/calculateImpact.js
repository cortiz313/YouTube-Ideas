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
  // Define weights for likes and comments
  const likesWeight = 0.6; // Adjust the weight as needed, now likes more important
  const commentsWeight = 0.4; // Adjust the weight as needed

  // Calculate impactfulness scores using the provided functions
  const likesImpact = likesToViewsImpactfulness(likes, views);
  const commentsImpact = commentsToViewsImpactfulness(comments, views);

  // Combine impactfulness scores with weights
  const overallImpactfulness =
    likesImpact * likesWeight + commentsImpact * commentsWeight;

  return overallImpactfulness;
}
