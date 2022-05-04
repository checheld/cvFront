import React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button, Chip, createTheme, Paper, Stack, styled, ThemeProvider } from '@mui/material';
import { ICV } from '../../../../interfaces';
import CVModal from '../Modal/CVModal';
import Delete from '../../../../img/Delete';
import { CVsActions } from '../../../../actionsTypes/CVsActionTypes';
import { useAppDispatch } from '../../../../redusers/useTypedSelector';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    borderRadius: '10px',
    padding: '30px',
}));

const lightTheme = createTheme({
    palette: { mode: 'light' },
    components: {
        MuiButtonBase: {
            styleOverrides: {
                root: { backgroundColor: '#F1F3F5', height: '30px' },
            }
        },
    }
});

interface ICVsItem {
    CV: ICV
}

const CVsItem: React.FC<ICVsItem> = ({ CV }) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useAppDispatch();
    
    const delCV = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch( {type: CVsActions.DEL_CV_REQUEST, payload: event.currentTarget.id});
    }

    return (
        <Box sx={{ p: '0px', m: '0px'}}>
            <CVModal open={open} handleClose={handleClose}  editableCV={CV} /> 
            <ThemeProvider theme={lightTheme}>
            <Item elevation={4}
                sx={{ width: '335px', mr: '6px' }}
                key={CV.id}>
                <Box sx={{m: 0, p: 0}} onClick={handleOpen}>
                    <Typography sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '19.1px', color: '#535E6C', mb: '15px' }}>{CV.cvName}</Typography>
                    <Box sx={{p: 0, mb: '20px',ml: '0px',mr: '20px', mt: '0px'}}>
                        {CV.projectCVList.map((projectCV) => (
                            <Chip label={projectCV.project!.name} sx={{ mr: '10px', fontWeight: 400, fontSize: '14px', lineHeight: '21.7px', color: '#AFB5BF' }} />
                        ))}
                    </Box>
                </Box>
                <Stack spacing='15px' direction="row" sx={{ mr: '30px' }} key ={CV.id}>
                {/* <Button variant='text' key={CV.id}>
                    edit
                </Button> */}
                <Button variant='text' onClick={delCV} id={CV.id} sx={{minWidth: '30px'}}>
                    <Delete />
                </Button>
                </Stack>
            </Item>
            </ThemeProvider>
        </Box>
    )
}
export default CVsItem
