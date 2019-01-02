const { Client } = require('minio');
const { lookup } = require('mime-types');
const PluginError = require('plugin-error');
const es = require('event-stream');
const log = require('fancy-log');
const colors = require('ansi-colors');

const PLUGIN_NAME = 'gulp-minio-s3';

/**
 * Throw error
 * @param {String} msg Error message
 */
const throwError = msg => {
  throw new PluginError(PLUGIN_NAME, msg, {
    showProperties: false
  });
};

/**
 * @param {String} bucketName bucket name
 * @param {Object} opts Minio Client Options
 */
const minioS3 = (bucketName, opts) => {
  //Check buckername
  if (!bucketName) {
    throwError('Bucket name is required');
  }

  //Check minio configurations
  if (!opts) {
    throwError('Minio Configuration is required');
  }

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

    log(colors.cyan(`Uploading ${file.relative} ...`));
    minio.fPutObject(bucketName, file.relative, file.path, fileMeta, err => {
      if (err) {
        throwError(`Faild to upload file ${file.path}. Reason is ${err}`);
      }

      return cb(null, file);
    });
  });
};

module.exports = minioS3;
