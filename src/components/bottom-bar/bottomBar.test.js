import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import BottomBar from './BottomBar';

const HomePage = () => <div>Home Page Content</div>;
const AboutUsPage = () => <div>About Us Page Content</div>;
const ContactUsPage = () => <div>Contact Us Page Content</div>;

const setup = () => render(
  <MemoryRouter initialEntries={['/']}>
    <Routes>
      <Route path="/" element={<BottomBar />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="/contact-us" element={<ContactUsPage />} />
    </Routes>
  </MemoryRouter>
);

describe('BottomBar Component', () => {

  // Test Case 1: Render Component
  test('renders BottomBar component', () => {
    setup();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  // Test Case 2: Navigation to About Us page
  test('navigates to About Us page', async () => {
    setup();
    userEvent.click(screen.getByText('About Us'));
    expect(await screen.findByText('About Us Page Content')).toBeInTheDocument();
  });

  // Test Case 3: Navigation to Contact Us page
  test('navigates to Contact Us page', async () => {
    setup();
    userEvent.click(screen.getByText('Contact Us'));
    expect(await screen.findByText('Contact Us Page Content')).toBeInTheDocument();
  });

  // Test Case 4: Navigation to Home page
  test('navigates to Home page', async () => {
    setup();
    userEvent.click(screen.getByText('Home'));
    expect(await screen.findByText('Home Page Content')).toBeInTheDocument();
  });
});