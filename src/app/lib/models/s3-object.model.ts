import * as AWS from 'aws-sdk';

export class S3Object {
  public Key: string;
  public Name: string;
  public Extension: string;
  public Output: AWS.S3.GetObjectOutput;
  public Blob: Blob;

  public static getFileName(fileKey: string): string {
    let arr: string[] = [];
    const key: string = fileKey;

    arr = key.split('/');

    return arr[arr.length - 1];
  }

  public static getFileExtension(fileName: string): string {
    let arr: string[] = [];
    if (!fileName) {
      return null;
    }

    arr = fileName.split('.');

    return arr[arr.length - 1];
  }
  constructor() { }
}
