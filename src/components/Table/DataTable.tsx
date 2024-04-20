import React from 'react';
import styled from 'styled-components';
import { DataTableProps } from '../../interface/DataTableProps';

const TableContainer = styled.div`
    width: 100%;
    height: 300px; /* Adjust the height as needed */
    overflow-x: auto;
    overflow-y: auto;
`;

const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2;
    }
`;

const TableCell = styled.td`
    border: 1px solid #dddddd;
    text-align: left;
    padding: 4px;
    font-size: 10px;
`;

const TableHeaderCell = styled.th`
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    font-size: 12px;
`;

const DataTable = ({ data = [] }: DataTableProps) => {
    if (!Array.isArray(data)) {
        return null;
    }

    // Extract column names from the first row
    const columns = data.length > 0 ? Object.keys(data[0]) : [];

    return (
        <TableContainer>
            <Table>
                <thead>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableHeaderCell key={index}>
                                {column}
                            </TableHeaderCell>
                        ))}
                    </TableRow>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {columns.map((column, columnIndex) => (
                                <TableCell key={columnIndex}>
                                    {row[column]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </TableContainer>
    );
};

export default DataTable;
