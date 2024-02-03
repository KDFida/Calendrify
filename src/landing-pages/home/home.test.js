import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';

describe('Home Component', () => {
  // Test case 1: Component renders
  test('renders Home component', () => {
    render(<Router><Home /></Router>);
    expect(screen.getByText('Welcome to Calendrify')).toBeInTheDocument();
  });

  // Test case 2: Check if the "Get Started" button is present
  test('contains get started button', () => {
    render(<Router><Home /></Router>);
    expect(screen.getByRole('button', { name: /Get Started/i })).toBeInTheDocument();
  });

  // Test case 3: Verify navigation link is correct
  test('navigate to create account works', () => {
    render(<Router><Home /></Router>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/create-account');
  });

  // Test case 4: Ensure "How It Works" section renders
  test('displays "How It Works" section correctly', () => {
    render(<Router><Home /></Router>);
    expect(screen.getByText('How It Works')).toBeInTheDocument();
    expect(screen.getByText('Step 1: Create an account and set up your calendar.')).toBeInTheDocument();
    expect(screen.getByText('Step 2: Easily add and manage your tasks and events.')).toBeInTheDocument();
    expect(screen.getByText('Step 3: Stay organized and never miss a deadline.')).toBeInTheDocument();
  });

  // Test case 5: Ensure "Benefits" section renders
  test('displays "Benefits" section correctly', () => {
    render(<Router><Home /></Router>);
    expect(screen.getByText('Benefits')).toBeInTheDocument();
    expect(screen.getByText('Improved Time Management')).toBeInTheDocument();
    expect(screen.getByText('Access Across Devices')).toBeInTheDocument();
  });

  // Test case 6: FAQ section renders correctly
  test('displays FAQ section correctly', () => {
    render(<Router><Home /></Router>);
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();

    expect(screen.getByText('Is Calendrify free to use?')).toBeInTheDocument();
    expect(screen.getByText('Yes, Calendrify is currently free to use and is accessible to everyone.')).toBeInTheDocument();

    expect(screen.getByText('Is it free to create an account?')).toBeInTheDocument();
    expect(screen.getByText('Absolutely! Creating an account on Calendrify is completely free. Sign up and start organizing your schedule in minutes.')).toBeInTheDocument();

    expect(screen.getByText('Can I use Calendrify on any device?')).toBeInTheDocument();
    expect(screen.getByText("Yes, Calendrify is designed to be compatible across all your devices. Whether you're on a computer, tablet, or smartphone, you can manage your schedule on the go.")).toBeInTheDocument();
  });
});