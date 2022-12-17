import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../service/local-storage.service';
import { Tweet } from '../tweet/tweet.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  feed : Tweet[] = [];
  constructor(private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.loadFeed();
  }


  loadFeed(){
    this.feed = this.localStorage.get('feed');
    this.feed.reverse();
  }



}
