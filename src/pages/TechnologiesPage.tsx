import React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Chip, createTheme, Divider, Grid, Paper, Stack, styled, ThemeProvider, withStyles } from '@mui/material';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import CloseButton from '../components/CloseButton';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    borderRadius: '10px',
    // minHeight: '96px',
    padding: '25px'
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });

const TechnologiesPage: React.FC = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [searchParam, setSearchParam] = React.useState<string>('');

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
      };

    return (
        <Box sx={{ pl: '250px', pr: '35px' }}>
            <Typography sx={{ fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#535E6C', mt: '35px', mb: '30px' }}>Technologies (-)</Typography>
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
                        <Item elevation={4} sx={{width: '395px'}}>
                            <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#535E6C', mb: '15px' }}>Front-end</Typography>
                            <Stack sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                                <Chip label="bleletable" onDelete={handleDelete} onClick={handleClick} deleteIcon={<CloseButton />} style={{backgroundColor: '#F0F2F5', color: '#9EA9BA', borderRadius: '30px', marginRight: '10px', marginBottom: '10px', padding: '0px'}} />
                                <Chip label="Deletable" onDelete={handleDelete} onClick={handleClick} style={{backgroundColor: '#F0F2F5', color: '#9EA9BA', borderRadius: '30px', marginRight: '10px', marginBottom: '10px'}} />
                                <Chip label="Deletable" onDelete={handleDelete} onClick={handleClick} style={{backgroundColor: '#F0F2F5', color: '#9EA9BA', borderRadius: '30px', marginRight: '10px', marginBottom: '10px'}} />
                                <Chip label="Deletable" onDelete={handleDelete} onClick={handleClick} style={{backgroundColor: '#F0F2F5', color: '#9EA9BA', borderRadius: '30px', marginRight: '10px', marginBottom: '10px'}} />
                                <Chip label="Deletable" onDelete={handleDelete} onClick={handleClick} style={{backgroundColor: '#F0F2F5', color: '#9EA9BA', borderRadius: '30px', marginRight: '10px', marginBottom: '10px'}} />
                                <Chip label="Deletable" onDelete={handleDelete} onClick={handleClick} style={{backgroundColor: '#F0F2F5', color: '#9EA9BA', borderRadius: '30px', marginRight: '10px', marginBottom: '10px'}} />
                            </Stack>
                        </Item>
                        <Item elevation={4} sx={{width: '395px'}}>
                            <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#535E6C', mb: '15px' }}>Back-end</Typography>
                        </Item>
                        <Item elevation={4} sx={{width: '395px'}}>
                            <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#535E6C', mb: '15px' }}>Databases</Typography>
                        </Item>
                        <Item elevation={4} sx={{width: '395px'}}>
                            <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#535E6C', mb: '15px' }}>Hosting</Typography>
                        </Item>
                        <Item elevation={4} sx={{width: '395px'}}>
                            <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#535E6C', mb: '15px' }}>Other</Typography>
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
                        <Item elevation={4}>
                            <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#535E6C', mb: '15px' }}>Soft skills</Typography>
                            <Stack sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                                <Chip label="bleletable" onDelete={handleDelete} onClick={handleClick} deleteIcon={<CloseButton />} style={{backgroundColor: '#F0F2F5', color: '#9EA9BA', borderRadius: '30px', marginRight: '10px', marginBottom: '10px', padding: '0px'}} />
                                <Chip label="Deletable" onDelete={handleDelete} onClick={handleClick} style={{backgroundColor: '#F0F2F5', color: '#9EA9BA', borderRadius: '30px', marginRight: '10px', marginBottom: '10px'}} />
                                <Chip label="Deletable" onDelete={handleDelete} onClick={handleClick} style={{backgroundColor: '#F0F2F5', color: '#9EA9BA', borderRadius: '30px', marginRight: '10px', marginBottom: '10px'}} />
                                <Chip label="Deletable" onDelete={handleDelete} onClick={handleClick} style={{backgroundColor: '#F0F2F5', color: '#9EA9BA', borderRadius: '30px', marginRight: '10px', marginBottom: '10px'}} />
                                <Chip label="Deletable" onDelete={handleDelete} onClick={handleClick} style={{backgroundColor: '#F0F2F5', color: '#9EA9BA', borderRadius: '30px', marginRight: '10px', marginBottom: '10px'}} />
                                <Chip label="Deletable" onDelete={handleDelete} onClick={handleClick} style={{backgroundColor: '#F0F2F5', color: '#9EA9BA', borderRadius: '30px', marginRight: '10px', marginBottom: '10px'}} />
                            </Stack>
                        </Item>
                    </Box>
                </ThemeProvider>
            </Box>
        </Box>
    )
}
export default TechnologiesPage