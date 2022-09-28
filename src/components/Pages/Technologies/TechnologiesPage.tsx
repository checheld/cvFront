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
    padding: '25px',
    width: '260px',
    ['@media (max-width:425px)']: {
        width: '355px',
    }
}));

const CustomBox = styled(Box)(() => ({
    paddingRight: '35px',
    paddingLeft: '250px',
    ['@media (max-width:768px)']: {
        paddingLeft: '35px',
    }
}))

const lightTheme = createTheme({ palette: { mode: 'light' } });

const TechnologiesPage: React.FC = () => {

    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let AllTechnologies = useTypedSelector((state) => state.technologies.technologies);
    const load = useTypedSelector((state) => state.technologies.isLoading.getAll);
    const isAdded = useTypedSelector((state) => state.technologies.isLoading.add);
    const del = useTypedSelector((state) => state.technologies.isLoading.delete);
    const edit = useTypedSelector((state) => state.technologies.isLoading.edit);
    const search = useTypedSelector((state) => state.technologies.isLoading.search);

    const [technologies, setTechnologies] = useState<ITechnology[]>([]);
    const [editableTech, setEditableTech] = useState<ITechnology>();
    const [searchParam, setSearchParam] = useState<string>('');

    useEffect(() => {
        dispatch({ type: technologiesActions.GET_TECHNOLOGIES_REQUEST });
    }, [dispatch]);

    useEffect(() => {
        setTechnologies(AllTechnologies)
    }, [load, isAdded, del, edit.valueOf, search]);

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

    let frontEndTech = technologies.filter((tech) => tech.type === 'front-end');
    let backEndTech = technologies.filter((tech) => tech.type === 'back-end');
    let databasesTech = technologies.filter((tech) => tech.type === 'databases');
    let hostingTech = technologies.filter((tech) => tech.type === 'hosting');
    let otherTech = technologies.filter((tech) => tech.type === 'other');
    let softSkillsTech = technologies.filter((tech) => tech.type === 'soft skills');
    let allLength = frontEndTech.length + backEndTech.length + databasesTech.length + hostingTech.length + otherTech.length + softSkillsTech.length;

    return (
        <>
            {!load ? (
                <CustomBox>
                    <TechModal open={open} handleClose={handleClose} editableTech={editableTech} />
                    <Box sx={{ m: 0, display: 'flex' }}>
                        <Typography sx={{ fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#535E6C', mt: '35px', mb: '30px' }}>Technologies </Typography>
                        <Typography sx={{ fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#D0D4DA', mt: '35px', mb: '30px', ml: '5px' }}> ({allLength})</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <Input setParam={setSearchParam} placeholder={"Search technology"} />
                        <Box sx={{ marginLeft: 'auto', mb: '20px' }}>
                            <CustomButton variant="contained" onClick={(handleOpen)} children='+ Add Technology' />
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
                                    <Item elevation={4}>
                                        <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#535E6C', mb: '15px' }}>Front-end</Typography>
                                        <ChipItem techCollection={frontEndTech} handleEdit={handleEdit} />
                                    </Item>
                                    <Item elevation={4}>
                                        <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#535E6C', mb: '15px' }}>Back-end</Typography>
                                        <ChipItem techCollection={backEndTech} handleEdit={handleEdit} />
                                    </Item>
                                    <Item elevation={4}>
                                        <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#535E6C', mb: '15px' }}>Databases</Typography>
                                        <ChipItem techCollection={databasesTech} handleEdit={handleEdit} />
                                    </Item>
                                    <Item elevation={4}>
                                        <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#535E6C', mb: '15px' }}>Hosting</Typography>
                                        <ChipItem techCollection={hostingTech} handleEdit={handleEdit} />
                                    </Item>
                                    <Item elevation={4}>
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
                </CustomBox>
            ) : (
                <PreviewPageTable />
            )}
        </>
    )
}
export default TechnologiesPage