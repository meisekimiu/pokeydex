export type SimplePokemon = {
    name: string;
    url: string;
}

export function getDexNo(poke: SimplePokemon): number {
    return parseInt("" + poke.url.split("/").filter(a => a.length > 0).pop());
}
