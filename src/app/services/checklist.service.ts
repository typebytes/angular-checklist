import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { S3Helper } from '../lib/s3.helper';
import { S3Object } from '../lib/models/s3-object.model';

@Injectable()
export class CheckListService {
  constructor(private _s3Helper: S3Helper) { }

  getCheckList(projectId: any): Observable<any> {
    return from(this._s3Helper.s3Service.getObject(`${projectId}.json`));
  }
}
