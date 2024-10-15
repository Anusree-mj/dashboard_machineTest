import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import Divider from '@mui/material/Divider';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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

    const downloadPdf = async () => {
        // Capture the table content
        console.log('function callded')
        const pdf = new jsPDF();
        const table = document.getElementById('users-table'); // Assuming your table has this ID

        if (table) {
            const canvas = await html2canvas(table);
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 190; // Image width for PDF
            const pageHeight = pdf.internal.pageSize.height;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const heightLeft = imgHeight;

            let position = 10;

            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            position += heightLeft;

            pdf.save('users-list.pdf');
        }
    };

    return (
        <Box
            sx={{
                padding: 2,
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                backgroundColor: '#03013559', display: 'flex',
                flexDirection: 'column', width: {md:'100%',sm:'100%',lg:'40rem'}, maxWidth: '100%',
            }}>
            <Box sx={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                maxWidth: '100%', mb: 1
            }}>
                <Typography sx={{
                    color: 'white', fontWeight: 800,
                }}>Users List</Typography>
                <PictureAsPdfOutlinedIcon sx={{
                    color: 'white', fontSize: '2rem',
                    cursor: 'pointer'
                }} onClick={downloadPdf} />
            </Box>
            <Divider sx={{ mb: 1, backgroundColor: 'white' }} />
            <TableContainer sx={{ maxHeight: 440, border: '1px solid white' }}>
                <Table stickyHeader aria-label="sticky table" id="users-table">
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
                                            backgroundColor: index % 2 === 0 ? '#1a1a2e' : '#1a1a2e47',
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
