import { Component, OnInit } from '@angular/core';
import { MatieresService } from 'src/app/services/matieres.service';
import { ProfesseursService } from 'src/app/services/professeurs.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeancesService } from 'src/app/services/seances.service';

@Component({
  selector: 'app-seances',
  templateUrl: './seances.component.html',
  styleUrls: ['./seances.component.scss']
})
export class SeancesComponent implements OnInit {

  
  seances: any = [];
  timesD: any = ['8:00','10:00','14:00'];
  timesF: any = ['9:30','12:30','16:30'];
  matieres: any = [];
  days: any = [];
  professeurs: any = [];
  seanceForm : FormGroup;
  editForm = false;
  newSeance: any ={
    id: null,
    jour: '',
    heureDebut: '',
    heureFin: '',
    professeur: {
        id: null,
    },
    matiere: {
        id: null,
    }
  }

  constructor(private seancesService: SeancesService, private matieresService: MatieresService, private professeursService:ProfesseursService, private formBuilder :FormBuilder) { }

  ngOnInit() {
    this.getAllSeance();
    this.initSeance()
    this.getProfesseurs();
    // this.getAllMatiere();
    this.days =['lundi','mardi','mercredi','jeudi','vendredi'];
    
  }
  initSeance(){
    this.seanceForm = this.formBuilder.group(
      {
        beginningHour:['', Validators.required],
        endTime:['', Validators.required],
        jourSeance:['', Validators.required],
        matiere:['', Validators.required],
        professeur:['', Validators.required]
      }
    );
  }
  restSeance(){
    this.editForm = false;
    this.newSeance ={
      id: null,
      jour: '',
      heureDebut: '',
      heureFin: '',
      professeur: {
          id: null,
          // nom_prof: akkaoui,
          // prenom_prof: houssin,
          // tel_prof: 0143028028,
          // mail_prof: test2@gmail.com
      },
      matiere: {
          id: null,
          // intitule: '',
      }
    }
  }
  getAllSeance(){
    this.seancesService.findAll().subscribe(
      seance => {
        this.seances = seance,
        console.log(seance);
      }
      );
  }
  onSaveSeance(){
    this.newSeance.heureDebut = this.seanceForm.get('beginningHour').value;
    this.newSeance.heureFin = this.seanceForm.get('endTime').value;
    this.newSeance.jour = this.seanceForm.get('jourSeance').value;
    this.newSeance.matiere = this.matieres.find(x => x.id === this.seanceForm.get('matiere').value);
    this.newSeance.professeur = this.professeurs.find(x => x.id === this.seanceForm.get('professeur').value);
    this.seancesService.save(this.newSeance).subscribe(
      (seance)=> {
        this.restSeance();
        if(!this.editForm){
          return this.seances.push(seance);
        }
      }
    );
  }
  deleteSeance(id){
    this.seancesService.delete(id).subscribe(() =>{
       this.seances = this.seances.filter(seance => seance.id !== id)
    });
  }
  editSeance(seance){
    this.editForm = true;
    this.newSeance = seance
  }
  getProfesseurs(){
    this.professeursService.findAll().subscribe(
     professeur => {
       this.professeurs = professeur
      //  console.log(professeur);
     }
    );
  }
  getAllMatiere(){
    console.log(this.newSeance.professeur.id);
    this.matieresService.findAll().subscribe(
      matieres => {
        this.matieres = matieres.filter(x => x.professeur.id === this.newSeance.professeur.id)
      }
      );
      console.log(this.matieres);
  }
  


}
