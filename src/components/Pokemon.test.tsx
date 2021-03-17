import { render, screen, RenderResult } from '@testing-library/react';
import Pokemon from './Pokemon';

import OddishData from "./mockdata/oddish.json";

describe('Pokemon component', () => {
    const oddish = {
        name: "oddish",
        url: "https://pokeapi.co/api/v2/pokemon/43/"
    };
    let pokemon: RenderResult;
    beforeEach(() => {
        pokemon = render(<Pokemon data={oddish}/>);
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
})
