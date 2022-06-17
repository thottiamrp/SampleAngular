import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClaimsComponent } from './pages/claims/claims.component';
import { TableComponent } from './modules/claims/table/table.component';
import { FormComponent } from './modules/claims/form/form.component';
import { SidebarComponent } from './modules/claims/sidebar/sidebar.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomeComponent,
  },
  {
    path: "claims",
    component: ClaimsComponent,
    children: [
      {
        path: "",
        component: SidebarComponent,
        outlet: 'claims-sidebar'
      },
      {
        path: "",
        component: TableComponent
      },
      {
        path: "create",
        component: FormComponent
      },
      {
        path: "edit/:id",
        component: FormComponent
      }
    ],
  },
  {
    path: "**",
    pathMatch: "full",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  // imports: [RouterModule.forRoot([...routes], { onSameUrlNavigation: 'reload' })],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
