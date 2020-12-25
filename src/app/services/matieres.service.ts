import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MatieresService {

  apiurl = "http://localhost:8080/matiere";

  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<any[]>(`${this.apiurl}/list`);
  }
  delete(id){
    return this.http.delete(`${this.apiurl}/delete/${id}`);
  }
  save(matiere){
    return this.http.post(`${this.apiurl}/save`, matiere);
  }
}
