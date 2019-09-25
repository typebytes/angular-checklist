import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { S3Helper } from '../lib/s3.helper';

@Injectable()
export class ProjectService {
  projectsUrl = `projects.json`;
  constructor( private _s3Helper: S3Helper) { }

  getProjects(): Observable<any> {
    return from(this._s3Helper.s3Service.getObject(this.projectsUrl));
  }
}
