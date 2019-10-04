import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApplicationState } from '../../state/app.state';
import { NgxMdService } from 'ngx-md';
import { TEMPLATE_MD_FILE } from './template-md';
import { getLanguage, highlight } from 'highlight.js';
import { Category, CheckList, ChecklistItem } from '../models/checklist.model';
import { ChecklistSelectors } from '../state/checklist.selectors';
import { MatSelectChange } from '@angular/material';
import { S3Helper } from 'src/app/lib/s3.helper';
import { CheckListService } from 'src/app/services/checklist.service';
import hash = require('shorthash');
import { isEmpty } from 'lodash';
import { ProjectsSelectors } from 'src/app/projects/state/projects.selectors';
import { GetCheckList, AddCheckListSuccess } from '../state/checklist.actions';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ac-add-checklist-view',
  templateUrl: './add-checklist-view.component.html',
  styleUrls: ['./add-checklist-view.component.scss']
})
export class AddCheckListViewComponent implements OnInit {
  categories$: Observable<Array<Category>>;
  _projectId = null;
  _selectedCategory = null;
  title = '';
  markdownContent = TEMPLATE_MD_FILE;
  isEditMode = false;
  _rawCheckList: ChecklistItem = null;
  _newCategoryMode = false;
  _newCategory = '';
  constructor(
    private store: Store<ApplicationState>,
    private _markdown: NgxMdService,
    private router: Router,
    private _route: ActivatedRoute,
    private _s3Helper: S3Helper,
    private _checkListService: CheckListService) { }

  ngOnInit() {
    this.store.pipe(select(ProjectsSelectors.getSelectedProjectId)).subscribe(projectId => {
      this._projectId = projectId;
    });
    this.categories$ = this.store.pipe(select(ChecklistSelectors.getAllCategories));
    this.processMarkDownRender();
    this.processDataEditMode();
  }

  processDataEditMode() {
    this.store.pipe(select(ChecklistSelectors.getSelectedItem)).subscribe(result => {
      if (!result) {
        return;
      }
      console.log(result);
      this.isEditMode = true;
      this.title = result.title;
      this.markdownContent = result.content;
      this._rawCheckList = result;
    });
  }

  categorySelectionChange(event: MatSelectChange): void {
    this._selectedCategory = event.value;
    if (this._selectedCategory === 'new') {
      this._newCategoryMode = true;
      this._selectedCategory = '';
    }
    console.log(this._selectedCategory);
  }

  cancelCreateCategory(): void {
    this._newCategoryMode = false;
    this._selectedCategory = '';
  }

  trackBySlug(_, category: Category) {
    return category.slug;
  }

  createAndUpdateCheckList() {
    if (this.isEditMode) {
      this.editCheckList();
    } else {
      this.createCheckList();
    }
  }

  editCheckList(): void {
    const updateCheckList: ChecklistItem = {
      ...this._rawCheckList,
      title: this.title,
      content: this.markdownContent
    };
    this._checkListService.updateCheckListItem(this._projectId, updateCheckList).then((latestCheckList: CheckList) => {
      this.store.dispatch(new AddCheckListSuccess(latestCheckList));
      this.router.navigate(['/', this._projectId, 'checklist', updateCheckList.category, updateCheckList.id]);
    });
  }

  createCheckList(): void {
    if (isEmpty(this._selectedCategory) || isEmpty(this.title)) {
      alert('Category & Title is required');
      return;
    }
    const id = hash.unique(this.title);
    const slug = this.title.toLowerCase().replace(new RegExp(' ', 'g'), '-');
    const newCheckList: ChecklistItem = {
      id,
      slug,
      category: this._selectedCategory,
      title: this.title,
      content: this.markdownContent,
      checked: false,
      favorite: false,
      author: null
    };
    this._checkListService.setCheckList(this._projectId, newCheckList).then((latestCheckList: CheckList) => {
      this.store.dispatch(new AddCheckListSuccess(latestCheckList));
      if (!this._selectedCategory) {
        this.router.navigate(['/', this._projectId, 'checklist']);
      } else {
        this.router.navigate(['/', this._projectId, 'checklist', this._selectedCategory]);
      }
    });
  }

  cancelHandler(): void {
    this.router.navigate(['/', this._projectId, 'checklist']);
  }

  processMarkDownRender() {
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
}
