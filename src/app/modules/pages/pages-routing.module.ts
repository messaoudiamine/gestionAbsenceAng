import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PagesComponent} from './pages/pages.component';
import {DashBoardComponent} from './dash-board/dash-board.component';
import { ElevesComponent } from './eleves/eleves.component';
import { AbsencesComponent } from './absences/absences.component';
import { NiveauxComponent } from './niveaux/niveaux.component';
import { ProfesseursComponent } from './professeurs/professeurs.component';
import { MatiersComponent } from './matiers/matiers.component';
import { SeancesComponent } from './seances/seances.component';
import { SemestresComponent } from './semestres/semestres.component';
import { AnneescolaireComponent } from './anneescolaire/anneescolaire.component';


const routes: Routes = [
  {
    path: '', component: PagesComponent, children: [
      {path: '', component: DashBoardComponent},
      {path: 'eleves', component: ElevesComponent},
      {path: 'absences', component: AbsencesComponent},
      {path: 'niveaux', component: NiveauxComponent},
      {path: 'professeurs', component: ProfesseursComponent},
      {path: 'matiers', component: MatiersComponent},
      {path: 'seances', component: SeancesComponent},
      {path: 'semestres', component: SemestresComponent},
      {path: 'anneescolaire', component: AnneescolaireComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
