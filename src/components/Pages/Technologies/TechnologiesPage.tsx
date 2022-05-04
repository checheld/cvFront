import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Box, createTheme, Divider, Paper, styled, ThemeProvider } from '@mui/material';
import Input from '../../Items/Input';
import CustomButton from '../../Items/CustomButton';
import { useAppDispatch, useTypedSelector } from '../../../redusers/useTypedSelector';
import { technologiesActions } from '../../../actionsTypes/technologiesActionTypes';
import ChipItem from './Items/ChipItem'
import TechModal from './Modal/TechModal';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    borderRadius: '10px',
    padding: '25px'
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });

const TechnologiesPage: React.FC = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [searchParam, setSearchParam] = React.useState<string>('');

    const dispatch = useAppDispatch();
    let technologies = useTypedSelector((state) => state.technologies.technologies);
    const result = useTypedSelector((state) => state.technologies.result);

    useEffect(() => {
        const listener = (event: { code: string; preventDefault: () => void; }) => {
          if (event.code === "Enter" || event.code === "NumpadEnter") {
            event.preventDefault();
            if (searchParam === '') {
                dispatch({ type: technologiesActions.GET_TECHNOLOGIES_REQUEST });
            } else {
                dispatch( {type: technologiesActions.SEARCH_TECHNOLOGIES_REQUEST, payload: searchParam});
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

    return (
        <Box sx={{ pl: '250px', pr: '35px' }}>
            <TechModal open={open} handleClose={handleClose}/>
            <Typography sx={{ fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#535E6C', mt: '35px', mb: '30px' }}>Technologies ({allLength})</Typography>
            <Box sx={{ display: 'flex' }}>
                <Input setParam={setSearchParam} placeholder={"Search technology"} />
                <Box sx={{ marginLeft: 'auto' }}>
                    <CustomButton variant="contained" onClick={(handleOpen)} children='+ Add Technology' />
                </Box>
            </Box>
            <Box>
                <ThemeProvider theme={lightTheme}>
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
                        <Item elevation={4} sx={{ width: '395px' }}>
                            <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#535E6C', mb: '15px' }}>Front-end</Typography>
                            <ChipItem techCollection={frontEndTech}/>
                        </Item>
                        <Item elevation={4} sx={{width: '395px'}}>
                            <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#535E6C', mb: '15px' }}>Back-end</Typography>
                            <ChipItem techCollection={backEndTech}/>
                        </Item>
                        <Item elevation={4} sx={{width: '395px'}}>
                            <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#535E6C', mb: '15px' }}>Databases</Typography>
                            <ChipItem techCollection={databasesTech}/>
                        </Item>
                        <Item elevation={4} sx={{width: '395px'}}>
                            <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#535E6C', mb: '15px' }}>Hosting</Typography>
                            <ChipItem techCollection={hostingTech}/>
                        </Item>
                        <Item elevation={4} sx={{width: '395px'}}>
                            <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#535E6C', mb: '15px' }}>Other</Typography>
                            <ChipItem techCollection={otherTech}/>
                        </Item>
                    </Box>
                    <Divider variant="inset" sx={{mt: '35px', ml: '0px', mr: '15px', mb: '35px'}}/>
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
                        <Item elevation={4} sx={{width: '600px'}}>
                            <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#535E6C', mb: '15px' }}>Soft skills</Typography>
                            <ChipItem techCollection={softSkillsTech}/>
                        </Item>
                    </Box>
                </ThemeProvider>
            </Box>
        </Box>
    )
}
export default TechnologiesPage