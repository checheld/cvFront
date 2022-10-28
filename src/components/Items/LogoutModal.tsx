import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Modal, styled, Typography } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";

interface ILogoutModal {
    open: boolean,
    handleClose: () => void,
}
const CustomBox = styled(Box)(() => ({
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFFFFF',
    borderRadius: '20px',
    width: '450px',
    ['@media (max-width:425px)']: {
        width: '370px'
    },
    ['@media (max-width:375px)']: {
        width: '300px'
    }
}))

const ILogoutModal: React.FC<ILogoutModal> = ({ open, handleClose }) => {

    const router = useNavigate();

    const handleClick = () => {
        router('/logout')
        sessionStorage.clear();
        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <CustomBox>
                <Box sx={{ m: '50px 30px 40px 30px' }}>
                    <Typography sx={{ fontSize: '20px', color: '#535E6C', fontWeight: 700, mb: '10px', fontFamily: `"Nunito", sans-serif` }}>
                        Logout from LeviCV?
                    </Typography>
                    <Typography sx={{ fontSize: '14px', color: '#AFB5BF', fontWeight: 400, mb: '30px', fontFamily: `"Nunito", sans-serif` }}>
                        All the unsaved data will be lost
                    </Typography>
                    <CloseIcon
                        sx={{
                            width: '30px',
                            position: 'absolute',
                            top: '25px',
                            right: '25px',
                            color: '#535E6C'
                        }}
                        onClick={handleClose}
                    />
                    <Box>
                        <Button variant="contained"
                            onClick={handleClick}
                            className='logoutModalButton logoutButton'
                        >
                            Logout
                        </Button>
                        <Button variant="contained"
                            onClick={handleClose}
                            className='logoutModalButton closeButton'
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </CustomBox>
        </Modal>
    )
}
export default ILogoutModal