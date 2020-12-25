import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfesseursService {

  apiUrl = "http://localhost:8080/professeur";

  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<any[]>(`${this.apiUrl}/list`);
  }
  saveProfesseur(professeur){
      return this.http.post<any[]>(`${this.apiUrl}/save`, professeur);
  }
  deleteProfesseur(id){
   return this.http.delete(`${this.apiUrl}/delete/${id}`, id);
  }
}
