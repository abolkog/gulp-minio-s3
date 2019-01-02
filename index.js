const { Client } = require('minio');
const { lookup } = require('mime-types');
const PluginError = require('plugin-error');
const es = require('event-stream');

const PLUGIN_NAME = 'gulp-minio-s3';

/**
 * @param {String} bucketName bucket name
 * @param {Object} opts Minio Client Options
 */
const minioS3 = (bucketName, opts) => {
  //Minio Client Initialize
  const minio = new Client(opts);

  return es.map((file, cb) => {
    if (file.isNull()) {
      //No Contents (or empty dir)
      return cb(null);
    }

    // File Meta
    const fileMeta = {
      'Content-Type': lookup(file.relative)
    };

    minio.fPutObject(bucketName, file.relative, file.path, fileMeta, err => {
      if (err) {
        throw new PluginError(PLUGIN_NAME, err);
      }

      return cb(null, file);
    });
  });
};

module.exports = minioS3;
