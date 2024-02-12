import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import QuoteWidget from './QuoteWidget';
import '@testing-library/jest-dom';

const setup = () => render(
    <QuoteWidget />
);

describe('QuoteWidget', () => {
    const mockSuccessResponse = {
        content: 'Test Quote',
        author: 'Test Author',
    };
    const mockFetchSuccess = Promise.resolve({
        json: () => Promise.resolve(mockSuccessResponse),
    });

    beforeAll(() => {
        global.fetch = jest.fn();
    });
      
    beforeEach(() => {
        jest.clearAllMocks();
        fetch.mockReset();
    });

    const mockFetchFailure = Promise.resolve({
        json: () => Promise.reject(new Error('Error fetching quote')),
    });

    // Test Case 1: Display author and quote if fetch is successful
    test('displays a quote and author after successful fetch', async () => {
        fetch.mockImplementationOnce(() => mockFetchSuccess);

        setup();
        
        await waitFor(() => {
            expect(screen.getByText(`"${mockSuccessResponse.content}"`)).toBeInTheDocument();
            expect(screen.getByText(`- ${mockSuccessResponse.author}`)).toBeInTheDocument();
        });
    });

    // Test Case 2: Display error if fetch is not successful
    test('displays an error message after a failed fetch', async () => {
        fetch.mockImplementationOnce(() => mockFetchFailure);

        setup();

        await waitFor(() => {
            expect(screen.getByText(/Error fetching quote. Please try again./)).toBeInTheDocument();
            expect(screen.queryByTestId('quote-author-name')).not.toBeInTheDocument();
        });
    });  
});
