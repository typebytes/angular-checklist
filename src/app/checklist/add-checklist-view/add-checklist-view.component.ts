import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApplicationState } from '../../state/app.state';
import { NgxMdService } from 'ngx-md';
import { TEMPLATE_MD_FILE } from './template-md';
import { getLanguage, highlight } from 'highlight.js';

@Component({
  selector: 'ac-add-checklist-view',
  templateUrl: './add-checklist-view.component.html',
  styleUrls: ['./add-checklist-view.component.scss']
})
export class AddCheckListViewComponent implements OnInit {

  constructor(private store: Store<ApplicationState>, private _markdown: NgxMdService) { }


  /*
    ngContent1:string = [
      "```javascript",
      "setTimeout(_ => alert('Hello'));",
      "```",
     ].join("\n");
    ngContent2:string = [
      "```html",
      "<div>Hello html</div>",
      "```",
     ].join("\n");
    */
  public markdownContent = TEMPLATE_MD_FILE;

  ngOnInit() {
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
}
