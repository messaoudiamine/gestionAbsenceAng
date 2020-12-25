import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SemestresService } from 'src/app/services/semestres.service';
import { AnneescolairesService } from 'src/app/services/anneescolaires.service';

@Component({
  selector: 'app-semestres',
  templateUrl: './semestres.component.html',
  styleUrls: ['./semestres.component.scss']
})
export class SemestresComponent implements OnInit {

  semestres: any = [];
  anneeScolaires: any = [];
  semestreForm : FormGroup;
  editForm = false;
  newSemestre: any ={
    id: null,
    libelle: '',
    dateDebut: '',
    dateFin: '',
    anneeScolaire: {
        id: null,
    }
  };

  constructor(private semestreService: SemestresService, private anneeScolaireService: AnneescolairesService, private formBuild :FormBuilder) { }

  ngOnInit() {
    this.getAllSemestre();
    this.initSemestre()
    this.getAllAnneeScolaire();
    
  }
  initSemestre(){
    this.semestreForm = this.formBuild.group(
      {
        dateDebut:['', Validators.required],
        dateFin:['', Validators.required],
        libelle:['', Validators.required],
        anneescol:['', Validators.required]
      }
    );
  }
  restSemestre(){
    this.editForm = false;
    this.newSemestre ={
      id: null,
      libelle: '',
      dateDebut: '',
      dateFin: '',
      anneeScolaire: {
          id: null,
      }
    }
  }
  getAllSemestre(){
    this.semestreService.findAll().subscribe(
      semestre => {
        this.semestres = semestre
      }
      );
  }
  onSaveSemestre(){
    this.newSemestre.heureDebut = this.semestreForm.get('dateDebut').value;
    this.newSemestre.heureFin = this.semestreForm.get('dateFin').value;
    this.newSemestre.jour = this.semestreForm.get('libelle').value;
    this.newSemestre.anneeScolaire = this.anneeScolaires.find(x => x.id === this.semestreForm.get('anneescolaire').value);
    this.semestreService.save(this.newSemestre).subscribe(
      (semestre)=> {
        this.restSemestre();
        if(!this.editForm){
          return this.semestres.push(semestre);
        }
      }
    );
  }
  deleteSemestre(id){
    this.semestreService.delete(id).subscribe(() =>{
       this.semestres = this.semestres.filter(semestre => semestre.id !== id)
    });
  }
  editSemestre(semestre){
    this.editForm = true;
    this.newSemestre = semestre
  }

  getAllAnneeScolaire(){
    this.anneeScolaireService.findAll().subscribe(
      anneeScolaire => {
        this.anneeScolaires = anneeScolaire
      }
      );
  }

}
