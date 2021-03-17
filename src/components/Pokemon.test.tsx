import { act, render, screen, RenderResult } from '@testing-library/react';
import Pokemon from './Pokemon';

import OddishData from "./mockdata/oddish.json";

describe('Pokemon component', () => {
    const oddish = {
        name: "oddish",
        url: "https://pokeapi.co/api/v2/pokemon/43/"
    };
    let pokemon: RenderResult;
    let favorited: boolean;
    beforeEach(() => {
        favorited = false;
        pokemon = render(<Pokemon data={oddish} onFavorite={(fav) => {
            favorited = !fav;
        }} favorite={favorited} />);
    });
    it('should take a pokemon value', () => {
        expect(screen.getByText(/oddish/i)).toBeInTheDocument();
    });
    it('should capitalize the pokemon name', () => {
        expect(screen.getByText("Oddish")).toBeInTheDocument();
    });
    it('should have national pokedex number', () => {
        // You can tell I'm a pokemon nerd by how I phrased that
        expect(screen.getByText("#43")).toBeInTheDocument();
    });
    it('should be able to be favorited', () => {
        const favButton = screen.getByTitle(/favorite/i);
        expect(favButton).toBeInTheDocument();
        act(() => {
            favButton.click();
        });
        expect(favorited).toBeTruthy();
    });
    it('should be able to be unfavorited', () => {
        favorited = true;
        render(<Pokemon data={oddish} onFavorite={(fav) => {
            favorited = !fav;
        }} favorite={favorited} />);
        const favButton = screen.getByTitle(/unfavorite/i);
        expect(favButton).toBeInTheDocument();
        act(() => {
            favButton.click();
        });
        expect(favorited).toBeFalsy();
    });
})
