// extract any functions you are using to manipulate your data, into this file
exports.mappedTopics = (topicData) => {
  return topicData.map((topic) => {
    return [topic.slug, topic.description];
  });
};
