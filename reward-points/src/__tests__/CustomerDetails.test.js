import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomerDetails from '../components/CustomerDetails';

const mockTransactions = [
  { amount: 120, date: '2025-06-01' },
  { amount: 75, date: '2025-05-15' },
  { amount: 45, date: '2025-04-10' },
  { amount: 200, date: '2025-03-01' },
];

describe('CustomerDetails Component', () => {
  test('renders rewards title with customer ID', () => {
    render(<CustomerDetails customerId="C123" transactions={mockTransactions} />);
    expect(screen.getByText(/Rewards Details for C123/i)).toBeInTheDocument();
  });

  test('displays total points for last 3 months by default', () => {
    render(<CustomerDetails customerId="C123" transactions={mockTransactions} />);
    expect(screen.getByText(/Total Points:/i)).toBeInTheDocument();
  });

  test('handles empty transactions gracefully', () => {
    render(<CustomerDetails customerId="C123" transactions={[]} />);
    expect(screen.getByText(/Total Points: 0/i)).toBeInTheDocument();
  });
});
