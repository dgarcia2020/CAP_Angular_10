import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import {LoginComponent} from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SongComponent } from './song/song.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'contact',
    component: ContactComponent
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'song',
    component: SongComponent
  },
  {
    path:'song/:id',
    component: SongComponent
  },
  {
    path:'**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

