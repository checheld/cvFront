import React, { useEffect } from 'react';
import moment from 'moment';
import { Box, Button, CircularProgress, createTheme, Paper, Stack, styled, ThemeProvider, Typography } from '@mui/material';
import { CVsActions } from '../../../../actionsTypes/CVsActionTypes';
import { useAppDispatch, useTypedSelector } from '../../../../redusers/useTypedSelector';
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
    ['@media (max-width:376px)']: {
        width: '205px'
    }
}));

const CustomStack = styled(Stack)(() => ({
    marginRight: '30px',
    width: '250px',
    bottom: '20px',
    ['@media (max-width:376px)']: {
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
    const load = useTypedSelector((state) => state.CVs.isLoading.download);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openDelModal, setOpenDelModal] = React.useState(false);
    const handleOpenDelModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        setdelId(Number(event.currentTarget.id));
        setOpenDelModal(true);
    }
    const handleCloseDelModal = () => setOpenDelModal(false);
    const [delId, setdelId] = React.useState(0);
    const [downloadId, setDownloadId] = React.useState<number>(0);
    const [bgColor, setBgColor] = React.useState("none");

    const downloadCV = (event: React.MouseEvent<HTMLButtonElement>) => {
        setDownloadId(Number(event.currentTarget.id))
        dispatch({ type: CVsActions.DOWNLOAD_CV_REQUEST, payload: event.currentTarget.id });
    }

    useEffect(() => {
        load ? ((downloadId == CV.id) && setBgColor('rgba(116, 167, 255, 0.2)')) : setBgColor('none');
        !load && setDownloadId(0);
      }, [load]);

    let projectsNames: string[] = [];
    CV.projectCVList.map((projectCV) => projectsNames.push(projectCV.project!.name))
    const joinedProjectsNames = projectsNames.join(', ');

    return (
        <Box sx={{ p: '0px', m: '0px', position: 'relative'}}>
            {load && (downloadId == CV.id) &&
                <Box sx={{position: 'absolute', top: '40%', left: '45%'}}>
                    <CircularProgress />
                </Box>
            }
            <CVModal open={open} handleClose={handleClose} editableCV={CV} />
            <DeleteModal open={openDelModal} handleClose={handleCloseDelModal} id={delId} type={"CV"} />
            <ThemeProvider theme={lightTheme}>
                <Item elevation={4} key={CV.id} sx={{ backgroundColor: bgColor }}>
                    <Box sx={{ m: 0, p: 0 }} onClick={handleOpen}>
                        <PdfIcon />
                        <Typography className='cvCardText cvCardTitle'>{CV.cvName}</Typography>
                        <Typography className='cvCardText cvCardName'>{CV.user!.firstName} {CV.user!.lastName}</Typography>
                        <Typography className='cvCardText cvCardProject'>{joinedProjectsNames}</Typography>
                    </Box>
                    <CustomStack direction="row" key={CV.id}>
                        <Button variant='text' onClick={downloadCV} id={String(CV.id)} sx={{ minWidth: '30px', mr: '15px' }}>
                            <Download />
                        </Button>
                        <Button variant='text' onClick={handleOpenDelModal} id={String(CV.id)} sx={{ minWidth: '30px' }}>
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
