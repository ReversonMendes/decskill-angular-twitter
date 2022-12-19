import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { LocalStorageService } from '../service/local-storage.service';
import { Tweet } from './tweet.model';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {

  @Output()
  tweetEnviado = new EventEmitter();

  text: string = "";
  contagem = 0;
  visibity= 'all';

  constructor(private localService : LocalStorageService) { }

  ngOnInit( ): void {
  }

  contaCaracteres(){
    try {
      this.contagem = this.text.length
    } catch(e) {
      console.info('could not set textarea-value');
    }
  }

  autoSizeArea(e: any) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight + 25)+"px";
  }

  tweetar(){
    const feed: Tweet[] = this.localService.get('feed') || [];

    if(feed){
      const tweet : Tweet = {
        id: feed.length + 1,
        conteudo: this.text,
        dtHora: new Date(Date.now()),
      }
      feed.push(tweet);
      this.localService.set('feed', feed);
      this.tweetEnviado.emit();
      this.text = "";
      this.contagem = 0;
    }

  }

  privacy(event: string){
    this.visibity = event;
  }

}
