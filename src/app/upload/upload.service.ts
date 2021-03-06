import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

// import { environment } from 'src/environments/environment';
import { invoice } from '../invoice/invoice.data'
import { InvoiceResponse } from '../invoice/invoice-response.interface';

@Injectable({ providedIn: 'root' })
export class UploadService {

  private uploadUrl = 'api_URL';

  constructor(private http: HttpClient) { }

  newUpload(formData: FormData): Observable<{ type: number, body: {data: InvoiceResponse}}> {
    console.log(formData);
    // This is the code that is used when the official API is being called 
    // return this.http.post(this.uploadUrl, formData, {
    //   reportProgress: true,
    //   observe: 'events',
    //   headers: new HttpHeaders({
    //     'X-Auth-Key': environment.API_key
    //   })
    // });
  
    // This is the hardcoded response that will be returned when uploading a file. Including a delay to show the progressbar.
    const response = {
      type: 4,
      body: {
        data: invoice
     }
    }

    const httpEvent = of(response);

    return httpEvent.pipe(delay(3000)) ;
  }

  handleError(error: { error: ErrorEvent, status: number, message: string}): Observable<string> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
