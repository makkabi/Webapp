const { getLocations } = require('./location-finder');

exports.handler = async function (event, context) {
  const searchTerm = event.queryStringParameters.search;

  const locations = getLocations(searchTerm);

  return {
    statusCode: 200,
    body: JSON.stringify(locations),
  };
};
