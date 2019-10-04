import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
// Models
import { S3Object } from './models/s3-object.model';

export class S3Service {
  public s3: AWS.S3;
  private bucket: string;

  constructor(s3Config: any) {
    this.bucket = s3Config.bucket;
    const credentials = { accessKeyId: s3Config.access_key, secretAccessKey: s3Config.secret_key };
    AWS.config.update(credentials);
    AWS.config.region = s3Config.region;
  }

  // -------------------------------------------------------------------------------------------
  // SECTION: Object ---------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  /** Retrieves objects from Amazon S3.
   *
   * @param key - string
   * @param customParams - AWS.S3.GetObjectRequest = null
   * @returns Observable<AWS.AWSError | S3Object>
   * @memberof S3Service
   */
  public getObject(key: string, customParams: AWS.S3.GetObjectRequest = null): Promise<AWS.AWSError | S3Object> {
    const defaultParams: AWS.S3.GetObjectRequest = {
      Bucket: this.bucket,
      Key: key
    };
    const params = Object.assign(defaultParams, customParams);

    return new Promise((resolve, reject) => {
      this.s3 = new AWS.S3();
      this.s3.getObject(params, (err: AWS.AWSError, data: AWS.S3.GetObjectOutput) => {
        if (err) {
          console.error('S3Service : getObject -> getObject', err);
          return resolve(null);
          // return reject(err);
        }
        const s3Object = this.upgradeS3Object(key, data);
        return resolve(s3Object);
      });
    });
  }

  /** Adds an object to a bucket.
   *
   * @param body - AWS.S3.Body
   * @param key - string
   * @param customParams - AWS.S3.PutObjectRequest = null
   * @returns Promise<AWS.AWSError | AWS.S3.PutObjectOutput>
   * @memberof S3Service
   */
  public putObject(
    body: AWS.S3.Body,
    key: string,
    customParams: AWS.S3.PutObjectRequest = null
  ): Promise<AWS.AWSError | AWS.S3.PutObjectOutput> {
    const defaultParams: AWS.S3.PutObjectRequest = {
      Bucket: this.bucket,
      Body: body,
      Key: key
    };
    const params = Object.assign(defaultParams, customParams);

    return new Promise((resolve, reject) => {
      this.s3 = new AWS.S3();
      this.s3.putObject(params, (err: AWS.AWSError, data: AWS.S3.PutObjectOutput) => {
        if (err) {
          console.error('S3Service : putObject -> putObject', err);
          return reject(err);
        }
        return resolve(data);
      });
    });
  }

  /** Creates a copy of an object that is already stored in Amazon S3.
   *
   * @param objectKey - string
   * @param newKey - string
   * @param customParams - AWS.S3.CopyObjectRequest = null
   * @returns Promise<AWS.AWSError | AWS.S3.CopyObjectOutput>
   * @memberof S3Service
   */
  public copyObject(
    objectKey: string,
    newKey: string,
    customParams: AWS.S3.CopyObjectRequest = null
  ): Promise<AWS.AWSError | AWS.S3.CopyObjectOutput> {
    const defaultParams: AWS.S3.CopyObjectRequest = {
      Bucket: this.bucket,
      CopySource: this.bucket + '/' + objectKey,
      Key: newKey
    };
    const params = Object.assign(defaultParams, customParams);

    return new Promise((resolve, reject) => {
      this.s3 = new AWS.S3();
      this.s3.copyObject(params, (err: AWS.AWSError, data: AWS.S3.CopyObjectOutput) => {
        if (err) {
          console.error('S3Service : copyObject -> copyObject', err);
          return reject(err);
        }
        return resolve(data);
      });
    });
  }

  /** Removes the null version (if there is one) of an object and inserts a delete marker, which becomes the latest version of the object.
   * If there isn't a null version, Amazon S3 does not remove any objects.
   *
   * @param key - string
   * @param customParams - AWS.S3.DeleteObjectRequest = null
   * @returns Promise<AWS.AWSError | AWS.S3.DeleteObjectOutput>
   * @memberof S3Service
   */
  public deleteObject(
    key: string,
    customParams: AWS.S3.DeleteObjectRequest = null
  ): Promise<AWS.AWSError | AWS.S3.DeleteObjectOutput> {
    const defaultParams: AWS.S3.DeleteObjectRequest = {
      Bucket: this.bucket,
      Key: key
    };
    const params = Object.assign(defaultParams, customParams);

    return new Promise((resolve, reject) => {
      this.s3 = new AWS.S3();
      this.s3.deleteObject(params, (err: AWS.AWSError, data: AWS.S3.DeleteObjectOutput) => {
        if (err) {
          console.error('S3Service : deleteObject -> deleteObject', err);
          return reject(err);
        }
        return resolve(data);
      });
    });
  }

