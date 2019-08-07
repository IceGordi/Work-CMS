import { Injectable, RootRenderer } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {Observable, Subject, BehaviorSubject} from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ValidationService } from './validation.service';
import {tap} from "rxjs/operators";


const headers =  new HttpHeaders().append('Content-Type',  'application/json');

@Injectable({
    providedIn: 'root',
})
export class GeneralService {

  public _refreshNeeded$ = new BehaviorSubject<boolean>(true);
  private _url = "http://localhost:8080";
    
    languages:String[] = ["es","en","de"];

    // tslint:disable-next-line: max-line-length


  constructor(private http: HttpClient, private validator:ValidationService) {}
 

  returnArrayAmbitos(): any{
       return this.http.get(this._url+"/ambito/all",{headers: headers})
      .pipe(
        catchError(this.handleError)
      );
  }
  getAmbitos(keyIds:String[]){
    return this.http.get(this._url+"/ambito/{keyIds}",{headers: headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  getTagsByLanguage(lang:String){
    return this.http.get(this._url+"/etiqueta/all/"+lang,{headers: headers})
    .pipe(
        catchError(this.handleError)
    );
  }

  getTagsWithAmbitos(amb:any[]){
      // this.http.get(url, { params: Params });
          return this.http.get(this._url+"/etiqueta/ambitos/"+amb,{headers: headers})
              .pipe(
                  catchError(this.handleError)
              );
      }
  deleteTag(id:String){
      return this.http.delete(this._url+"/delete/etiqueta/${id}" , {headers: headers})
      .pipe(
        tap(() => {this._refreshNeeded$.next(true);}),
        catchError(this.handleError)
      );
  }
  deleteAmbito(docId:String){
    return this.http.delete(this._url+"/delete/ambito/" +docId, {headers: headers})
      .pipe(
        tap(() => {this._refreshNeeded$.next(true);
                  this._refreshNeeded$.complete()}),
        catchError(this.handleError)
      );
  }
  addTag(eti:any): any{
  return this.http.post(this._url+"/create/etiqueta",eti,{headers: headers})
      .pipe(
        tap(() => {this._refreshNeeded$.next(true);}),
        catchError(this.handleError)
      );
  }
  addAmbito(amb:any){
    return this.http.post(this._url+"/create/ambito",amb,{headers: headers})
      .pipe(
        tap(() => {this._refreshNeeded$.next(true);}),
        catchError(this.handleError)
      );
  }
  editAmbito(amb:any){
    return this.http.post(this._url+"/update/ambito",amb,{headers: headers})
      .pipe(
        tap(() => {this._refreshNeeded$.next(true);}),
        catchError(this.handleError)
      );
  }
  editTag(tag:any) {
    return this.http.post(this._url+"/update/etiqueta",tag, {headers: headers})
      .pipe(
        tap(() => {this._refreshNeeded$.next(true);}),
        catchError(this.handleError)
      );
  }
  returnLanguages(){
    return this.languages;
    // return this.http.get(this._url+"/languages/all")
    // .pipe(
    //   catchError(this.handleError)
    // );
  }

private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
