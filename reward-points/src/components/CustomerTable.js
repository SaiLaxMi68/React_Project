import React , {useState} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import Pagination from './Pagination';
import { rewardsPoints } from '../utils/util';
import {customerTableHeaders,customerTitle} from "../constants/rewadsConstants";
import CustomerDetails from './CustomerDetails';
const TableWrapper = styled.div`
margin:20px;
padding:20px;
border-radius:10px;
background-color:#ffffff;
box-shadow:0 4px 8px rgba(0,0,0,0.1);
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
const Title = styled.h2`
text-align:center;
color:#333;
margin-bottom:10px;
`;
const ITEMS_PER_PAGE = 5;
const CustomerTable = ({data})=> {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const customers = [...new Set(data.map((d)=>d.customerId))];
    const pageCount = (customers.length/ITEMS_PER_PAGE);
    const displayCustomers = customers.slice(currentPage*ITEMS_PER_PAGE,(currentPage+1)*ITEMS_PER_PAGE);
    const handlePageClick = (selected)=>setCurrentPage(selected.selected);
    
const getTransactionsByCustomer = (customerId) => {
  return data.filter((t) => t.customerId === customerId);
};

    return (
        <TableWrapper>
            <Title>{customerTitle}</Title>
            <Table>
                <thead>
                    <tr>
                       {customerTableHeaders &&customerTableHeaders.map((headerName)=>(
                        <Th>{headerName}</Th>
                       ))}
                    </tr>
                </thead>
                <tbody>
                    {displayCustomers.map((customerId)=> {
                        const customerTXNS = data.filter((t)=>t.customerId === customerId);
                        const totalPoints = customerTXNS.reduce((sum,t)=>sum+rewardsPoints(t.amount),0);
                        return (
                            <tr key={customerId} onClick={()=> setSelectedCustomer(customerId)}>
                                <Td>{customerId}</Td>
                                <Td>{customerTXNS.length}</Td>
                                <Td>{totalPoints}</Td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <Pagination currentPage={currentPage} totalPages={pageCount} onPageChange={setCurrentPage} />
            {selectedCustomer && (
                <CustomerDetails customerId={selectedCustomer} transactions={getTransactionsByCustomer(selectedCustomer)} />
            )}
        </TableWrapper>
    );
};

CustomerTable.propsTypes = {
    data:PropTypes.arrayOf(
        PropTypes.shape({
            customerId:PropTypes.string,
            tensactionId:PropTypes.string,
            amount:PropTypes.number,
            date:PropTypes.string
        })
    ).isRequired,
};

export default CustomerTable;