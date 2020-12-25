import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Eleve } from 'src/app/models/eleve';
import { ElevesService } from 'src/app/services/eleves.service';

@Component({
  selector: 'app-form-eleve',
  templateUrl: './form-eleve.component.html',
  styleUrls: ['./form-eleve.component.scss']
})
export class FormEleveComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
    
  }


 

}
