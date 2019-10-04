import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { S3Helper } from '../lib/s3.helper';
import { Project } from '../projects/models/projects.model';
import { remove } from 'lodash';

interface EMPTY_CHECK_LIST_DOC {
  categories: {},
  items: {}
}

@Injectable()
export class ProjectService {
  projectsUrl = `projects.json`;
  constructor(private _s3Helper: S3Helper) { }

  getProjects(): Observable<any> {
    return from(this._s3Helper.s3Service.getObject(this.projectsUrl));
  }

  addNewProject(projectInfo: any): Observable<any> {
    return from(new Promise((resolve, reject) => {
      this._s3Helper.s3Service.getObject(`${this.projectsUrl}`).then((result: any) => {
        const projects = JSON.parse(result.Output.Body) as Array<Project>;
        projects.push(projectInfo);
        this._s3Helper.s3Service.putObject(JSON.stringify(projects), `${this.projectsUrl}`).then(result => {
          console.log('Done', result);
        });

        this._s3Helper.s3Service.putObject(JSON.stringify({
          categories: {},
          items: {},
          disabledCategories: {},
          favorites: {},
          creationTime: new Date().getTime()
        }), `${projectInfo.id}.json`).then(result => {
          console.log('Done', result);
        });
        resolve(projects);
      });
    }));
  }

  deleteProject(id: string): Observable<any> {
    return from(new Promise((resolve, reject) => {
      this._s3Helper.s3Service.getObject(`${this.projectsUrl}`).then((result: any) => {
        const projects = JSON.parse(result.Output.Body) as Array<Project>;
        remove(projects, { id });
        this._s3Helper.s3Service.putObject(JSON.stringify(projects), `${this.projectsUrl}`).then((result: any) => {
          console.log('Delete Done', result);
        });
        this._s3Helper.s3Service.deleteObject(`${id}.json`).then((result: any) => {
          console.log('Delete file ', `${id}.json`, result);
        });
        resolve(projects);
      });
    }));
  }
}
