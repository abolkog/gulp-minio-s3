const { Client } = require('minio');
const PluginError = require('plugin-error');
const es = require('event-stream');
/**
 *
 * @param {String} bucketName bucket name
 * @param {Object} opts Minio Client Options
 */
const minioS3 = (bucketName, opts) => {
  //Minio Client Initialize
  const minio = new Client(opts);

  return es.map((file, cb) => {
    minio.fPutObject(bucketName, file.relative, file.path, err => {
      if (err) {
        throw new PluginError('gulp-minio-s3', err);
      }

      return cb(null, file);
    });
  });
};

module.exports = minioS3;
