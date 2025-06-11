import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TransactionList from './TransactionsList.js';
import { rewardsPoints } from '../utils/util.js';
import { MONTHS, YEARS } from '../constants/rewadsConstants.js';
import { format, parseISO, subMonths } from 'date-fns';

const CustomerDetails = ({ customerId, transactions }) => {
    const now = new Date();

    const last3MonthKeys = [
        format(subMonths(now, 2), 'yyyy-MM'),
        format(subMonths(now, 1), 'yyyy-MM'),
        format(now, 'yyyy-MM'),
    ];

    const [selectedMonth, setSelectedMonth] = useState('last3months');
    const [selectedYear, setSelectedYear] = useState('2025');
    const rewardsByMonth = useMemo(() => {
        const rewards = {};
        transactions.forEach((txn) => {
            const date = parseISO(txn.date);
            const monthKey = format(date, 'yyyy-MM');
            rewards[monthKey] = (rewards[monthKey] || 0) + rewardsPoints(txn.amount);
        });
        return rewards;
    }, [transactions]);

    // Compute rewards based on current selection
    const selectedRewards = useMemo(() => {
        const rewards = {};
        if (selectedMonth === 'last3months') {
            transactions.forEach((txn) => {
                const date = parseISO(txn.date);
                const key = format(date, 'yyyy-MM');
                if (last3MonthKeys.includes(key)) {
                    rewards[key] = (rewards[key] || 0) + rewardsPoints(txn.amount);
                }
            });
        } else {
            transactions.forEach((txn) => {
                const date = parseISO(txn.date);
                const month = format(date, 'MMMM');
                const year = format(date, 'yyyy');
                if (month === selectedMonth && year === selectedYear) {
                    const key = `${year}-${format(date, 'MM')}`;
                    rewards[key] = (rewards[key] || 0) + rewardsPoints(txn.amount);
                }
            });
        }
        return rewards;
    }, [transactions, selectedMonth, selectedYear]);

    // Filter transactions based on selection
    const filteredTransactions = useMemo(() => {
        if (selectedMonth === 'last3months') {
            return transactions.filter((txn) => {
                const date = parseISO(txn.date);
                const key = format(date, 'yyyy-MM');
                return last3MonthKeys.includes(key);
            });
        }

        return transactions.filter((txn) => {
            const date = parseISO(txn.date);
            const month = format(date, 'MMMM');
            const year = format(date, 'yyyy');
            return month === selectedMonth && year === selectedYear;
        });
    }, [transactions, selectedMonth, selectedYear]);

    const Title = styled.h2`
        text-align: center;
        color: #333;
        margin-bottom: 10px;
    `;

    return (
        <>
            <Title>Rewards Details for {customerId}</Title>

            <ul>
                {Object.entries(selectedRewards).map(([monthKey, points]) => (
                    <li key={monthKey}>
                        {monthKey}: {points} points
                    </li>
                ))}
            </ul>

            <h4 style={{ textAlign: 'center' }}>
                Total Points: {Object.values(selectedRewards).reduce((a, b) => a + b, 0)}
            </h4>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <label>Month:</label>
                <select
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    value={selectedMonth}
                    style={{ marginRight: '20px' }}
                >
                    <option value="">Select Month</option>
                    <option value="last3months">Last 3 Months</option>
                    {MONTHS.map((month) => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
                <label>Year:</label>
                <select
                    onChange={(e) => setSelectedYear(e.target.value)}
                    value={selectedYear}
                    disabled={selectedMonth === 'last3months'}
                >
                    <option value="">Select Year</option>
                    {YEARS.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            {(selectedMonth === 'last3months' || (selectedMonth && selectedYear)) && (
                <TransactionList
                    transactions={filteredTransactions}
                    month={selectedMonth === 'last3months' ? 'Last 3 Months' : selectedMonth}
                    year={selectedMonth === 'last3months' ? '' : selectedYear}
                />
            )}
        </>
    );
};

CustomerDetails.propTypes = {
    customerId: PropTypes.string.isRequired,
    transactions: PropTypes.arrayOf(
        PropTypes.shape({
            amount: PropTypes.number,
            date: PropTypes.string,
            transactions: PropTypes.string,
        })
    ).isRequired,
};

export default CustomerDetails;
