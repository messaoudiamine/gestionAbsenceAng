import { Component,ViewChild ,ElementRef , OnInit, Input } from '@angular/core';
import { ElevesService } from 'src/app/services/eleves.service';
import { Eleve } from 'src/app/models/eleve';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NiveauService } from 'src/app/services/niveau.service';


// import $ = require('jquery');
declare var jQuery:any;

@Component({
  selector: 'app-eleves',
  templateUrl: './eleves.component.html',
  styleUrls: ['./eleves.component.scss']
})
export class ElevesComponent implements OnInit {
  eleves : any= [];
  niveau : any=  [];
  modelvalue :any=[];
  tableImage:any;

  showModal : boolean = true;
  showMessage : boolean = false;
  editForm = false;
  eleveForm : FormGroup;
  fileIsUploading = false;
  fileUrl : string;
  fileUploaded = false;
  newEleve : Eleve = {
    nom_etud:'',
    prenom_etud:'',
    sexe_etud:'M',
    telephone_etud:'',
    mail_etud:'',
    date_nais_etud: new Date(),
    lieu_naissance_etud:'',
    cin_etud:'',
    photo_etud:'',
    niveau:{
      id:null,
      intitule:''
    }
  };
  constructor(private elevesServices: ElevesService, private niveauService:NiveauService, private formBuilder:FormBuilder) { }
  ngOnInit() {
    this.getEleves();
    this.initEleve();
    this.getAllNiveau();
  }
  initEleve(){
    this.eleveForm = this.formBuilder.group(
      {
        lastname:['',Validators.required],
        firstName: ['', Validators.required],
        dateNaissance: ['', Validators.required],
        city: ['', Validators.required],
        Cin: ['', Validators.required],
        sexe: ['', Validators.required],
        telephone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        photo: ['', Validators.required],
        niveau: ['', Validators.required],
      }
    );
  }
  
  restEleve(){
    this.editForm = false;
    this.newEleve = {
      nom_etud:'',
      prenom_etud:'',
      sexe_etud:'',
      telephone_etud:'',
      mail_etud:'',
      date_nais_etud: new Date(),
      lieu_naissance_etud:'',
      cin_etud:'',
      photo_etud:'',
      niveau:{
        id:null,
        intitule:''
      }
    }
  }
  getEleves(){
    this.elevesServices.findAll().subscribe(
          elevs => this.eleves = elevs
    );
  }
  deleteEleve(id){
    this.elevesServices.delete(id)
    .subscribe(() => {
      this.eleves = this.eleves.filter(eles => eles.id !== id)
    });
  }
  onSaveEleve(){
    this.newEleve.nom_etud = this.eleveForm.get('lastname').value;
    this.newEleve.prenom_etud = this.eleveForm.get('firstName').value;
    this.newEleve.sexe_etud = this.eleveForm.get('sexe').value;
    this.newEleve.telephone_etud = this.eleveForm.get('telephone').value;
    this.newEleve.mail_etud = this.eleveForm.get('email').value;
    this.newEleve.date_nais_etud = this.eleveForm.get('dateNaissance').value;
    this.newEleve.lieu_naissance_etud = this.eleveForm.get('city').value;
    this.newEleve.cin_etud = this.eleveForm.get('Cin').value;
    this.newEleve.niveau = this.niveau.find(x => x.id === this.eleveForm.get('niveau').value);
    // if(this.fileUrl && this.fileUrl !== ''){
      console.log(this.modelvalue);
      this.newEleve.photo_etud = "image";

    // }
    this.elevesServices.saveEleve(this.newEleve)
        .subscribe((ele) => {         
          this.saveFileLocal(this.modelvalue, ele['id']);
          this.showMessage = true;
          if(!this.editForm){
            return this.eleves.push(ele);
          }
          this.restEleve();
        });
  }
  editEleve(eleve){
    this.newEleve = eleve;
    this.editForm = true;
  }
  updateEleve(){
    this.elevesServices.saveEleve(this.newEleve)
        .subscribe(eleve => {
          this.restEleve();
          this.editForm = false;
        });
  }
  detectFile(event){
    console.log("test messaoudi")
    this.fileUrl = event.target.value;
    this.modelvalue = this.getBase64(event);
    console.log(this.modelvalue);
    this.fileUploaded = true;
  }
  public getBase64(event) {
    let me = this;
    me.modelvalue = [];
    if(event.target.files){
      for(var i =0;i<5;i++){
        // let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = function (data : Event) {
          
          // me.modelvalue = data.target;
          // console.log(data.target.result.split(','))
          // console.log((<string>reader.result).split(',')[1])
          me.modelvalue.push((<string>reader.result).split(',')[1]);
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      }
    }
    console.log(me.modelvalue);
    return me.modelvalue;
  
 }
  saveFileLocal(dataImage, id){
    this.elevesServices.saveImageEleve(dataImage, id)
    .subscribe(data => {
        console.log('Image uploaded successfully');
    });
  }
  private getAllNiveau(){
    this.niveauService.findAll().subscribe(
      niveau => {
        this.niveau = niveau;
      }
        
    );
  }
  public getDimensionsByFilter(id){
    return this.niveau.filter(x => x.id === id);
  }
  public getEtudiantByclass(idClass = null){
    this.elevesServices.getEtudiantsByNiveau(idClass).subscribe(
      etudiant =>{
        this.eleves = etudiant
      }
    )
  }

  

}
