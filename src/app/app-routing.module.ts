import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PersonalComponent } from './personal/personal.component';
import { FamilyComponent } from './family/family.component';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home/login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'homepage',
        pathMatch: 'full',
      },
      {
        path: 'homepage',
        component: HomepageComponent,
      },
      {
        path: 'personal',
        component: PersonalComponent,
      },
      {
        path: 'family',
        component: FamilyComponent,
      },
      {
        path: 'education',
        component: EducationComponent,
      },
      {
        path: 'experience',
        component: ExperienceComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
