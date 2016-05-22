import { Component, OnInit , Input} from '@angular/core';
import  * as showdown from "showdown";


@Component({
  moduleId: module.id,
  selector: 'markdown-view',
  templateUrl: 'markdown-view.component.html',
  styleUrls: ['markdown-view.component.css']
})
export class MarkdownViewComponent {

  @Input() markdown:string;
  
  constructor() {}

  private showdownConverter = new showdown.Converter();

  getHtmlForMarkdown(markdown:string){
    return this.showdownConverter.makeHtml(markdown);
  }
}
