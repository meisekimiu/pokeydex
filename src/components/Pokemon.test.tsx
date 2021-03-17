import { act, render, screen, RenderResult } from '@testing-library/react';
import Pokemon from './Pokemon';

import {SimplePokemon} from "../types/simplepokemon";

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
    it('should include a picture', () => {
        const image = screen.getByAltText("Oddish") as HTMLImageElement;
        expect(image.src).toMatch("43.png");
    });
    describe('corrected names', () => {
        function renderPokemon(pokemon: SimplePokemon) {
            render(<Pokemon data={pokemon} onFavorite={() => {}} favorite={false} />);
        }
        test('Nidoran Male', () => {
            const pokemon = {
                name: "nidoran-m",
                url: ""
            };
            renderPokemon(pokemon);
            expect(screen.queryByText(/nidoran-m/i)).toBeNull();
        });
        test('Nidoran Female', () => {
            const pokemon = {
                name: "nidoran-f",
                url: ""
            };
            renderPokemon(pokemon);
            expect(screen.queryByText(/nidoran-f/i)).toBeNull();
        });
        test('Farfetch\'d', () => {
            const pokemon = {
                name: "farfetchd",
                url: ""
            };
            renderPokemon(pokemon);
            expect(screen.queryByText(/farfetchd/i)).toBeNull();
        });
        test('Mr. Mime', () => {
            const pokemon = {
                name: "mr-mime",
                url: ""
            };
            renderPokemon(pokemon);
            expect(screen.queryByText(/mr-mime/i)).toBeNull();
        });
    })
})
