import {useState, useEffect} from "react";
import type {PokedexResults} from "../types/pokedexresults";

import Pokemon from "./Pokemon";

export default function Pokedex() {
    const [pokemon, setPokemon] = useState<PokedexResults>({
        count: 0,
        results: []
    });
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=151").then((results) => {
            results.json().then((data) => {
                const dex = data as PokedexResults;
                setPokemon(dex);
            });
        });
    }, []);
    const dex = pokemon.results.map(poke => <Pokemon data={poke} key={poke.url} />);
    return (<div className="pokedex">
        {dex}
    </div>);
}
