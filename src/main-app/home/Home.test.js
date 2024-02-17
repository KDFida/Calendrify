import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';

const setup = () => render(
    <BrowserRouter>
        <Home /> 
    </BrowserRouter>
);

describe('Home Component', () => {
    beforeEach(async () => {
      setup(); 
    });
    
    //Test Case 1: Render Full Calendar
    test('renders FullCalendar component', async () => {
        const fullCalendar= await screen.findByTestId('fullCalendar');
        expect(fullCalendar).toBeInTheDocument();
    });
  
    //Test Case 2: Render high priority tasks
    test('renders high priority tasks', async () => {
      expect(await screen.findByText('High Priority Tasks')).toBeInTheDocument();
    });
    
    //Test Case 3: Render tasks due today
    test('renders tasks due today', async () => {
      expect(await screen.findByText('Tasks Due Today')).toBeInTheDocument();
    });
});