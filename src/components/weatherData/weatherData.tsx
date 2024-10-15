import { Box } from "@mui/material"
import LineGraph from "./lineGraph"
import PieGraph from "./pieGrah"

const WeatherData = () => {
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
            width: {md:'20rem',xs:'30rem'},
            maxWidth: '100%',
           
        }}
    >
            <LineGraph />
            <PieGraph />
        </Box>
    )
}

export default WeatherData