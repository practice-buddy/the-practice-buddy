import {Component, Input} from "@angular/core";
import * as showdown from "showdown";


@Component({
  moduleId: module.id,
  selector: 'markdown-view',
  templateUrl: 'markdown-view.component.html',
  styleUrls: ['markdown-view.component.css']
})
export class MarkdownViewComponent {

  @Input() markdown:string;

  constructor() {
  }

  private showdownConverter = new showdown.Converter();

  getHtmlForMarkdown(markdown:string) {
    return this.showdownConverter.makeHtml(this.embedYoutTubePlayer(markdown));
  }

  embedYoutTubePlayer(markdown:string):string{
    if(markdown){
      let result = markdown.replace(/https:\/\/www.youtube\.com\/watch\?v\=([^ |^\n]+)/g,
        '<iframe type="text/html" width="100%" height="450" '+
        'src="http://www.youtube.com/embed/$1" '+
        'frameborder="0"></iframe>');
      console.log(markdown + ' \n' + result);
        return result
    }else{
      return markdown;
    }
  }
}
