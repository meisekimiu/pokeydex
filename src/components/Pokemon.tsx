import {SimplePokemon, getDexNo} from "../types/simplepokemon";

type PokeProps = {
    data: SimplePokemon,
    onFavorite: (f: boolean) => void,
    favorite: boolean,
}

function capitalize(string: string): string {
    if (string.length > 1) {
        return string.substr(0, 1).toLocaleUpperCase() + string.substr(1).toLocaleLowerCase();
    } else {
        return string.toLocaleUpperCase();
    }
}

export default function Pokemon({data, onFavorite, favorite}: PokeProps) {
    const dexNumber = getDexNo(data);
    const title = favorite ? "Unfavorite this Pokemon" : "Favorite this Pokemon";
    return <div className="pokemon" role="listitem">
        <span className="pokemon--dexno">#{dexNumber}</span>
        <span className="pokemon--name">{capitalize(data.name)}</span>
        <span className="pokemon--favorite"><button onClick={() => onFavorite(favorite)} title={title}>☆</button></span>
    </div>
}
