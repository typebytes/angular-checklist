// Angular modules
import { Injectable } from '@angular/core';
import { S3Service } from './s3.service';
import { S3Config } from './s3Config';

@Injectable()
export class S3Helper {
  // Services
  public s3Service: S3Service = new S3Service(S3Config);

  // Consts
  public s3Config = S3Config;
}
