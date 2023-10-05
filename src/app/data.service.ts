import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiBaseUrl = 'https://dummy.restapiexample.com/api/v1'; // Replace with your API URL

  private mockApiUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getMessage(): string {
    return 'Hello from MyService!';
  }

  getSampleApiCall(): Observable<any> {
    const url = `${this.apiBaseUrl}/employees`;
    return this.httpClient.get(url);
  }

  getMockApiCallJsonFile() :  Observable<any> {
 
    const mockUrl = `${this.mockApiUrl}/employees`;
    console.log("MoackApi ",mockUrl);
    return this.httpClient.get(mockUrl);
  }

}
