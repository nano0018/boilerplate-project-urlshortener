const dns = require("node:dns");

const urlChecker = async (url) => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;

    return new Promise((resolve, reject) => {
      dns.lookup(hostname, (err) => {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  } catch (err) {
    return Promise.resolve(false);
  }

};

module.exports = urlChecker;
