// no-dd-sa:javascript-code-style/func-names
const axios = require('axios');



module.exports = async (opts) => {
  return async function (log) {
    try {
      const logPayload = {
        message: log.msg,
        level: log.level,
        ddsource: 'nodejs',
        ddtags: 'env:development', // Customize your tags here
        hostname: require('os').hostname(),
        service: 'your-service-name'
      };

      await axios.post(`${opts.logEndpoint}?dd-api-key=${opts.apiKey}`, logPayload);
    } catch (error) {
      console.error('Error sending log to Datadog:', error.message);
    }
  };
};
