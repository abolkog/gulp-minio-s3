# gulp-minio-s3

Gulp plugin to upload files to [minio](https://www.minio.io/) S3

## Usage

- Install the plugin as development dependency

```
npm i -D gulp-minio-s3
```

- Use it in your `gulpfile.js` as follow

```javascript
const { src, task } = require('gulp');
const minioS3 = require('gulp-minio-s3');

//Minio Configurations
const minioConfig = {
  endPoint: END_POINT_HERE,
  port: 9000,
  useSSL: false,
  accessKey: YOUR_ACCESS_KEY,
  secretKey: YOUR_SECRET_KEY
};

// S3 Bucket
const bucketName = 'my-bucker';

task('upload', () => {
  return src('./src/**').pipe(minioS3(bucketName, minioConfig));
});

task('upload-with-prefix', () => {
  return src('./src/*.css').pipe(minioS3(bucketName, minioConfig, 'css'));
});
```

## Options

### BucketName _(required)_

type: `String`

The bucket that the files will be uploaded to. Your must create the bucket beforehand. If the bucket does not exists, the plugin will throw an Error.

### opts _(required)_

type: `Object`

Minio Configurations. Refer to the [minio](https://www.minio.io/) documeantion or the [Minio JavaScript SDK](https://github.com/minio/minio-js#initialize-minio-client) for more details.

### prefix _(optional)_

type: `Sring`

Optional param to upload files with prefix (folder) to minio
