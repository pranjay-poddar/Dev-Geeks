const request = require('request-promise');
'use strict';

const thirdPartyApiRequesterHelper = {}
thirdPartyApiRequesterHelper.requestThirdPartyApi = async (req, request_url, headers, body, request_method, next) => {
  try {
    const options = headers
      ? {
        method: request_method && request_method === 'POST' ? 'POST' : 'GET',
        uri: request_url,
        body: body,
        json: true, // Automatically stringifies the body to JSON
        headers: headers,
      }
      : {
        method: request_method && request_method === 'POST' ? 'POST' : 'GET',
        uri: request_url,
        body: body,
        json: true, // Automatically stringifies the body to JSON
      };
    const response = await request(options);
    return response;
  } catch (err) {
    return next(err);
  }
};
module.exports = thirdPartyApiRequesterHelper
