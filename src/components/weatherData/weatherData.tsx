import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import BarGraph from "./barGraph";
import PieGraph from "./pieGraph";
import Divider from '@mui/material/Divider';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
                `https://api.openweathermap.org/data/2.5/forecast?q=London&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
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

    const handleDownloadPdf = async () => {
        const pdf = new jsPDF();

        pdf.setFontSize(16);
        pdf.text("Weather Data Report (London)", 10, 10);

        const headers = ["Date", "Average Temperature (°C)", "Average Humidity (%)"];
        const data = labels.map((label, index) => [
            label,
            temperatureData[index]?.toFixed(2), 
            humidityData[index]?.toFixed(2) 
        ]);

        autoTable(pdf, {
            head: [headers],
            body: data,
            startY: 20,
            theme: 'grid', 
            styles: {
                cellPadding: 5,
                fontSize: 10,
                overflow: 'linebreak',
            },
        });

        pdf.save("weather_data_report.pdf");
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
                backgroundColor: '#03013559', display: 'flex',
                flexDirection: 'column', justifyContent: 'center',
                alignItems: 'center', width: { sm: '100%', lg: '20rem', },
                maxWidth: '100%',
            }}>
            <Box sx={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                maxWidth: '100%', width: '100%', mb: 1
            }}>
                <Typography sx={{
                    color: 'white', fontWeight: 800,
                }}>{`Weather Data (London)`}</Typography>
                <PictureAsPdfOutlinedIcon
                    onClick={handleDownloadPdf}
                    sx={{
                        color: 'white', fontSize: '2rem',
                        cursor: 'pointer'
                    }}
                />
            </Box>
            <Divider sx={{ backgroundColor: 'white', width: '100%' }} />
            <Box sx={{
                display: 'flex', flexWrap: 'wrap', width: '100%',
                justifyContent: 'space-around', alignItems: 'center',
            }}>
                <BarGraph temperatureData={temperatureData} labels={labels} />
                <PieGraph data={pieData} />
            </Box>
        </Box>
    );
};

export default WeatherData;
