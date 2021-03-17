import styled, {keyframes} from "styled-components";
import {SimplePokemon, getDexNo} from "../types/simplepokemon";

type PokeProps = {
    data: SimplePokemon,
    onFavorite: (f: boolean) => void,
    favorite: boolean,
    className?: string,
}

function capitalize(string: string): string {
    return string.split(" ").map(capitalizeWord).join(" ");
}

function capitalizeWord(string: string): string {
    if (string.length > 1) {
        return string.substr(0, 1).toLocaleUpperCase() + string.substr(1).toLocaleLowerCase();
    } else {
        return string.toLocaleUpperCase();
    }
}

// This function could be replaced with API calls for each pokemon. I just wanted to simplify as much as possible and didn't want to introduce other API calls here.
function correctPokemonName(name: string): string {
    const correctedPokemonNames = {
        "nidoran-m": "Nidoran♂",
        "nidoran-f": "Nidoran♀",
        "farfetchd": "Farfetch'd",
        "mr-mime": "Mr. Mime",
    }
    for (const replace in correctedPokemonNames) {
        if (name === replace) {
            return correctedPokemonNames[replace as keyof typeof correctedPokemonNames]; // bruh
        }
    }
    return name;
}


const faveAnim = keyframes`
from {transform: rotate(0deg)}
to {transform: rotate(360deg)}
`;

const Pokemon = styled(({data, onFavorite, favorite, className}: PokeProps) => {
    const dexNumber = getDexNo(data);
    const title = favorite ? "Unfavorite this Pokemon" : "Favorite this Pokemon";
    const imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${dexNumber}.png`;
    const name = capitalize(correctPokemonName(data.name));
    return <div className={`pokemon ${className}`} role="listitem">
        <span className="pokemon--dexno">#{dexNumber}</span>
        <img className="pokemon--image" src={imageUrl} alt={name} />
        <span className="pokemon--name">{name}</span>
        <span className="pokemon--favorite"><button className={favorite ? "set-unfavorite" : "set-favorite"} onClick={() => onFavorite(favorite)} title={title}>{favorite ? "★" : "☆"}</button></span>
    </div>
})`
display: block;
padding: 2em;
position: relative;
border: 2px solid #000;
border-radius: 1em;
margin: 1em;
width: 25%;
min-width: 128px;
.pokemon--dexno {
    position: absolute;
    left: 1ex;
    top: 1ex;
    font-family: monospace;
}
.pokemon--favorite {
    position: absolute;
    right: 1ex;
    top: 1ex;
    button {
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 1.2em;
    }
    .set--favorite {
        color: black;
    }
    .set-unfavorite {
        animation: ${faveAnim} 1s;
        animation-iteration-count: 1;
        color: gold;
    }
}
.pokemon--name {
    font-weight: bold;
}
.pokemon--image {
    display: block;
    margin: 0 auto;
    max-width: 33%;
}
`;

export default Pokemon;
