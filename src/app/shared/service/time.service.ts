import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const timeUrl = environment.timeUrl;

@Injectable({
  providedIn: 'root'
})
export class TimeService {

    constructor(private http: HttpClient) {}
    
    getDailyBoss(): Observable<String> {
        return this.http.get<String>(`${timeUrl}`);
    }

}