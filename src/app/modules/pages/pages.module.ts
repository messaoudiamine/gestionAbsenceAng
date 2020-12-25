import {NgModule} from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';

import {PagesRoutingModule} from './pages-routing.module';
import {PagesComponent} from './pages/pages.component';
import {DashBoardComponent} from './dash-board/dash-board.component';
import {LayoutModule} from '../layout/layout.module';
import { ElevesComponent } from './eleves/eleves.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormEleveComponent } from './forms/form-eleve/form-eleve.component';
import { AbsencesComponent } from './absences/absences.component';
import { NiveauxComponent } from './niveaux/niveaux.component';
import { ProfesseursComponent } from './professeurs/professeurs.component';
import { MatiersComponent } from './matiers/matiers.component';
import { SeancesComponent } from './seances/seances.component';
import { AnneescolaireComponent } from './anneescolaire/anneescolaire.component';
import { SemestresComponent } from './semestres/semestres.component';




@NgModule({
  declarations: [PagesComponent, DashBoardComponent, ElevesComponent,FormEleveComponent, AbsencesComponent, NiveauxComponent, ProfesseursComponent, MatiersComponent, SeancesComponent, AnneescolaireComponent, SemestresComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LayoutModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [  
    MatDatepickerModule,
  ],
})
export class PagesModule {
}
