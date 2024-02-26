import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ManageTasksDialog from './ManageTasksDialog';

const mockTasks = [
  { id: '1', title: 'Task 1', status: 'notStarted', deadline: '2024-02-26', start: '2024-02-01' },
  { id: '2', title: 'Task 2', status: 'inProgress', deadline: '2024-02-27', start: '2024-02-01' },
  { id: '4', title: 'Task 3', status: 'finished', deadline: '2024-02-28', start: '2024-02-01' }
];

const setup = () => render(
    <ManageTasksDialog open={true} onClose={() => {}} tasks={mockTasks} onDelete={() => {}} />
);

describe('ManageTasksDialog Component', () => {
    beforeEach(() => {
        setup();
    });
  
    //Test Case 1: Render dialog
    test('renders dialog with tasks', () => {
      expect(screen.getByText('Manage Tasks')).toBeInTheDocument();
      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
      expect(screen.getByText('Task 3')).toBeInTheDocument();
    });

    //Test Case 2: Open the edit dialog
    test('opens edit dialog for a task', () => {
        fireEvent.click(screen.getAllByLabelText('edit')[0]);
        expect(screen.getByText('Status')).toBeInTheDocument();
        expect(screen.getByLabelText('Deadline')).toHaveValue('2024-02-26');
    });       
});