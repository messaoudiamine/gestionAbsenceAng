import { Component, OnInit } from '@angular/core';
import { NiveauService } from 'src/app/services/niveau.service';
import { FormGroup, FormArrayName, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-niveaux',
  templateUrl: './niveaux.component.html',
  styleUrls: ['./niveaux.component.scss']
})
export class NiveauxComponent implements OnInit {

  niveaux: any = [];
  niveauForm: FormGroup;
  editForm = false;
  newNiveaux: any ={
    id:null,
    intitule:''
  }

  constructor(private niveauService: NiveauService, private formBuilder :FormBuilder) { }

  ngOnInit() {
    this.getAlNiveau();
    this.niveauForm = this.formBuilder.group({
        intitule:['', Validators.required]
      })
  }
  restNiveau(){
    this.editForm = false;
    this.newNiveaux ={
      id:null,
      intitule:''
    }
  }
  getAlNiveau(){
    this.niveauService.findAll().subscribe(
      niveaux => {
        this.niveaux = niveaux
      }
      );
  }
  onSaveNiveau(){
    this.newNiveaux.intitule = this.niveauForm.get('intitule').value;
    this.niveauService.save(this.newNiveaux).subscribe((niveau)=>
    {
      this.restNiveau();
      if(!this.editForm){
        return this.niveaux.push(niveau);
      }
    });
  }
  deleteNiveau(id){
    this.niveauService.delete(id).subscribe(() =>{
       this.niveaux = this.niveaux.filter(niveau => niveau.id !== id)
    });
  }
  editNiveau(niveau){
    this.editForm = true;
    this.newNiveaux = niveau
  }

}
