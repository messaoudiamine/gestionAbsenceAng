import { Component, OnInit } from '@angular/core';
import { AnneescolairesService } from 'src/app/services/anneescolaires.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-anneescolaire',
  templateUrl: './anneescolaire.component.html',
  styleUrls: ['./anneescolaire.component.scss']
})
export class AnneescolaireComponent implements OnInit {

  anneeScols: any = [];
  anneeScoForm: FormGroup;
  editForm = false;
  newAnneeScols: any ={
    id:null,
    dateDebut:'',
    dateFin:'',
    libelle:''
  }

  constructor(private anneeScolairesServices:AnneescolairesService , private formBuilder :FormBuilder) { }

  ngOnInit() {
    this.getAllAnneScols();
    this.anneeScoForm = this.formBuilder.group({
      date_debut:['', Validators.required],
      date_fin:['', Validators.required],
      libelle:['', Validators.required]
      })
  }
  restAnneScols(){
    this.editForm = false;
    this.newAnneeScols ={
      id:null,
      dateDebut:'',
      dateFin:'',
      libelle:''
    }
  }
  getAllAnneScols(){
    this.anneeScolairesServices.findAll().subscribe(
      anneeSc => {
        this.anneeScols = anneeSc
        console.log(anneeSc);
      }
      );
  }
  onSaveAnneScols(){
    this.newAnneeScols.dateDebut = this.anneeScoForm.get('date_debut').value;
    this.newAnneeScols.dateFin = this.anneeScoForm.get('date_fin').value;
    this.newAnneeScols.libelle = this.anneeScoForm.get('libelle').value;
    this.anneeScolairesServices.save(this.newAnneeScols).subscribe((anneSco)=>
    {
      if(!this.editForm){
        return this.anneeScols.push(anneSco);
      }
      this.restAnneScols();
    });
  }
  deleteAnneScols(id){
    this.anneeScolairesServices.delete(id).subscribe(() =>{
       this.anneeScols = this.anneeScols.filter(anneSc => anneSc.id !== id)
    });
  }
  editAnneScols(anneSc){
    this.editForm = true;
    this.newAnneeScols = anneSc
  }


}
