import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AbsencesService {

  apiurl = "http://localhost:8080/absence";
  constructor(private http:HttpClient) { }


  findAll(){
    return this.http.get<any[]>(`${this.apiurl}/list`);
  }
  saveAbsence(absence){
    return this.http.post<any[]>(`${this.apiurl}/save`, absence);
  }
}
