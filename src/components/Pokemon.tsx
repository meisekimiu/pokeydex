import styled, {keyframes} from "styled-components";
import {SimplePokemon, getDexNo} from "../types/simplepokemon";

type PokeProps = {
    data: SimplePokemon,
    onFavorite: (f: boolean) => void,
    favorite: boolean,
    className?: string,
}

function capitalize(string: string): string {
    if (string.length > 1) {
        return string.substr(0, 1).toLocaleUpperCase() + string.substr(1).toLocaleLowerCase();
    } else {
        return string.toLocaleUpperCase();
    }
}

const faveAnim = keyframes`
from {transform: rotate(0deg)}
to {transform: rotate(360deg)}
`;

const Pokemon = styled(({data, onFavorite, favorite, className}: PokeProps) => {
    const dexNumber = getDexNo(data);
    const title = favorite ? "Unfavorite this Pokemon" : "Favorite this Pokemon";
    const imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${dexNumber}.png`;
    return <div className={`pokemon ${className}`} role="listitem">
        <span className="pokemon--dexno">#{dexNumber}</span>
        <img className="pokemon--image" src={imageUrl} alt={capitalize(data.name)} />
        <span className="pokemon--name">{capitalize(data.name)}</span>
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
