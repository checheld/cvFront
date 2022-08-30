import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, createTheme, Divider, Paper, styled, ThemeProvider } from '@mui/material';
import Input from '../../Items/Input';
import CustomButton from '../../Items/CustomButton';
import { useAppDispatch, useTypedSelector } from '../../../redusers/useTypedSelector';
import { technologiesActions } from '../../../actionsTypes/technologiesActionTypes';
import ChipItem from './Items/ChipItem'
import TechModal from './Modal/TechModal';
import PreviewPageTable from '../../Items/PreviewPages/PreviewPageTable';
import NoResult from '../../Items/Search/NoResult';
import { ITechnology } from '../../../interfaces';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    borderRadius: '10px',
    padding: '25px'
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });

const TechnologiesPage: React.FC = () => {

    const [open, setOpen] = useState(false);
    const [editableTech, setEditableTech] = useState<ITechnology>();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [searchParam, setSearchParam] = useState<string>('');

    const dispatch = useAppDispatch();
    let technologies = useTypedSelector((state) => state.technologies.technologies);
    const result = useTypedSelector((state) => state.technologies.result);
    const load = useTypedSelector((state) => state.technologies.isLoading.getAll);
    const search = useTypedSelector((state) => state.technologies.isLoading.search);

    const handleEdit = (tech: ITechnology) => {
        setEditableTech(tech);
        handleOpen();
    };

    useEffect(() => {
        const listener = (event: { code: string; preventDefault: () => void; }) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault();
                if (searchParam === '') {
                    dispatch({ type: technologiesActions.GET_TECHNOLOGIES_REQUEST });
                } else {
                    dispatch({ type: technologiesActions.SEARCH_TECHNOLOGIES_REQUEST, payload: searchParam });
                }
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [searchParam]);

    useEffect(() => {
        dispatch({ type: technologiesActions.GET_TECHNOLOGIES_REQUEST });
    }, [result, dispatch]);

    let frontEndTech = technologies.filter((tech) => tech.type === 'front-end');
    let backEndTech = technologies.filter((tech) => tech.type === 'back-end');
    let databasesTech = technologies.filter((tech) => tech.type === 'databases');
    let hostingTech = technologies.filter((tech) => tech.type === 'hosting');
    let otherTech = technologies.filter((tech) => tech.type === 'other');
    let softSkillsTech = technologies.filter((tech) => tech.type === 'soft skills');
    let allLength = frontEndTech.length + backEndTech.length + databasesTech.length + hostingTech.length + otherTech.length + softSkillsTech.length;

    const screenWidth = window.screen.width;
    const [winWidthPadding, setWinWidthPadding] = useState<string>();
    const [inputSearchWidth, setInputSearchWidth] = useState<number>();
    const [widthButton, setWidthButton] = useState<string>();
    const [widthPaper, setWidthPaper] = useState<number>();

    useEffect(() => {
        if (screenWidth < 769 && screenWidth > 425) {
            setWinWidthPadding('35px')
            setInputSearchWidth(300)
        } else if (screenWidth < 426) {
            setWinWidthPadding('35px')
            setInputSearchWidth(355)
            setWidthButton('355px')
            setWidthPaper(355)
        } else {
            setWidthButton('auto')
            setInputSearchWidth(300)
            setWinWidthPadding('250px')
            setWidthPaper(260)
        }
    }, [screenWidth]);

    return (
        <>
            {!load ? (
                <Box sx={{ pl: winWidthPadding, pr: '35px' }}>
                    <TechModal open={open} handleClose={handleClose} editableTech={editableTech} />
                    <Box sx={{ m: 0, display: 'flex' }}>
                        <Typography sx={{ fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#535E6C', mt: '35px', mb: '30px' }}>Technologies </Typography>
                        <Typography sx={{ fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#D0D4DA', mt: '35px', mb: '30px', ml: '5px' }}> ({allLength})</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <Input setParam={setSearchParam} placeholder={"Search technology"} width={inputSearchWidth!} />
                        <Box sx={{ marginLeft: 'auto', mb: '20px' }}>
                            <CustomButton variant="contained" onClick={(handleOpen)} children='+ Add Technology' width={widthButton} />
                        </Box>
                    </Box>
                    {technologies.length === 0 ? (
                        <NoResult />
                    ) : (
                        <Box>
                            <ThemeProvider theme={lightTheme}>
                                <Box
                                    sx={{
                                        p: 2,
                                        bgcolor: '#FBFBFB',
                                        display: 'flex',
                                        gridTemplateColumns: { md: '1fr 1fr' },
                                        gap: 2,
                                        padding: '0px',
                                        flexWrap: 'wrap'
                                    }}
                                >
                                    <Item elevation={4} sx={{ width: widthPaper }}>
                                        <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#535E6C', mb: '15px' }}>Front-end</Typography>
                                        <ChipItem techCollection={frontEndTech} handleEdit={handleEdit} />
                                    </Item>
                                    <Item elevation={4} sx={{ width: widthPaper }}>
                                        <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#535E6C', mb: '15px' }}>Back-end</Typography>
                                        <ChipItem techCollection={backEndTech} handleEdit={handleEdit} />
                                    </Item>
                                    <Item elevation={4} sx={{ width: widthPaper }}>
                                        <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#535E6C', mb: '15px' }}>Databases</Typography>
                                        <ChipItem techCollection={databasesTech} handleEdit={handleEdit} />
                                    </Item>
                                    <Item elevation={4} sx={{ width: widthPaper }}>
                                        <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#535E6C', mb: '15px' }}>Hosting</Typography>
                                        <ChipItem techCollection={hostingTech} handleEdit={handleEdit} />
                                    </Item>
                                    <Item elevation={4} sx={{ width: widthPaper }}>
                                        <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#535E6C', mb: '15px' }}>Other</Typography>
                                        <ChipItem techCollection={otherTech} handleEdit={handleEdit} />
                                    </Item>
                                </Box>
                                <Divider variant="inset" sx={{ mt: '35px', ml: '0px', mr: '15px', mb: '35px' }} />
                                <Box
                                    sx={{
                                        p: 2,
                                        bgcolor: '#FBFBFB',
                                        display: 'flex',
                                        gridTemplateColumns: { md: '1fr 1fr' },
                                        gap: 2,
                                        padding: '0px'
                                    }}
                                >
                                    <Item elevation={4} sx={{ width: '600px' }}>
                                        <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#535E6C', mb: '15px' }}>Soft skills</Typography>
                                        <ChipItem techCollection={softSkillsTech} handleEdit={handleEdit} />
                                    </Item>
                                </Box>
                            </ThemeProvider>
                        </Box>
                    )}
                </Box>
            ) : (
                <PreviewPageTable />
            )}
        </>
    )
}
export default TechnologiesPage