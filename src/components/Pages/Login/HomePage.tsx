import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { makeUserManager } from 'react-oidc';
import CustomButton from '../../Items/CustomButton';
import '../../Components.css';
import jwt from 'jwt-decode';

const CustomBox = styled(Box)(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}))

const IDENTITY_CONFIG = {
    authority: "https://localhost:5001",
    //authority: "https://identity-server-1.herokuapp.com",
    client_id: "leviossacv",
    redirect_uri: "http://localhost:3000/signin-oidc",
    silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/silent_renew.html`,
    post_logout_redirect_uri: "http://localhost:3000",
    // redirect_uri: "https://levicvfrontapp.herokuapp.com/signin-oidc",
    // post_logout_redirect_uri: "https://levicvfrontapp.herokuapp.com",
    // silent_redirect_uri: "https://levicvfrontapp.herokuapp.com/silent_renew",
    response_type: "code",
    scope: "scope2",
    client_secret: "99HlRwEKPV4a2+3v5oohMg==",
    automaticSilentRenew: true,
    filterProtocolClaims: true,
    loadUserInfo: true
};

function HomePage() {
    const [state, setState] = useState(null);

    const mgr = makeUserManager(IDENTITY_CONFIG);
    useEffect(() => {
        mgr.getUser().then((user) => {
            if (user) {
                var jwtDecode = jwt(user.access_token);

                // @ts-ignore
                if (jwtDecode.role === "Admin" || jwtDecode.role === "Manager") {

                    fetch("http://localhost:3000/CVs", {
                    //fetch("https://levicvfrontapp.herokuapp.com/CVs", {

                        headers: {
                            Authorization: "Bearer " + user.access_token,
                        },
                    })
                        //.then((resp) => resp.json())
                        // @ts-ignore
                        .then((data) => setState({ user, data }));
                }
            }
        });
    }, []);

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
                Welcome to Levi<span style={{ color: '#5893F9' }}>CV</span>!
            </Typography>
            <div className='logoutButtonContainer'>
                <CustomButton variant="contained" onClick={() => mgr.signinRedirect()} children='Login' />
            </div>
            <div style={{ width: `230px`, height: `230px`, marginTop: '50px', marginLeft: '10px' }}>
                <img
                    style={{ width: `100%`, height: `100%` }}
                    src={`PictureForResult/cat4.gif`}
                    alt="Cats"
                />
            </div>
        </CustomBox>
    );
}
export default HomePage