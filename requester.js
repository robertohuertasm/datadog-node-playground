const axios = require('axios');

(async function () {

  const promises = Array.from(Array(295)).map(async (x, i) => {
    return new Promise(res => {
      // setTimeout(res(i), 1000)
      return axios.default.post('https://app.datadoghq.com/api/v2/logs/events/search', {
        "filter": {
          "from": 1703427551000,
          "to": 1706105951000,
          "query": "\"DDNP: main entry point called\" service:(_dd.p.dm OR datadog-node-playground)"
        },
        "options": {
          "timezone": "Europe/Madrid"
        },
        "page": {
          "limit": 1
        },
        "sort": "-timestamp"

      }, {
        headers: {
          'Authorization': 'Bearer ddoat_e4gQWFUW2VB2dcAT5DtyuElhZ1oovsP',
          "Content-Type": 'application/json',
          "Accept": '*/*',
          "Accept-Encoding": "gzip, deflate, br",
          "X-Frame-Options": "SAMEORIGIN"
        }
      })

    }).catch(e => {
      console.error(e);
    })
  });
  console.log('All promises started');
  const result = await Promise.all(promises);
  console.log('all promises completed', result);
})()
