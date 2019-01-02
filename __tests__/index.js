const minioS3 = require('../');

describe('gulp-minio-s3 errors test', () => {
  test('expect error when no params', () => {
    expect(() => minioS3()).toThrow();
  });

  test('expect error when invalid bucket name', () => {
    expect(() => minioS3('', {})).toThrow(/Bucket/);
  });

  test('expect error when no opts', () => {
    expect(() => minioS3('fake')).toThrow(/Configuration/);
  });
});
