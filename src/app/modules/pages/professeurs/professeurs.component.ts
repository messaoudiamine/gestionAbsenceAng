import { Component, OnInit } from '@angular/core';
import { ProfesseursService } from 'src/app/services/professeurs.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-professeurs',
  templateUrl: './professeurs.component.html',
  styleUrls: ['./professeurs.component.scss']
})
export class ProfesseursComponent implements OnInit {

  professeurs: any = [];
  newProfesseurs: any = {
    nom_prof:'', 
    prenom_prof:'',
    telephone_prof:'',
    mail_prof:''
  };
  showModal :boolean = false;
  editForm = false;
  profForm : FormGroup;
  constructor(private professeursService: ProfesseursService,private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.getProfesseurs();
    this.initProfesseurs();
  }

  initProfesseurs(){
    this.profForm = this.formBuilder.group(
      {
        lastname:['',Validators.required],
        firstName: ['', Validators.required],
        telephone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      }
    );
  }
  restProf(){
    this.editForm = false;
    this.newProfesseurs = {
      nom_prof:'',
      prenom_prof:'',
      telephone_prof:'',
      mail_prof:''
    }
  }
  getProfesseurs(){
    this.professeursService.findAll().subscribe(
     professeur => {
       this.professeurs = professeur
       console.log(professeur);
     }
    );
  }
  onSaveProf(){
    this.newProfesseurs.nom_prof = this.profForm.get('lastname').value;
    this.newProfesseurs.prenom_prof = this.profForm.get('firstName').value;
    this.newProfesseurs.telephone_prof = this.profForm.get('telephone').value;
    this.newProfesseurs.mail_prof = this.profForm.get('email').value;
    this.professeursService.saveProfesseur(this.newProfesseurs)
        .subscribe((prof: any) => {     
          this.restProf();
          if(!this.editForm){
            return this.professeurs.push(prof);
          }
          
        });

  }
  deleteProfesseur(id){
    this.professeursService.deleteProfesseur(id)
    .subscribe(() => {
      this.professeurs = this.professeurs.filter(prof => prof.id !== id)
    });
  }
  editProfesseur(professeur){
   this.newProfesseurs = professeur; 
   this.editForm = true;
  }

}
