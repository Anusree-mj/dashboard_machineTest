import * as React from 'react';
import { DefaultizedPieValueType } from '@mui/x-charts/models';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Box, Typography } from '@mui/material';

interface PieData {
  label: string;
  value: number;
  color: string;
}

interface PieGraphProps {
  data: PieData[];
}

const sizing = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  legend: { hidden: true },
};

// for displaying arc labels, rounding the data and adding humidity measurements.
const getArcLabel = (params: DefaultizedPieValueType, data: PieData[]) => {
  const item = data[params.index];
  return `${Math.round(item.value)} %`;
};

const PieGraph: React.FC<PieGraphProps> = ({ data }) => {
  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', width: { lg: '100%', md: '20rem',xs:'20rem' }, maxWidth: '100%',
      justifyContent: 'center', alignItems: 'center', mt: 1, background: 'white',
    }}>
      <Typography sx={{
        width: '100%', textAlign: 'center', mt: 1,
        fontSize: '0.9rem', fontWeight: 400
      }}>Humidity %</Typography>
      <PieChart
        series={[
          {
            outerRadius: 100,
            data,
            arcLabel: (params) => getArcLabel(params, data),
          },
        ]}
        sx={{
          mt: 1, pb: 1,
          [`& .${pieArcLabelClasses.root}`]: {
            fontSize: '0.9rem',
          },
        }}
        {...sizing}
      />
    </Box>
  );
};

export default PieGraph;
