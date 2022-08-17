import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button, Chip, createTheme, Paper, Stack, styled, ThemeProvider } from '@mui/material';
import { ICV } from '../../../../interfaces';
import CVModal from '../Modal/CVModal';
import Delete from '../../../../img/Delete';
import { CVsActions } from '../../../../actionsTypes/CVsActionTypes';
import { useAppDispatch } from '../../../../redusers/useTypedSelector';
import Edit from '../../../../img/Edit';
import Download from '../../../../img/Download';
import DeleteModal from '../../../Items/DeleteModal';
import moment from 'moment';
import PdfIcon from '../../../../img/PdfIcon';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    borderRadius: '10px',
    padding: '20px',
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
    const dispatch = useAppDispatch();

    const time = moment(CV.createdAt).local().startOf('seconds').fromNow();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openDelModal, setOpenDelModal] = React.useState(false);
    const handleOpenDelModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        setdelId(event.currentTarget.id);
        setOpenDelModal(true);
    }
    const handleCloseDelModal = () => setOpenDelModal(false);
    const [delId, setdelId] = React.useState("");

    const downloadCV = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch({ type: CVsActions.DOWNLOAD_CV_REQUEST, payload: event.currentTarget.id });
    }

    let projectsNames: string[] = [];
    CV.projectCVList.map((projectCV) => projectsNames.push(projectCV.project!.name))
    const joinedProjectsNames = projectsNames.join(', ');

    return (
        <Box sx={{ p: '0px', m: '0px', position: 'relative' }}>
            <CVModal open={open} handleClose={handleClose} editableCV={CV} />
            <DeleteModal open={openDelModal} handleClose={handleCloseDelModal} id={delId} type={"CV"} />
            <ThemeProvider theme={lightTheme}>
                <Item elevation={4}
                    sx={{ width: '260px', height: '255px', mr: '6px' }}
                    key={CV.id}>
                    <Box sx={{ m: 0, p: 0 }} onClick={handleOpen}>
                        <PdfIcon />
                        <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '19.1px', color: '#535E6C', mb: '20px', mt: '30px' }}>{CV.cvName}</Typography>
                        <Typography sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '19.1px', color: '#535E6C', mb: '15px' }}>{CV.user!.firstName} {CV.user!.lastName}</Typography>
                        <Typography sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '19.1px', color: '#AFB5BF', mb: '20px' }}>{joinedProjectsNames}</Typography>
                    </Box>
                    <Stack direction="row" sx={{ mr: '30px', width: '100%', position: 'absolute', bottom: 20 }} key={CV.id}>
                        <Button variant='text' onClick={downloadCV} id={CV.id} sx={{ minWidth: '30px', mr: '15px' }}>
                            <Download />
                        </Button>
                        <Button variant='text' onClick={handleOpenDelModal} id={CV.id} sx={{ minWidth: '30px' }}>
                            <Delete />
                        </Button>
                        <Box sx={{ ml: '70px' }}>
                            <Typography sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '19px', color: '#D0D4DA', pt: '5px' }}>{time}</Typography>
                        </Box>
                    </Stack>
                </Item>
            </ThemeProvider>
        </Box>
    )
}
export default CVsItem
