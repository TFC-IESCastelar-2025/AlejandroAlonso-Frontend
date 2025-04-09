import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  private URL_PRUEBA = `${environment.pruebaUrl}/prueba/ver`;
  private URL_CREAR = `${environment.pruebaUrl}/prueba/crear`;

  constructor(private http: HttpClient) { }

  obtenerJson(): Observable<any> {
    return this.http.get<any>(this.URL_PRUEBA);
  }

  crearJson(data: any): Observable<any> {
    return this.http.post<any>(this.URL_CREAR, data);
  }
}
