import { Box } from "@mui/material"
import LineGraph from "./lineGraph"
import PieGraph from "./pieGrah"

const WeatherData = () => {
    return (
        <Box>
            <LineGraph />
            <PieGraph />
        </Box>
    )
}

export default WeatherData