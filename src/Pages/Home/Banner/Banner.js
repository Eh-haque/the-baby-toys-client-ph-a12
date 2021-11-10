import React from 'react';
import banner from '../../../media/banner/little-boy-playing-with-construction-equipment-white (1).jpg'
import Box from '@mui/material/Box';


const Banner = () => {
    return (
        <Box>
            <img style={{ width: '100%', maxHeight: '100vh'}} src={banner} alt="" />
        </Box>
    );
};

export default Banner;