  /** This operation enables you to delete multiple objects from a bucket using a single HTTP request.
   * You may specify up to 1000 keys.
   *
   * @param del - AWS.S3.Delete
   * @param customParams - AWS.S3.DeleteObjectsRequest = null
   * @returns Promise<AWS.AWSError | AWS.S3.DeleteObjectsOutput>
   * @memberof S3Service
   */
  public deleteObjects(
    del: AWS.S3.Delete,
    customParams: AWS.S3.DeleteObjectsRequest = null
  ): Promise<AWS.AWSError | AWS.S3.DeleteObjectsOutput> {
    const defaultParams: AWS.S3.DeleteObjectsRequest = {
      Bucket: this.bucket,
      Delete: del
    };
    const params = Object.assign(defaultParams, customParams);

    return new Promise((resolve, reject) => {
      this.s3 = new AWS.S3();
      this.s3.deleteObjects(params, (err: AWS.AWSError, data: AWS.S3.DeleteObjectsOutput) => {
        if (err) {
          console.error('S3Service : deleteObjects -> deleteObjects', err);
          return reject(err);
        }
        return resolve(data);
      });
    });
  }

  public listAllObjects(
    params: AWS.S3.ListObjectsV2Request = null,
    output: AWS.S3.Object[] = []
  ): Promise<AWS.AWSError | AWS.S3.Object[]> {
    const defaultParams: AWS.S3.ListObjectsRequest = {
      Bucket: this.bucket
    };
    params = Object.assign(defaultParams, params);

    return new Promise((resolve, reject) => {
      this.listObjectsV2(params)
        .then((data: AWS.S3.ListObjectsV2Output) => {
          data.Contents.forEach(item => output.push(item));
          if (!data.IsTruncated) {
            return resolve(output);
          }
          const nextParams = Object.assign(params, { ContinuationToken: data.NextContinuationToken });
          return resolve(this.listAllObjects(nextParams, output));
        })
        .catch((err: AWS.AWSError) => {
          console.error('S3Service : listObjectsV2 -> listAll', err);
          return reject(err);
        });
    });
  }

  /** Returns some or all (up to 1000) of the objects in a bucket.
   * You can use the request parameters as selection criteria to return a subset of the objects in a bucket.
   *
   * @param customParams - AWS.S3.ListObjectsRequest = null
   * @returns Promise<AWS.AWSError | AWS.S3.ListObjectsOutput>
   * @memberof S3Service
   */
  public listObjects(customParams: AWS.S3.ListObjectsRequest = null): Promise<AWS.AWSError | AWS.S3.ListObjectsOutput> {
    const defaultParams: AWS.S3.ListObjectsRequest = {
      Bucket: this.bucket
    };
    const params = Object.assign(defaultParams, customParams);

    return new Promise((resolve, reject) => {
      this.s3 = new AWS.S3();
      this.s3.listObjects(params, (err: AWS.AWSError, data: AWS.S3.ListObjectsOutput) => {
        if (err) {
          console.error('S3Service : listObjects -> listObjects', err);
          return reject(err);
        }
        return resolve(data);
      });
    });
  }

  /** Returns some or all (up to 1000) of the objects in a bucket.
   * You can use the request parameters as selection criteria to return a subset of the objects in a bucket.
   * Note: ListObjectsV2 is the revised List Objects API and we recommend you use this revised API for new application development.
   *
   * @param customParams - AWS.S3.ListObjectsV2Request = null
   * @returns Promise<AWS.AWSError | AWS.S3.ListObjectsV2Output>
   * @memberof S3Service
   */
  public listObjectsV2(
    customParams: AWS.S3.ListObjectsV2Request = null
  ): Promise<AWS.AWSError | AWS.S3.ListObjectsV2Output> {
    const defaultParams: AWS.S3.ListObjectsV2Request = {
      Bucket: this.bucket
    };
    const params = Object.assign(defaultParams, customParams);

    return new Promise((resolve, reject) => {
      this.s3 = new AWS.S3();
      this.s3.listObjectsV2(params, (err: AWS.AWSError, data: AWS.S3.ListObjectsV2Output) => {
        if (err) {
          console.error('S3Service : listObjectsV2 -> listObjectsV2', err);
          return reject(err);
        }
        return resolve(data);
      });
    });
  }

