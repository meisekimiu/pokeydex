import React, {useState} from 'react';
import './App.css';

import Pokedex from "./components/Pokedex";

type sortType = "dex" | "alpha";

function getStoredFavorites(): string[] {
    if (localStorage.getItem("favorites")) {
        try {
            return JSON.parse(localStorage.getItem("favorites") as string);
        } catch {
            localStorage.removeItem("favorites");
            return [];
        }
    } else {
        return [];
    }
}

function App() {
    const [sort, setSort] = useState<sortType>("dex");
    const favorites: string[] = getStoredFavorites();
    return (
        <div className="App">
            <h1>Pokédex</h1>
            <div>Sort by: <select onChange={(e) => setSort(e.target.value as sortType)}>
                <option value="dex" selected={sort === "dex"}>PokeDex #</option>
                <option value="alpha" selected={sort === "alpha"}>Alphabetical</option>
            </select></div>
            <Pokedex sort={sort} favorites={favorites} />
        </div>
    );
}

export default App;
