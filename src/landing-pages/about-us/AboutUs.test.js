import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutUs from './AboutUs';

describe('AboutUs Component', () => {
  // Test case 1: Component renders
  test('renders without crashing', () => {
    render(<AboutUs />);
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });

  // Test case 2: Content verification
  test('displays the correct content', () => {
    render(<AboutUs />);
    
    expect(screen.getByText("Hello! I'm Fida Khadim, a 3rd-year Computer Science student. Currently, I'm working on Calendrify as part of my dissertation project. This is a perfect blend for my academic pursuits and my passion for developing practical, user-friendly digital solutions.")).toBeInTheDocument();
    expect(screen.getByText("The idea for Calendrify stemmed from a combination of my academic curiosity and a desire to address a common challenge: effective time management. As a student juggling various responsibilities, I realized the need for a tool that could seamlessly integrate into everyday life and help individuals, like myself, manage their time more efficiently.")).toBeInTheDocument();
    expect(screen.getByText("This project has been a significant part of my learning journey. It's taught me not just about coding and app development, but also about the nuances of user experience design, project management, and the iterative process of developing a digital product from scratch.")).toBeInTheDocument();
    expect(screen.getByText("I see Calendrify as just the beginning. Post-graduation, I plan to continue refining the app, adding new features based on user feedback, and exploring how new technologies can be integrated to enhance its functionality.")).toBeInTheDocument();
    expect(screen.getByText("I’m always open to feedback and suggestions. If you have ideas on how Calendrify can be improved or want to collaborate, please feel free to reach out.")).toBeInTheDocument();
  });
  

  // Test case 3: Email link
  test('contains a correct email link', () => {
    render(<AboutUs />);
    const emailLink = screen.getByText('Email Me');
    expect(emailLink).toHaveAttribute('href', 'mailto:developerfida@gmail.com?subject=Calendrify&body=Hi%20Fida,');
  });
});