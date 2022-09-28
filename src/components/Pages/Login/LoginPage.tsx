import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import styled from '@emotion/styled';
import CustomButtonFixed from '../../Items/CustomButtonFixed';
import { useAppDispatch } from '../../../redusers/useTypedSelector';
import { FormHelperText } from '@mui/material';
import { loginActions } from '../../../actionsTypes/loginActionTypes';

interface SettingsMenuProps {
    item: string;
}

const CustomBox = styled(Box)(() => ({
    position: 'absolute',
    top: '40%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    '& > :not(style)': { m: 1 },
    display: 'flex',
    flexWrap: 'wrap',
    width: '240px',
    ['@media (max-width:768px)']: {
        paddingLeft: '35px',
    }
}))

const LoginPage: React.FC = () => {

    const dispatch = useAppDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogIn = () => {
        dispatch({ type: loginActions.LOGIN_REQUEST, payload: { 'email': email, 'password': password } });
        setEmail('');
        setPassword('');
    }

    const handleChangeEmail = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = ev;
        setEmail(value);
    };

    const handleChangePassword = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = ev;
        setPassword(value);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword,);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const [check, setCheck] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsError(false);
        (email === '' || password === '') && setIsError(true)
    }, [email, password]);

    function MyFormHelperText({ item }: SettingsMenuProps) {
        const { focused } = useFormControl() || {};

        const helperText: string = React.useMemo(() => {
            if (!item && check) {
                return 'Empty field';
            }
            return '';
        }, [focused]);

        return <FormHelperText sx={{ color: 'red' }}>{helperText}</FormHelperText>;
    }

    return (
        <CustomBox>
            <FormControl sx={{ mb: '30px', width: '25ch' }} variant="filled">
                <InputLabel htmlFor="filled-adornment-password">Email</InputLabel>
                <FilledInput
                    id="filled-adornment-email"
                    value={email}
                    onChange={handleChangeEmail}
                    error={!email && check}
                />
                <MyFormHelperText item={email} />
            </FormControl>
            <FormControl sx={{ mb: '30px', width: '25ch' }} variant="filled">
                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                <FilledInput
                    id="filled-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handleChangePassword}
                    error={!password && check}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <MyFormHelperText item={password} />
            </FormControl>
            <Box sx={{ ml: 'auto', mr: 'auto' }}>
                <CustomButtonFixed variant="contained"
                    children='log in'
                    onClick={() => {
                        if (isError) setCheck(true);
                        else (handleLogIn())
                    }}
                />
            </Box>
        </CustomBox>
    );
}
export default LoginPage