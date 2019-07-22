import { Injectable, RootRenderer } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

@Injectable({
    providedIn: 'root',
})
export class GeneralService {

    private _url = "localhost:8091/etiquetas";
    

    // tslint:disable-next-line: max-line-length
    ambitos: any = [{"available":true,"content":"Prueba MOD1","createdDate":"2019-07-09T12:39:31","docId":"pageEtiqueta::Prueba::es","id":"Prueba::es","keyId":"Prueba","language":"es","lastModifiedDate":"2019-07-10T08:58:17","type":"pageEtiqueta"},
    {"available":false,"content":"112","createdDate":"2019-07-09T15:51:45","docId":"pageEtiqueta::asdasd::es","id":"asdasd::es","keyId":"asdasd","language":"es","lastModifiedDate":"2019-07-09T16:01:49","type":"pageEtiqueta"},
    {"available":true,"content":"available","createdDate":"2019-07-09T16:25:35","docId":"pageEtiqueta::available::es","id":"available::es","keyId":"available","language":"es","lastModifiedDate":"2019-07-09T16:25:35","type":"pageEtiqueta"},
    {"available":true,"content":"Confirmation","createdDate":"2019-07-09T12:21:03","docId":"pageEtiqueta::confirmation::es","id":"confirmation::es","keyId":"confirmation","language":"es","lastModifiedDate":"2019-07-09T12:21:03","type":"pageEti8queta"},
    {"available":true,"content":"Disponibilidad","createdDate":"2019-07-09T12:15:53","docId":"pageEtiqueta::disponibilidad::es","id":"disponibilidad::es","keyId":"disponibilidad","language":"es","lastModifiedDate":"2019-07-09T12:15:53","type":"pageEtiqueta"},
    {"available":true,"content":"Home Privada","createdDate":"2019-07-09T12:12:12","docId":"pageEtiqueta::home-privada::es","id":"home-privada::es","keyId":"home-privada","language":"es","lastModifiedDate":"2019-07-09T12:12:12","type":"pageEtiqueta"},
    {"available":true,"content":"home","createdDate":"2019-07-08T13:44:25","docId":"pageEtiqueta::home::es","id":"home::es","keyId":"home","language":"es","lastModifiedDate":"2019-07-08T13:44:25","type":"pageEtiqueta"},
    {"available":true,"content":"","createdDate":"2019-07-09T14:33:26","docId":"pageEtiqueta::null::es","id":"null::es","language":"es","lastModifiedDate":"2019-07-09T14:33:26","type":"pageEtiqueta"},
    {"available":true,"content":"ofertas","createdDate":"2019-07-08T13:44:03","docId":"pageEtiqueta::ofertas::es","id":"ofertas::es","keyId":"ofertas","language":"es","lastModifiedDate":"2019-07-10T08:59:39","type":"pageEtiqueta"},
    {"available":true,"docId":"pageEtiqueta::null::ES","id":"null::ES","language":"ES","objectType":"pageEtiqueta","type":"pageEtiqueta"},
    {"available":true,"content":"Prueba 2","createdDate":"2019-07-09T13:51:31","docId":"pageEtiqueta::prueba-2::es","id":"prueba-2::es","keyId":"prueba-2","language":"es","lastModifiedDate":"2019-07-09T13:51:31","type":"pageEtiqueta"},
    {"available":true,"content":"prueba-4","createdDate":"2019-07-09T15:27:08","docId":"pageEtiqueta::prueba-4::es","id":"prueba-4::es","keyId":"prueba-4","language":"es","lastModifiedDate":"2019-07-09T16:27:46","type":"pageEtiqueta"},
    {"available":true,"content":"Prueba3","createdDate":"2019-07-09T14:35:00","docId":"pageEtiqueta::prueba3::es","id":"prueba3::es","keyId":"prueba3","language":"es","lastModifiedDate":"2019-07-09T14:35:00","type":"pageEtiqueta"},
    {"available":true,"content":"prueba","createdDate":"2019-07-09T14:36:56","docId":"pageEtiqueta::prueba4::es","id":"prueba4::es","keyId":"prueba4","language":"es","lastModifiedDate":"2019-07-09T14:36:56","type":"pageEtiqueta"},
    {"available":true,"content":"Rooms","createdDate":"2019-07-09T12:18:28","docId":"pageEtiqueta::rooms::es","id":"rooms::es","keyId":"rooms","language":"es","lastModifiedDate":"2019-07-09T12:18:28","type":"pageEtiqueta"},
    {"available":true,"content":"valoracion","createdDate":"2019-07-08T13:23:44","docId":"pageEtiqueta::valoracion::es","id":"valoracion::es","keyId":"valoracion","language":"es","lastModifiedDate":"2019-07-08T13:23:44","type":"pageEtiqueta"}];


    tags: any = [{"available":true,"content":"qweqwe","createdDate":"2019-07-15T16:10:47","docId":"etiqueta::qweqweqwe::es","id":"qweqweqwe::es","keyId":"qweqweqwe","language":"es","lastModifiedDate":"2019-07-15T16:11:36","pages":[{"available":true,"content":"Prueba MOD1","createdDate":"2019-07-09T12:39:31","docId":"pageEtiqueta::Prueba::es","id":"Prueba::es","keyId":"Prueba","language":"es","lastModifiedDate":"2019-07-10T08:58:17","type":"pageEtiqueta"},{"available":true,"content":"available","createdDate":"2019-07-09T16:25:35","docId":"pageEtiqueta::available::es","id":"available::es","keyId":"available","language":"es","lastModifiedDate":"2019-07-09T16:25:35","type":"pageEtiqueta"}],"type":"etiqueta"}];
constructor(private http: HttpClient) {}

returnArrayAmbitos(): any{
    return this.http.get(this._url);
}
getAmbitosTemp(){
    return this.ambitos;
}
getTagTemp(){
    return this.tags;
}
getTagsWithAmbitos(amb:any[]){
    let searchParams = new HttpParams({
        fromObject: {
            ambitos: amb
        }
    });
    
    // this.http.get(url, { params: Params });
        return this.http.get(this._url+"/keyIds/", { params : searchParams,
                                                    headers :  httpOptions.headers})
            .pipe(
                catchError(this.handleError)
            );
    }
deleteTag(id:String){
    return this.http.delete(this._url+"/delete/${id}" , httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}
editTag(tag:any) {
  return this.http.post(this._url+"/edit",tag,httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}
addTag(eti:any): any{
return this.http.post(this._url+"/create",eti,httpOptions)
    .pipe(
        catchError(this.handleError)
    );
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

