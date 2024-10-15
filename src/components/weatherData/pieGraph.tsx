import * as React from 'react';
import { DefaultizedPieValueType } from '@mui/x-charts/models';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Box } from '@mui/material';

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
      <PieChart
        series={[
          {
            outerRadius: 100,
            data,
            arcLabel: (params) => getArcLabel(params, data),
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fontSize: '0.9rem',
          },
        }}
        {...sizing}
      />
  );
};

export default PieGraph;
