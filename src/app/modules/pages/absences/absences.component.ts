import { Component, OnInit, Renderer2 } from '@angular/core';
import { AbsencesService } from 'src/app/services/absences.service';
import { NiveauService } from 'src/app/services/niveau.service';
import { ElevesService } from 'src/app/services/eleves.service';
import { Eleve } from 'src/app/models/eleve';
import {FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as $ from 'jquery';
@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.scss']
})
export class AbsencesComponent implements OnInit {

  absences: any = [];
  Allabsences: any = [];
  niveau: any = [];
  eleves:any= [];
  btnFilter: boolean = true;
  absenceForm: FormGroup;
  selectNiveau=0;
  dateFilter :Date;
  showModal : boolean = true;
  newAbsenceEd: any = {
    date_absence:'',
    etat: '',
    heure_debut:'',
    heure_Fin:'',
    justif:'',
  }
  constructor(private renderer: Renderer2,private absencesService:AbsencesService, private niveauService: NiveauService,private elevesService: ElevesService,private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.getAbsences();
    this.getNiveau();
    this.initAbsence();
    // $(function () {
    //   $('#example2').DataTable({
    //     "paging": true,
    //     "lengthChange": false,
    //     "searching": false,
    //     "ordering": true,
    //     "info": true,
    //     "autoWidth": false,
    //     "responsive": true,
    //   });
    // });
  }
  initAbsence(){
    this.absenceForm = this.formBuilder.group(
      {
        date_absence:['',Validators.required],
        etat:['',Validators.required],
        heure_debut:['',Validators.required],
        heure_Fin:['',Validators.required],
        justif:['',Validators.required],
        
      }
    );
  }

  getAbsences(){
    this.absencesService.findAll().subscribe(
      absens => this.absences = this.Allabsences = absens
    );
  }
  getNiveau(){
    this.niveauService.findAll().subscribe(
      niveau => this.niveau = niveau
    );
  }
  getAbsenceByNiveau(niveau){
    let newAbsences = this.Allabsences;
    if(niveau != 0){
      newAbsences = newAbsences.filter( absen => absen.etudiant.niveau.id === niveau);
    }    
    this.absences = newAbsences;
  }
  editAbsence(absence){
    this.newAbsenceEd = absence;
  }
  onSaveAbsence(){
    this.newAbsenceEd.date_absence = this.absenceForm.get("date_absence").value;
    this.newAbsenceEd.etat = this.absenceForm.get("etat").value;
    this.newAbsenceEd.heure_debut = this.absenceForm.get("heure_debut").value;
    this.newAbsenceEd.heure_Fin = this.absenceForm.get("heure_Fin").value;
    this.newAbsenceEd.justif = this.absenceForm.get("justif").value;
    this.absencesService.saveAbsence(this.newAbsenceEd).subscribe(
      (absenc)=>{
        this.showModal = false,
        this.renderer.removeClass(document.body, 'modal-open');
    });
  }
  onCheckDate(dateFil){
    if(dateFil !== ''){
      this.btnFilter = false;
    }
    console.log(this.btnFilter);
  }
  getAbsenceByDateAndClass(){
    let newAbsences= this.absences;
    newAbsences = newAbsences.filter( absen => absen.date_absence === this.dateFilter);
    this.absences =  newAbsences;
  }


}
