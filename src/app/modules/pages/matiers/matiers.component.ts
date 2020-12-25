import { Component, OnInit } from '@angular/core';
import { MatieresService } from 'src/app/services/matieres.service';
import { ProfesseursService } from 'src/app/services/professeurs.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-matiers',
  templateUrl: './matiers.component.html',
  styleUrls: ['./matiers.component.scss']
})
export class MatiersComponent implements OnInit {

  matieres: any = [];
  professeurs: any = [];
  matiereForm : FormGroup;
  editForm = false;
  newMatiere: any ={
    id:null,
    intitule:'',
    professeur: {
      id: null,
      nom_prof: '',
      prenom_prof: '',
      tel_prof: '',
      mail_prof: ''
    }
  }

  constructor(private matieresService: MatieresService, private professeursService:ProfesseursService, private formBuilder :FormBuilder) { }

  ngOnInit() {
    this.getAllMatiere();
    this.initMatiere()
    this.getProfesseurs();
    
  }
  initMatiere(){
    this.matiereForm = this.formBuilder.group(
      {
        intitule:['', Validators.required],
        professeur:['', Validators.required]
      }
    );
  }
  restMatiere(){
    this.editForm = false;
    this.newMatiere ={
      id:null,
      intitule:'',
      professeur: {
        id: null,
        nom_prof: '',
        prenom_prof: '',
        tel_prof: '',
        mail_prof: ''
      }
    }
  }
  getAllMatiere(){
    this.matieresService.findAll().subscribe(
      matieres => {
        this.matieres = matieres,
        console.log(matieres);
      }
      );
  }
  onSaveMatiere(){
    console.log(this.matiereForm.get('professeur').value);
    this.newMatiere.intitule = this.matiereForm.get('intitule').value;
    this.newMatiere.professeur = this.professeurs.find(x => x.id === this.matiereForm.get('professeur').value);
    this.matieresService.save(this.newMatiere).subscribe(
      (matiere)=> {
        this.restMatiere();
        if(!this.editForm){
          return this.matieres.push(matiere);
        }
      }
    );
  }
  deleteMatiere(id){
    this.matieresService.delete(id).subscribe(() =>{
       this.matieres = this.matieres.filter(matiere => matiere.id !== id)
    });
  }
  editMatiere(matiere){
    this.editForm = true;
    this.newMatiere = matiere
  }
  getProfesseurs(){
    this.professeursService.findAll().subscribe(
     professeur => {
       this.professeurs = professeur
       console.log(professeur);
     }
    );
  }

}
