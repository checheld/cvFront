import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../Items/CustomButton';
import '../../Components.css';

const CustomBox = styled(Box)(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}))

function LogoutPage() {

    const router = useNavigate();

    const handleClick = () => {
        router(`/login`)
    };

    return (
        <CustomBox>
            <Typography sx={{
                fontWeight: 800,
                fontSize: '35px',
                lineHeight: '33px',
                color: '#535E6C',
                mt: '35px', mb: '30px',
                textAlign: 'center',
            }}>
                You left Levi<span style={{ color: '#5893F9' }}>CV</span> page
            </Typography>
            <div className='logoutButtonContainer'>
                <CustomButton variant="contained" onClick={handleClick} children='Return to site' />
            </div>
            <div style={{ width: `230px`, height: `230px`, marginTop: '50px', marginLeft: '50px' }}>
                <img
                    style={{ width: `100%`, height: `100%` }}
                    src={`PictureForResult/cat2.gif`}
                    alt="Cats"
                />
            </div>
        </CustomBox>
    );
}
export default LogoutPage