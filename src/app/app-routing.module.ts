//#region 
/*
This is a TypeScript code for an Angular application that defines the routes of the application. 
It imports the necessary modules and components, and defines an array of routes that map to their respective components. 
It also defines an NgModule called AppRoutingModule that imports RouterModule and exports it. 
This module is used to configure and register the routes with the router module, and is then exported to be used in the root module of the application. 
The AuthGuard is used to determine whether or not the user is authorized to access certain routes.
*/
//#endregion

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { LoginPage } from "./pages/login/login.page";
import { PokemonListComponent } from "./components/pokemon-list/pokemon-list/pokemon-list.component";
import { CollectionComponent } from "./pages/collection/collection.component";

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "/login"
    },
    {
        path: "login",
        component: LoginPage
    },
    {
        path: 'pokemons', 
        component: PokemonListComponent, 
        canActivate: [AuthGuard]
    },
    {
        path: 'collection', 
        component: CollectionComponent, 
        canActivate: [AuthGuard]
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ], //import a module
    exports: [
        RouterModule
    ] // expose module and its features
})
export class AppRoutingModule {

}