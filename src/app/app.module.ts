import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './modules/footer/footer.component';
import { HeaderComponent } from './modules/header/header.component';
import { ClaimsComponent } from './pages/claims/claims.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { TableComponent } from './modules/claims/table/table.component';
import { FormComponent } from './modules/claims/form/form.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { SidebarComponent } from './modules/claims/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    ClaimsComponent,
    PageNotFoundComponent,
    TableComponent,
    FormComponent,
    ConfirmationComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
