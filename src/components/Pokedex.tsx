import {useState, useEffect} from "react";
import type {SimplePokemon} from "../types/simplepokemon";
import type {PokedexResults} from "../types/pokedexresults";

import Pokemon from "./Pokemon";

type PokedexProps = {
    sort?: "alpha"|"dex";
}

const sortMethods = {
    alpha: (a: SimplePokemon, b: SimplePokemon) => {
        return a.name.localeCompare(b.name);
    },
    dex: (a: SimplePokemon, b: SimplePokemon) => {
        const aNum = parseInt(a.url.split("/").filter(x => x.length > 0).pop() + "");
        const bNum = parseInt(b.url.split("/").filter(x => x.length > 0).pop() + "");
        return aNum - bNum;
    }
}

export default function Pokedex(props: PokedexProps) {
    const [pokemon, setPokemon] = useState<PokedexResults>({
        count: 0,
        results: []
    });
    const sort = props.sort ?? "dex";
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=151").then((results) => {
            results.json().then((data) => {
                const dex = data as PokedexResults;
                setPokemon(dex);
            });
        });
    }, []);
    const dex = pokemon.results.sort(sortMethods[sort]).map(poke => <Pokemon data={poke} key={poke.url} />);
    return (<div className="pokedex" role="list">
        {dex}
    </div>);
}
