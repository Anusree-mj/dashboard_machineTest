import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart'; 
import { Box } from '@mui/material';

interface BarGraphProps {
  temperatureData: number[];
  labels: string[];
}

const BarGraph: React.FC<BarGraphProps> = ({ temperatureData, labels }) => {
  return (
    <Box sx={{
      display: 'flex', flexDirection: 'center',
      alignItems: 'center', maxWidth: '100%',
      border: '1px solid green', background: 'white'
    }}>
      <BarChart
        width={350} 
        height={300}
        series={[{
          data: temperatureData,
          label: 'Temperature (°C)',
        }]}
        xAxis={[{ scaleType: 'band', data: labels }]} 
        yAxis={[{ label: 'Temperature (°C)' }]} 
        layout="vertical" 
        sx={{
          transform: 'scale(1.1)', 
          transformOrigin: 'top left', 
        }}
      />
    </Box>
  );
};

export default BarGraph;
