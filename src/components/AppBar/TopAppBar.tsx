import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';
import { useLocation } from 'react-router-dom';

export default function ButtonAppBar() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState()

    const recordButtonPosition = (event: any) => {
        setAnchorEl(event.currentTarget);
        setMenuOpen(true);
    }

    let closeMenu = () => {
        setMenuOpen(false);
    }

    const handleClick = () => {
        sessionStorage.clear();
    };

    //let token = sessionStorage.getItem('oidc.user:https://identity-server-1.herokuapp.com:leviossacv');
    let token = sessionStorage.getItem('oidc.user:https://localhost:5001:leviossacv');
    const location = useLocation();
    const currentPath = location.pathname;

    useEffect(() => {
        //token = sessionStorage.getItem('oidc.user:https://identity-server-1.herokuapp.com:leviossacv');
        token = sessionStorage.getItem('oidc.user:https://localhost:5001:leviossacv');
    }, [currentPath, token]);

    return (
        <Box>
            {token && <AppBar position="static" sx={{ margin: 0, backgroundColor: '#303439', }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={recordButtonPosition}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={menuOpen}
                        onClose={closeMenu}
                    >
                        <a href='/CVs' style={{ color: '#303439' }} >
                            <MenuItem onClick={closeMenu} sx={{ bgcolor: '#ECF2FC', fontWeight: '600' }}>CVs</MenuItem>
                        </a>
                        <a href='/Users' style={{ color: '#303439' }}>
                            <MenuItem onClick={closeMenu} data-testid='appBarMenuUsers' sx={{ bgcolor: '#ECF2FC', fontWeight: '600' }}>Users</MenuItem>
                        </a>
                        <a href='/Projects' style={{ color: '#303439' }}>
                            <MenuItem onClick={closeMenu} sx={{ bgcolor: '#ECF2FC', fontWeight: '600' }}>Projects</MenuItem>
                        </a>
                        <a href='/Education' style={{ color: '#303439' }}>
                            <MenuItem onClick={closeMenu} sx={{ bgcolor: '#ECF2FC', fontWeight: '600' }}>Education</MenuItem>
                        </a>
                        <a href='/Technologies' style={{ color: '#303439' }}>
                            <MenuItem onClick={closeMenu} sx={{ bgcolor: '#ECF2FC', fontWeight: '600' }}>Technologies</MenuItem>
                        </a>
                        <a href='/WorkExperience' style={{ color: '#303439' }}>
                            <MenuItem onClick={closeMenu} sx={{ bgcolor: '#ECF2FC', fontWeight: '600' }}>Work Experience</MenuItem>
                        </a>
                        <a href='/ProjectType' style={{ color: '#303439' }}>
                            <MenuItem onClick={closeMenu} sx={{ bgcolor: '#ECF2FC', fontWeight: '600' }}>Project type</MenuItem>
                        </a>
                        <a href='/logout' style={{ color: '#303439' }}>
                            <MenuItem onClick={handleClick} sx={{ bgcolor: '#ECF2FC', fontWeight: '600' }}>Logout</MenuItem>
                        </a>
                    </Menu>
                    <img width='70px' src={require('../../img/LeviCV.svg').default} alt="logo" style={{ marginLeft: 'auto', marginRight: '20px' }} />
                </Toolbar>
            </AppBar>
            }
        </Box>
    );
}