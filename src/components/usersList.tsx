import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box,Typography } from '@mui/material';
import axios from 'axios';

interface Column {
    id: 'name' | 'email' | 'website' | 'company';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 80 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'website', label: 'Website', minWidth: 120 },
    { id: 'company', label: 'Company Name', minWidth: 150 },
];

interface UserProps {
    name: string;
    email: string;
    website: string;
    company: {
        name: string;
    };
}

interface RowData {
    name: string;
    email: string;
    website: string;
    company: string;
}

const UsersList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState<RowData[]>([]);

    useEffect(() => {
        getUsersList();
    }, []);

    const getUsersList = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            const data = response.data;
            const formattedData: RowData[] = data.map((user: UserProps) => ({
                name: user.name,
                email: user.email,
                website: user.website,
                company: user.company.name,
            }));
            console.log('userdataa:', formattedData);
            setRows(formattedData);
        } catch (err) {
            console.log('Error Occurred', err);
        }
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Box
            sx={{
                padding: 2,
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                backgroundColor: '#03013559',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '50rem',
                maxWidth: '100%',
            }}
        >
            <Typography sx={{color:'white',mb:1,
                fontWeight:800,textAlign:'left',width:'100%',
            }}>Users List</Typography>
            <TableContainer sx={{ maxHeight: 440, border: '1px solid white' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}
                                        sx={{
                                            backgroundColor: index % 2 === 0 ? '#1a1a2e' : '#0f3460',
                                        }}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}
                                                    sx={{ color: 'white', letterSpacing: '0.1rem' }}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ color: 'white' }}
            />
        </Box>
    );
};

export default UsersList;
