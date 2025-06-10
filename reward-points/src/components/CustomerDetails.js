import React ,{useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {format,parseISO} from 'date-fns';
import TransactionList from './TransactionsList.js';
import { rewardsPoints } from '../utils/util.js';
import { MONTHS, YEARS } from '../constants/rewadsConstants.js';

const CustomerDetails = ({customerId,transactions}) => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('2025');
    const rewardsByMonth = {};
    transactions.forEach((txn)=> {
        const date = parseISO(txn.date);
        const monthKey = `${format(date,'yyyy-MM')}`;
        rewardsByMonth[monthKey] = (rewardsByMonth[monthKey] || 0) +rewardsPoints(txn.amount);
    });
    const months =Object.keys(rewardsByMonth);
    const filterdTransactions = transactions.filter((txn)=> {
        const date = parseISO(txn.date);
        const month = format(date,"MMMM");
        const year = format(date,'yyyy');
        return month === selectedMonth && year === selectedYear; 
    });
    const Title = styled.h2`
text-align:center;
color:#333;
margin-bottom:10px;
`;
    return (
        <div>
            <Title>Rewards Details for {customerId}</Title>
            <ul>
                {months.map((monthKey)=> {
                    <li key={monthKey}>
                        {monthKey}: {rewardsByMonth[monthKey]} points
                    </li>
                })}
            </ul>
            <h4 style={{textAlign:"center"}}>Total Points: {Object.values(rewardsByMonth).reduce((a,b)=>a+b,0)}</h4>
            <div style={{display:"flex", flexDirection:"row",justifyContent:"center", alignItems:"center"}}>
                <label>Month:</label>
                <select onChange={(e)=> setSelectedMonth(e.target.value)} value={selectedMonth} style={{marginRight:"20px"}}>
                    <option value="">Select Month</option>
                    {MONTHS.map((month)=> (
                        <option key={month} value={month}>{month}</option>
                    )
                    )}
                </select>
                 <label>Year:</label>
                <select onChange={(e)=> setSelectedYear(e.target.value)} value={selectedYear}>
                    <option value="">Select Year</option>
                    {YEARS.map((year)=> (
                        <option key={year} value={year}>{year}</option>
                    )
                    )}
                </select>
            </div>
            {selectedMonth && selectedYear && (
                <TransactionList
                    transactions={filterdTransactions}
                    month={selectedMonth}
                    year={selectedYear}
                />
            )}
        </div>
    );
};

CustomerDetails.propTypes = {
    customerId:PropTypes.string.isRequired,
    transactions:PropTypes.arrayOf(
        PropTypes.shape({
            amount:PropTypes.number,
            date:PropTypes.string,
            transactions:PropTypes.string,
        })
    ).isRequired,
};
export default CustomerDetails;