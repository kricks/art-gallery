import { ArtCreateComponent } from './art-create/art-create.component';
import { ArtListComponent } from './art-list/art-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/gallery', pathMatch: 'full'},
  { path: 'gallery', component: ArtListComponent },
  { path: 'create', component: ArtCreateComponent },
  { path: 'edit/:artId', component: ArtListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
