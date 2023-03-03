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