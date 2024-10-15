import { Box, Typography } from "@mui/material";
import BarGraph from "./barGraph";
import PieGraph from "./pieGraph"; 
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

const WeatherData = () => {
    const [temperatureData, setTemperatureData] = useState<number[]>([]);
    const [humidityData, setHumidityData] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState('');

    useEffect(() => {     
        fetchWeatherData();
    }, []);
    const fetchWeatherData = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=London&appid=eccf36ba90a3bf095cff2a40c10c1e12&units=metric`
            );

            const dailyTemp: number[] = [];
            const dailyHumidity: number[] = [];
            const dayLabels: string[] = [];

            const dailyDataMap: { [key: string]: { temp: number; humidity: number; count: number } } = {};

            response.data.list.forEach((entry: any) => {
                const date = new Date(entry.dt * 1000);
                const formattedDate = date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                });

                const temp = entry.main.temp;
                const humidity = entry.main.humidity;

                if (!dailyDataMap[formattedDate]) {
                    dailyDataMap[formattedDate] = { temp: 0, humidity: 0, count: 0 };
                    dayLabels.push(formattedDate);
                }

                dailyDataMap[formattedDate].temp += temp;
                dailyDataMap[formattedDate].humidity += humidity;
                dailyDataMap[formattedDate].count += 1;
            });

            for (const date in dailyDataMap) {
                const data = dailyDataMap[date];
                dailyTemp.push(data.temp / data.count);
                dailyHumidity.push(data.humidity / data.count);
            }

            setTemperatureData(dailyTemp);
            setHumidityData(dailyHumidity);
            setLabels(dayLabels);

        } catch (err) {
            console.log(err);
            setError('An uncaught error occurred');
        } finally {
            setLoading(false);
        }
    };
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const pieData = humidityData.map((value, index) => ({
        label: labels[index], 
        value: value,
        color: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#D10000', '#A700FF',][index % 6],
    }));

    return (
        <Box
            sx={{
                padding: 2, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                backgroundColor: '#03013559', display: 'flex', gap: 2,
                flexDirection: 'column', justifyContent: 'center',
                alignItems: 'center', width: { md: '20rem', xs: '30rem' },
                maxWidth: '100%',
            }}>
            <Typography sx={{
                color: 'white', mb: 1,
                fontWeight: 800, textAlign: 'left', width: '100%',
            }}>Weather Data</Typography>
            <BarGraph temperatureData={temperatureData} labels={labels} />
            <PieGraph data={pieData} />
        </Box>
    );
};

export default WeatherData;
