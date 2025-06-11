import styled from "styled-components";
import PropTypes from 'prop-types';
import { rewardsPoints } from '../utils/util';
import { transactionListHeaders } from "../constants/rewadsConstants";
const TransactionList = ({transactions,month,year}) => {
    const Title = styled.h2`
text-align:center;
color:#333;
margin-bottom:10px;
`;
const Table = styled.table`
width:100%;
border-collapse:collapse;
margin-top:20px;
`;
const Th = styled.th`
padding:12px;
background:#1976d2;
color:#fff;
text-align:center;
border:1px solid #ddd;
`;
const Td = styled.td`
border-bottom : 1px solid #eee;
padding:10px;
text-align:center;
`;
    if(transactions.length === 0) {
        return <Title>No transactions for {month} {year}</Title >

    }
    return (
        <>
            <Title>Transactions for {month} {year}</Title>
            <Table>
                <thead>
                    <tr>
                        {transactionListHeaders && transactionListHeaders.map((item)=>(
                            <Th>{item}</Th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((txn)=> (
                        <tr key={txn.transactionId}>
                            <Td>{txn.transactionId}</Td>
                            <Td>{txn.amount}</Td>
                            <Td>{txn.date}</Td>
                            <Td>{rewardsPoints(txn.amount)}</Td>
                        </tr>
                    ))}
                </tbody>
           </Table>
        </>
    );
};

TransactionList.propTypes = {
    transactions:PropTypes.arrayOf(
        PropTypes.shape({
            transactionId:PropTypes.string,
            amount:PropTypes.number,
            date:PropTypes.string,
        })
    ).isRequired,
    month:PropTypes.string.isRequired,
    year:PropTypes.string.isRequired,
};

export default TransactionList;