  /** Returns metadata about all of the versions of objects in a bucket.
   *
   * @param prefix - string
   * @param customParams - AWS.S3.ListObjectVersionsRequest = null
   * @returns Promise<AWS.AWSError | AWS.S3.ListObjectVersionsOutput>
   * @memberof S3Service
   */
  public listObjectVersions(
    prefix: string,
    customParams: AWS.S3.ListObjectVersionsRequest = null
  ): Promise<AWS.AWSError | AWS.S3.ListObjectVersionsOutput> {
    const defaultParams: AWS.S3.ListObjectVersionsRequest = {
      Bucket: this.bucket,
      Prefix: prefix
    };
    const params = Object.assign(defaultParams, customParams);

    return new Promise((resolve, reject) => {
      this.s3 = new AWS.S3();
      this.s3.listObjectVersions(params, (err: AWS.AWSError, data: AWS.S3.ListObjectVersionsOutput) => {
        if (err) {
          console.error('S3Service : listObjectVersions -> listObjectVersions', err);
          return reject(err);
        }
        // const versions : S3Item[] = [];
        // versions = ArrayTyper.asArray(S3Item, data.Versions);
        return resolve(data); // versions
      });
    });
  }

  /** Restores an archived copy of an object back into Amazon S3
   *
   * @param key - string
   * @param customParams - AWS.S3.RestoreObjectRequest = null
   * @returns Promise<AWS.AWSError | AWS.S3.RestoreObjectOutput>
   * @memberof S3Service
   */
  public restoreObject(
    key: string,
    customParams: AWS.S3.RestoreObjectRequest = null
  ): Promise<AWS.AWSError | AWS.S3.RestoreObjectOutput> {
    const defaultParams: AWS.S3.RestoreObjectRequest = {
      Bucket: this.bucket,
      Key: key
    };
    const params = Object.assign(defaultParams, customParams);

    return new Promise((resolve, reject) => {
      this.s3 = new AWS.S3();
      this.s3.restoreObject(params, (err: AWS.AWSError, data: AWS.S3.RestoreObjectOutput) => {
        if (err) {
          console.error('S3Service : restoreObject -> restoreObject', err);
          return reject(err);
        }
        return resolve(data);
      });
    });
  }

  // !SECTION

  // -------------------------------------------------------------------------------------------
  // SECTION: Upload ---------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  /** Uploads an arbitrarily sized buffer, blob, or stream, using intelligent concurrent handling of parts if the payload is large enough.
   * You can configure the concurrent queue size by setting options.
   * Note that this is the only operation for which the SDK can retry requests with stream bodies.
   *
   * @param key - string
   * @param body - AWS.S3.Body
   * @param progressCallback - (error : Error, progress : number, speed : number) => void
   * @param customParams - AWS.S3.PutObjectRequest = null
   * @param options - AWS.S3.ManagedUpload.ManagedUploadOptions = null
   * @returns AWS.S3.ManagedUpload
   * @memberof S3Service
   */
  public upload(
    key: string,
    body: AWS.S3.Body,
    progressCallback: (error: Error, progress: number, speed: number) => void,
    customParams: AWS.S3.PutObjectRequest = null,
    options: AWS.S3.ManagedUpload.ManagedUploadOptions = null
  ): AWS.S3.ManagedUpload {
    const defaultParams: AWS.S3.PutObjectRequest = {
      Bucket: this.bucket,
      Key: key,
      Body: body
    };
    const params = Object.assign(defaultParams, customParams);

    this.s3 = new AWS.S3();
    const managedUpload = this.s3.upload(params, options);
    managedUpload.on('httpUploadProgress', this.handleS3UploadProgress(progressCallback));
    managedUpload.send(this.handleS3UploadComplete(progressCallback));
    return managedUpload;
  }

  /** Aborts a managed upload, including all concurrent upload requests.
   *
   * @param managedUpload - AWS.S3.ManagedUpload
   * @memberof S3Service
   */
  public cancelUpload(managedUpload: AWS.S3.ManagedUpload): void {
    managedUpload.abort();
  }

  // !SECTION

