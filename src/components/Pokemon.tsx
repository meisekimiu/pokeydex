import {SimplePokemon} from "../types/simplepokemon";

type PokeProps = {
    data: SimplePokemon
}

function capitalize(string: string): string {
    if (string.length > 1) {
        return string.substr(0, 1).toLocaleUpperCase() + string.substr(1).toLocaleLowerCase();
    } else {
        return string.toLocaleUpperCase();
    }
}

export default function Pokemon({data}: PokeProps) {
    const dexNumber = data.url.split("/").filter(a => a.length > 0).pop();
    return <div className="pokemon">
        <span className="pokemon--dexno">#{dexNumber}</span>
        <span className="pokemon--name">{capitalize(data.name)}</span>
    </div>
}
