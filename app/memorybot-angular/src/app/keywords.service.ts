import { Injectable } from '@angular/core';
import { KeywordEntry } from './keyword_entry'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class KeywordsService {

  private keywordsApiUrl = 'http://127.0.0.1:3000/api/keywords';

  getKeywordEntries(groupId: string, authToken: string): Observable<KeywordEntry[]> {
    return this.http.get<KeywordEntry[]>(this.keywordsApiUrl + "/" + groupId + "/" + authToken);
  }

  modifyKeywordEntry(groupId: string, authToken:string, entry: KeywordEntry): Observable<KeywordEntry> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put<KeywordEntry>(this.keywordsApiUrl + "/" + groupId + "/" + authToken, entry, httpOptions);
  }

  deleteKeywordEntry(groupId: string, authToken:string, keyword: string): Observable<any> {
    return this.http.delete(this.keywordsApiUrl + "/" + groupId + "/" + authToken + "/" + keyword);
  }

  createKeywordEntry(groupId: string, authToken:string, entry: KeywordEntry): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<any>(this.keywordsApiUrl + "/" + groupId + "/" + authToken, entry, httpOptions);
  }

  constructor(
    private http: HttpClient,
  ) { }

}
