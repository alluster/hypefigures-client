import React, { useContext } from 'react';
import styled from 'styled-components';
import { DataTableProps } from '../../interface/DataTableProps';
import Spinner from '../Spinner/Spinner';
import { AppContext } from '../../context/Context';

const TableContainer = styled.div<DataTableProps>`
    width: 100%;
    height: 100%:
    overflow-x: auto;
    overflow-y: auto;
`;

const TableContent = styled.table`
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

const Table = ({ data = [] }: DataTableProps) => {
    if (!Array.isArray(data)) {
        return null;
    }
    const { loadingDataTables } = useContext(AppContext);
    // Extract column names from the first row
    const columns = data.length > 0 ? Object.keys(data[0]) : [];

    return (
        <div>
            {loadingDataTables ? (
                <Spinner />
            ) : (
                <TableContainer>
                    <TableContent>
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
                    </TableContent>
                </TableContainer>
            )}
        </div>
    );
};

export default Table;
