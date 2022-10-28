import React, { ChangeEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Paper, styled, Typography } from '@mui/material';
import Photo from '../Items/Photo';
import { IUser } from '../../../../interfaces';
import '../../../Components.css';

interface Iprops {
    user: IUser,
    handleOpen: () => void
}

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    borderRadius: '10px',
    padding: '30px',
    width: '335px',
    mr: '6px',
    cursor: 'pointer',
    ['@media (min-width:780px)']: { width: '304px' },
}));

const UserCard: React.FC<Iprops> = ({ user, handleOpen }) => {

    const router = useNavigate();

    return (
        <Item elevation={4} onClick={() => router(`/users/${user.id}`)}>
            <Box className='photoContainer'>
                {(user.photoParams !== null) ? (
                    <Photo params={{
                        scale: user.photoParams.scale,
                        position: { x: user.photoParams.positionX, y: user.photoParams.positionY }
                    }}
                        photo={user.photoUrl} />
                ) : (
                    <Photo />
                )}
            </Box>
            <Typography className='userCardTitle'>
                {user.firstName} {user.lastName}
            </Typography>
            <Typography className='userCardDescription'>
                {user.description}
            </Typography>
            <Button variant="contained"
                onClick={handleOpen}
                className='moreButton'
            >
                More
            </Button>
        </Item>
    );
}

export default UserCard