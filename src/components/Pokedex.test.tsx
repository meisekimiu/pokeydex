import { act, render, screen, RenderResult, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import Pokedex from './Pokedex';

import type {PokedexResults} from "../types/pokedexresults";
import MockAPIResults from "./mockdata/oddish-vileplume.json";

describe('Pokedex component', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
        fetchMock.mockResponse(() => {
            return new Promise(resolve => {
                resolve(JSON.stringify(MockAPIResults));
            });
        });
    });
    it('grabs data from the API', async () => {
        let apiCalled = false;
        fetchMock.mockOnce(() => {
            apiCalled = true;
            return new Promise(resolve => {
                resolve(JSON.stringify(MockAPIResults));
            });
        });
        await act(async () => {
            render(<Pokedex />);
        });
        expect(apiCalled).toBeTruthy();
    });
    it('lists data from API as Pokemon components', async () => {
        await act(async () => {
            render(<Pokedex />);
        });
        expect(await screen.findByText(/oddish/i)).toBeInTheDocument();
    });
});
