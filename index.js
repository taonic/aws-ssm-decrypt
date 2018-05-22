const AWS = require('aws-sdk');

module.exports = (key) => {
  const ssm = new AWS.SSM();
  return new Promise((resolve, reject) => {
    if (key.startsWith("ssm:")) {
      console.log(`Decrypting key: ${key}`);
      const params = {
        Name: key.substr(4),
        WithDecryption: true
      };
      ssm.getParameter(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.Parameter.Value);
        }
      });
    } else {
      resolve(key);
    }
  });
}
