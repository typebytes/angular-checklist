import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApplicationState } from '../../state/app.state';
import { NgxMdService } from 'ngx-md';
import { TEMPLATE_MD_FILE } from './template-md';
import { getLanguage, highlight } from 'highlight.js';
import { Category } from '../models/checklist.model';
import { ChecklistSelectors } from '../state/checklist.selectors';
import { MatSelectChange } from '@angular/material';
import { markdown } from 'tools/markdown';
import { dumpDataToDisk, cleanFileName } from 'tools/utils';
import { join } from 'path';
import { S3Helper } from 'src/app/lib/s3.helper';
import { CheckListService } from 'src/app/services/checklist.service';
import { S3Object } from 'src/app/lib/models/s3-object.model';
import hash = require('shorthash');
import { isEmpty } from 'lodash';

@Component({
  selector: 'ac-add-checklist-view',
  templateUrl: './add-checklist-view.component.html',
  styleUrls: ['./add-checklist-view.component.scss']
})
export class AddCheckListViewComponent implements OnInit {
  categories$: Observable<Array<Category>>;
  _selectedCategory = null;
  title = '';
  markdownContent = TEMPLATE_MD_FILE;
  list = [{ value: 4 }, { value: 3 }, { value: 2 }, { value: 1 }];
  constructor(
    private store: Store<ApplicationState>,
    private _markdown: NgxMdService,
    private _s3Helper: S3Helper,
    private _checkListService: CheckListService) { }

  ngOnInit() {
    this.categories$ = this.store.pipe(select(ChecklistSelectors.getAllCategories));
    // extras.init();
    this._markdown.setMarkedOptions({});
    // console.log(extras.markedDefaults);
    this._markdown.setMarkedOptions(
      Object.assign(
        {},
        {
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
        },
      ),
    );
    this._markdown.renderer.table = (header: string, body: string) => {
      return `
       <table class="table2">
         <thead>
           ${header}
         </thead>
         <tbody>
           ${body}
         </tbody>
       </table>
       `;
    };

    this._markdown.renderer.blockquote = (quote: string) => {
      return `<blockquote class="king-quote">${quote}</blockquote>`;
    };

    this._markdown.renderer.code = (str: string, lang) => {
      if (lang && getLanguage(lang)) {
        try {
          return `<pre class="hljs"><code>${highlight(lang, str, true).value}</code></pre>`;
        } catch { }
      } else {
        return str;
      }
    };
  }

  categorySelectionChange(event: MatSelectChange): void {
    this._selectedCategory = event.value;
    console.log(this._selectedCategory);
  }

  saveCheckList(): void {
    if (isEmpty(this._selectedCategory) || isEmpty(this.title) ) {
      alert('Category & Title is required');
      return;
    }
    const id = hash.unique(this.title);
    const slug = this.title.toLowerCase().replace(new RegExp(' ', 'g'), '-');
    const data = {
      id,
      slug,
      category: this._selectedCategory,
      title: this.title,
      content: this.markdownContent
    }

    this._checkListService.setCheckList('pointivo_front_end_check_list', data);
  }

  cancelHandler(): void {
    this._s3Helper.s3Service.getObject('test.json').then((result: any) => {
      // console.log('data' , result.);
      const jsonData = JSON.parse(result.Output.Body) as any;
      this.markdownContent = jsonData.content;
    });
  }
}
