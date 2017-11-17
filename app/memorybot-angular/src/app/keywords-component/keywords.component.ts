import { Component, OnInit } from '@angular/core';
import { LocationStrategy } from '@angular/common';

import { KeywordEntry } from '../keyword_entry';
import { KeywordsService } from '../keywords.service'


@Component({
  selector: 'app-keywords',
  templateUrl: './keywords.component.html',
  styleUrls: ['./keywords.component.css'],
  providers: [ KeywordsService ]
})
export class KeywordsComponent implements OnInit {

  keywordEntries: KeywordEntry[];
  groupId: string;
  authToken: string;
  selectedEntry: KeywordEntry;
  private sub: any;

  private parseUrl(url: string): void {

    let splittedUrl = url.split("/");
    if (splittedUrl[1] && splittedUrl[1] === 'keywords' 
        && splittedUrl[2] && splittedUrl[3]) {

      this.groupId = splittedUrl[2];
      this.authToken = splittedUrl[3];
    } else {

      throw "Invalid parameters";
    }
  }

  getKeywordEntries(groupId: string, authToken: string): void {
    
    this.keywordEntriesService.getKeywordEntries(groupId, authToken).subscribe(entries => {
      console.log("ENTRIES: " + JSON.stringify(entries));
      this.keywordEntries = entries});
  }

  onDelete(entry: KeywordEntry): void {
    this.keywordEntriesService.deleteKeywordEntry(this.groupId, this.authToken, entry.keyword).subscribe(result => {

      if (result.response && result.response === 'SUCCESS') {
        console.log("DELETE SUCCESSFUL");
        let idx = this.keywordEntries.findIndex(entry => entry.keyword == entry.keyword);
        console.log(idx);
        this.keywordEntries.splice(idx, 1);
      } else {

        console.log('DELETE FAILED');
      }
    });
  }

  onModify(entry: KeywordEntry): void {

    this.keywordEntriesService.modifyKeywordEntry(this.groupId, this.authToken, this.selectedEntry).subscribe(receivedEntry => {

      console.log("MODIFY SUCCESSFUL");
      this.keywordEntries[receivedEntry.keyword] == receivedEntry.value;
    });
  }

  onSelect(entry: KeywordEntry): void {

    this.selectedEntry = entry;
  }

  onAddition(entryKeyword: string, entryValue: string) {

    if (entryKeyword && entryValue && entryKeyword.indexOf(' ') == -1) {
      
      let entry: KeywordEntry = {keyword: entryKeyword, value: entryValue};

      this.keywordEntriesService.createKeywordEntry(this.groupId, this.authToken, entry).subscribe(result => {

        console.log(JSON.stringify(result));
        if (result.response && result.response === 'SUCCESS') {

          console.log("CREATE SUCCESSFUL");
          this.keywordEntries.push(entry);
        } else {
  
          console.log('CREATE FAILED');
        }
      });
    } else {

      console.log("Wrong input");
    }
  }

  constructor(private url: LocationStrategy, private keywordEntriesService: KeywordsService) { 
  }

  ngOnInit() {

    this.parseUrl(this.url.path());
    this.getKeywordEntries(this.groupId, this.authToken);
  }

}
