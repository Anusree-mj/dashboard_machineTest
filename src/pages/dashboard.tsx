import React from 'react'
import { Box } from '@mui/material'
import Header from '../components/header';
import UsersList from '../components/usersList';
import WeatherData from '../components/weatherData/weatherData';

const Dashboard = () => {
    return (
        <Box>
            <Header />
            <Box sx={{
                display: 'flex', flexWrap: 'wrap', gap: 2,
                justifyContent: 'center',
                ml: { xs: 'none', sm: '15rem' }, mt: 9
            }}>
                <UsersList />
                <WeatherData />
            </Box>
        </Box>
    )
}

export default Dashboard