import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from '../service/local-storage.service';
import { Tweet } from '../tweet/tweet.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  feed: Tweet[] = [];

  constructor(
    private localStorage: LocalStorageService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadFeed();
  }

  loadFeed() {
    this.feed = this.localStorage.get('feed');

    if (this.feed) {
      this.feed.sort(function (a, b) {
        return b.id - a.id;
      });
    }
  }

  removeTweet(tweet: Tweet) {
    const newFeed = this.feed.filter((el) => el.id !== tweet.id);
    this.localStorage.set('feed', newFeed);
    this.loadFeed();
  }

  open(content: any, tweet: Tweet) {
    this.modalService
      .open(content, { centered: true, size: 'sm' })
      .result.then((result) => {
        if (result === 'excluir') {
          this.removeTweet(tweet);
        }
      });
  }

  computaTime(tweet: Tweet) {
    const time = new Date(tweet.dtHora);
    let diffMilissegundos = Date.now() - time.getTime();
    let diffSegundos = diffMilissegundos / 1000;

    if (diffSegundos < 60) {
      return Math.ceil(diffSegundos) + 's';
    } else {
      return '';
    }
  }
}
