import React from 'react'
import { Box } from '@mui/material'
import Header from '../components/header';
import UsersList from '../components/usersList';
import WeatherData from '../components/weatherData/weatherData';

const Dashboard = () => {
    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center'
        }}>
            <Header />
            <Box sx={{
                display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2,justifyContent:'space-between',
                maxWidth: '95%', ml: { xs: 'none', md: '15rem' }, mt: 10,
            }}>
                <UsersList />
                <WeatherData />
            </Box>
        </Box>
    )
}

export default Dashboard