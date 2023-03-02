import { Guitar } from "./guitar.model";
import { Pokemon } from "./pokemon.model";

export interface User {
    id: number;
    username: string;
    favouritesPokemon: Pokemon[];

}
