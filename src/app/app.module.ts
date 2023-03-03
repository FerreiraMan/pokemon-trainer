import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list/pokemon-list.component';
import { CommonModule } from '@angular/common';
import { CollectionComponent } from './pages/collection/collection.component';
import { CaptureButtonComponent } from './components/capture-button/capture-button.component';

//Decorator
@NgModule({
  declarations: [ // COMPONENTS
    AppComponent,
    LoginPage,
    LoginFormComponent,
    NavbarComponent,
    CollectionComponent,
    PokemonListComponent,
    CollectionComponent,
    CaptureButtonComponent
  ],
  imports: [  // MODULES
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