  // -------------------------------------------------------------------------------------------
  // SECTION: Helpers --------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  public upgradeS3Object(key: string, output: AWS.S3.GetObjectOutput): S3Object {
    const object = new S3Object();
    const name = S3Object.getFileName(key);
    const extension = S3Object.getFileExtension(key);
    const blob = new Blob([output.Body as any], { type: output.ContentType });

    object.Key = key;
    object.Name = name;
    object.Extension = extension;
    object.Output = output;
    object.Blob = blob;

    return object;
  }

  // !SECTION

  // -------------------------------------------------------------------------------------------
  // SECTION: S3 Helpers -----------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  /** Get the objects of a folder.
   *
   * @param folder - string
   * @returns Promise<(AWS.AWSError | S3Object)[]>
   * @memberof S3Service
   */
  public getFolderObjects(folder: string): Promise<(AWS.AWSError | S3Object)[]> {
    const params: AWS.S3.ListObjectsV2Request = {
      Bucket: this.bucket,
      Prefix: folder
    };

    return new Promise((resolve, reject) => {
      this.listAllObjects(params)
        .then((contents: AWS.S3.Object[]) => {
          if (!contents) {
            const error = 'Nothing found';
            console.error('S3Service : getFolderObjects -> listObjectsV2', error);
            return reject(error);
          }

          const promises: Promise<AWS.AWSError | S3Object>[] = [];

          for (const file of contents) {
            const promise = this.getObject(file.Key);
            promises.push(promise);
          }

          Promise.all(promises).then(
            res => {
              return resolve(res);
            },
            err => {
              return reject(err);
            }
          );
        })
        .catch((err: AWS.AWSError) => {
          console.error('S3Service : getFolderObjects -> listObjectsV2', err);
          return reject(err);
        });
    });
  }

  /** Copy a folder with its objects.
   *
   * @param copyFrom - string
   * @param copyTo - string
   * @returns Promise<(AWS.AWSError | AWS.S3.CopyObjectOutput)[]>
   * @memberof S3Service
   */
  public copyFolderObjects(copyFrom: string, copyTo: string): Promise<(AWS.AWSError | AWS.S3.CopyObjectOutput)[]> {
    const params: AWS.S3.ListObjectsV2Request = {
      Bucket: this.bucket,
      Prefix: copyFrom
    };

    return new Promise((resolve, reject) => {
      this.listAllObjects(params)
        .then((contents: AWS.S3.Object[]) => {
          if (!contents) {
            const error = 'Nothing found';
            console.error('S3Service : copyFolder -> listObjectsV2', error);
            return reject(error);
          }

          const promises: Promise<AWS.AWSError | AWS.S3.CopyObjectOutput>[] = [];

          for (const file of contents) {
            const newKey = copyTo + '/' + file.Key;
            const promise = this.copyObject(file.Key, newKey);
            promises.push(promise);
          }

          Promise.all(promises).then(
            res => {
              return resolve(res);
            },
            err => {
              return reject(err);
            }
          );
        })
        .catch((err: AWS.AWSError) => {
          console.error('S3Service : copyFolderObjects -> listObjectsV2', err);
          return reject(err);
        });
    });
  }

  // !SECTION

  // -------------------------------------------------------------------------------------------
  // SECTION: Private --------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  // NOTE: Upload

  /**
   *
   * @param progressCallback - (error : Error, progress : number, speed : number) => void
   * @returns any
   * @memberof S3Service
   */
  private handleS3UploadProgress(progressCallback: (error: Error, progress: number, speed: number) => void): any {
    let uploadStartTime = new Date().getTime();
    let uploadedBytes = 0;
    return (progressEvent: AWS.S3.ManagedUpload.Progress) => {
      const currentTime = new Date().getTime();
      const timeElapsedInSeconds = (currentTime - uploadStartTime) / 1000;
      if (timeElapsedInSeconds > 0) {
        const speed = (progressEvent.loaded - uploadedBytes) / timeElapsedInSeconds;
        const progress = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
        progressCallback(undefined, progress, speed);
        uploadStartTime = currentTime;
        uploadedBytes = progressEvent.loaded;
      }
    };
  }

  /**
   *
   * @param progressCallback - (error : Error, progress : number, speed : number) => void
   * @returns any
   * @memberof S3Service
   */
  private handleS3UploadComplete(progressCallback: (error: Error, progress: number, speed: number) => void): any {
    return (error: Error, data: AWS.S3.ManagedUpload.SendData) => {
      if (error) {
        progressCallback(error, undefined, undefined);
      } else {
        progressCallback(error, 100, undefined);
      }
    };
  }
}
