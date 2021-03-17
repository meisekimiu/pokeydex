import {useState, useEffect} from "react";
import {SimplePokemon, getDexNo} from "../types/simplepokemon";
import type {PokedexResults} from "../types/pokedexresults";

import Pokemon from "./Pokemon";

type PokedexProps = {
    sort?: "alpha"|"dex";
    favorites: string[];
}

const sortMethods = {
    alpha: (a: SimplePokemon, b: SimplePokemon) => {
        return a.name.localeCompare(b.name);
    },
    dex: (a: SimplePokemon, b: SimplePokemon) => {
        return getDexNo(a) - getDexNo(b);
    }
}

export default function Pokedex(props: PokedexProps) {
    const [pokemon, setPokemon] = useState<PokedexResults>({
        count: 0,
        results: []
    });
    const [favorites, setFavorites] = useState<string[]>(props.favorites ?? []);
    const sort = props.sort ?? "dex";
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=151").then((results) => {
            results.json().then((data) => {
                const dex = data as PokedexResults;
                setPokemon(dex);
            });
        });
    }, []);
    const dex = pokemon.results.sort(sortMethods[sort]).map(poke => <Pokemon data={poke} key={poke.url} favorite={favorites.includes(poke.name)} onFavorite={(fave) => {
        if (!fave) {
            setFavorites(favorites.concat(poke.name));
        } else {
            setFavorites(favorites.filter(mon => mon !== poke.name));
        }
    }} />);
    return (<div className="pokedex" role="list">
        {dex}
    </div>);
}
