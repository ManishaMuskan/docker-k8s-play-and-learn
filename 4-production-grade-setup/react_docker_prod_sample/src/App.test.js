import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders learn react link - testing test reflection', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('Added third test to test reflection on docker container', () => {
  render(<App />);
  const linkElement = screen.getByText(/volumes/i);
  expect(linkElement).toBeInTheDocument();
});
