import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import TimeWidget from './TimeWidget';

const setup = () => render(
    <TimeWidget />
);

describe('TimeWidget component', () => {
  let initialDate;

  beforeEach(() => {
    jest.useFakeTimers();
    initialDate = new Date(2024, 1, 12, 13, 15, 0); // 12/02/2024, 13:15:00
    jest.spyOn(global, 'Date').mockImplementation(() => initialDate);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  // Test Case 1: Renders with the initial current time
  test('renders with the initial current time', () => {
    setup();
    expect(screen.getByText(initialDate.toLocaleTimeString())).toBeInTheDocument();
  });

  // Test Case 2: Updates the displayed time every second
  test('updates the displayed time every second', () => {
    setup();

    const initialTimeText = initialDate.toLocaleTimeString();
    expect(screen.getByText(initialTimeText)).toBeInTheDocument();

    const oneSecondLater = new Date(initialDate.getTime() + 1000);
    jest.spyOn(global, 'Date').mockImplementation(() => oneSecondLater);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText(oneSecondLater.toLocaleTimeString())).toBeInTheDocument();
  });
});