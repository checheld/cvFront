import React from 'react';
import moment from 'moment';
import { Box, Button, createTheme, Paper, Stack, styled, ThemeProvider, Typography } from '@mui/material';
import { CVsActions } from '../../../../actionsTypes/CVsActionTypes';
import { useAppDispatch } from '../../../../redusers/useTypedSelector';
import CVModal from '../Modal/CVModal';
import DeleteModal from '../../../Items/DeleteModal';
import Download from '../../../../img/Download';
import PdfIcon from '../../../../img/PdfIcon';
import Delete from '../../../../img/Delete';
import { ICV } from '../../../../interfaces';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    borderRadius: '10px',
    padding: '20px',
    height: '255px',
    width: '260px',
    cursor: 'pointer',
    mr: '6px',
    ['@media (max-width:375px)']: {
        width: '205px'
    }
}));

const CustomStack = styled(Stack)(() => ({
    marginRight: '30px',
    width: '250px',
    bottom: '20px',
    ['@media (max-width:375px)']: {
        width: '195px'
    }
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
                <Item elevation={4} key={CV.id}>
                    <Box sx={{ m: 0, p: 0 }} onClick={handleOpen}>
                        <PdfIcon />
                        <Typography className='cvCardText cvCardTitle'>{CV.cvName}</Typography>
                        <Typography className='cvCardText cvCardName'>{CV.user!.firstName} {CV.user!.lastName}</Typography>
                        <Typography className='cvCardText cvCardProject'>{joinedProjectsNames}</Typography>
                    </Box>
                    <CustomStack direction="row" key={CV.id}>
                        <Button variant='text' onClick={downloadCV} id={CV.id} sx={{ minWidth: '30px', mr: '15px' }}>
                            <Download />
                        </Button>
                        <Button variant='text' onClick={handleOpenDelModal} id={CV.id} sx={{ minWidth: '30px' }}>
                            <Delete />
                        </Button>
                        <Box sx={{ ml: 'auto' }}>
                            <Typography className='cvCardText cvCardTime'>{time}</Typography>
                        </Box>
                    </CustomStack>
                </Item>
            </ThemeProvider>
        </Box>
    )
}
export default CVsItem
