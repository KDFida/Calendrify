import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskTracking from './TaskTracking';
import { BrowserRouter } from 'react-router-dom';

const setup = () => render(
    <BrowserRouter>
        <TaskTracking /> 
    </BrowserRouter>
);

describe('TaskTracking Component', () => {
    beforeEach(() => {
        setup();
    });

    //Test Case 1: Render title
    test('renders the task tracking title', () => {
        const title = screen.getByText('Task Tracking');
        expect(title).toBeInTheDocument();
    });

    //Test Case 2: Render in progress section
    test('renders sections for in progress tasks', () => {
        const inProgressSection = screen.getByText('Task Tracking - In Progress');
        expect(inProgressSection).toBeInTheDocument();
    });

    //Test Case 3: Render not started section
    test('renders sections for not started tasks', () => {
        const notStartedSection = screen.getByText('Task Tracking - Not Started');
        expect(notStartedSection).toBeInTheDocument();
    });

    //Test Case 4: Render today section
    test('renders sections for today\'s tasks', () => {
        const todaySection = screen.getByText('Task Tracking - Today');
        expect(todaySection).toBeInTheDocument();
    });

    //Test Case 5: Display message when no tasks in progress
    test('displays correct message when no in progress tasks', () => {
        const noInProgressMessage = screen.getByText('No tasks in progress.');
        expect(noInProgressMessage).toBeInTheDocument();
    });

    //Test Case 6: Display message when no tasks not started
    test('displays correct message when no not started tasks', () => {
        const noNotStartedMessage = screen.getByText('No tasks not started.');
        expect(noNotStartedMessage).toBeInTheDocument();
    });

    //Test Case 7: Display message when no tasks today
    test('displays correct message when no tasks are due today', () => {
        const noTodayMessage = screen.getByText('No tasks due today.');
        expect(noTodayMessage).toBeInTheDocument();
    });
});