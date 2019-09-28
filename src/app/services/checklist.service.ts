import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { S3Helper } from '../lib/s3.helper';
import { S3Object } from '../lib/models/s3-object.model';
import { TEMPLATE_MD_FILE } from '../checklist/add-checklist-view/template-md';
import { markdown } from 'tools/markdown';
import { isEmpty, remove } from 'lodash';
import { CheckList, ChecklistItem } from '../checklist/models/checklist.model';

@Injectable()
export class CheckListService {
  constructor(private _s3Helper: S3Helper) { }

  getCheckList(projectId: any): Observable<any> {
    return from(this._s3Helper.s3Service.getObject(`${projectId}.json`));
  }

  setCheckList(projectId: string, checkList: any): Promise<CheckList> {
    return new Promise((resolve, reject) => {
      this._s3Helper.s3Service.getObject(`${projectId}.json`).then((result: any) => {
        const checklist = JSON.parse(result.Output.Body) as CheckList;
        checklist.items[checkList.id] = checkList;
        const category = checklist.categories[checkList.category];
        if (category) {
          if (isEmpty(category.items)) {
            category.items = [checkList.id];
          } else {
            category.items.push(checkList.id);
          }
        } else {
          const currentUnknown = checklist.categories['unknown'];
          checklist.categories['unknown'] = {
            title: 'Unknown',
            slug: 'default',
            summary: 'Unknown Check List',
            items: isEmpty(currentUnknown) ? this.getArrayData(currentUnknown, checkList) : [checklist.id]
          };
        }
        resolve(checklist);
        this._s3Helper.s3Service.putObject(JSON.stringify(checklist), `${projectId}.json`).then(result => {
          console.log('Done');
        });
      });
    });
  }

  getArrayData(currentUnknown: any, checkList: any) {
    const result = [checkList.id];
    currentUnknown.items.forEach(element => {
      result.push(element);
    });
    return result;
  }

  deleteCheckListItem(projectId: string, checkListItem: ChecklistItem): Promise<CheckList> {
    return new Promise((resolve, reject) => {
      this._s3Helper.s3Service.getObject(`${projectId}.json`).then((result: any) => {
        const checklist = JSON.parse(result.Output.Body) as CheckList;
        delete checklist.items[checkListItem.id];
        const category = checklist.categories[checkListItem.category];
        remove(category.items, (itemId: string) => {
          return itemId === checkListItem.id;
        });
        resolve(checklist);
        this._s3Helper.s3Service.putObject(JSON.stringify(checklist), `${projectId}.json`).then(result => {
          console.log('Done');
        });
      });
    });
  }
}
