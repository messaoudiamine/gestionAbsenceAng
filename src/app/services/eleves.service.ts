import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Eleve } from '../models/eleve';



@Injectable({
  providedIn: 'root'
})
export class ElevesService {

  apiurl = "http://localhost:8080/etudiant";
  constructor(private http:HttpClient) { }

  findAll(){
    return this.http.get<Eleve[]>(`${this.apiurl}/list`);
  }
  delete(id){
    return this.http.delete(`${this.apiurl}/delete/${id}`);

  }
  saveEleve(elve){
    console.log(elve);
    return this.http.post<Eleve[]>(`${this.apiurl}/save`, elve);
  }
  saveImageEleve(dataImage,id){
    const body = {id: id, dataImag: dataImage};
    return this.http.post(`${this.apiurl}/file`, body,{ observe: 'response' });
  }
  getEtudiantsByNiveau(idNiveau){
    return this.http.get<Eleve[]>(`${this.apiurl}/listeEtudiant/${idNiveau}`);
  }
}
