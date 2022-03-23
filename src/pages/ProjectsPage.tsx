import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import { Box, Typography } from '@mui/material';
import ProjectsTable from '../components/ProjectsTable';
import ProjectsTypeSelect from '../components/ProjectsTypeSelect';
import ProjectsTechSelect from '../components/ProjectsTechSelect';

const ProjectsPage: React.FC = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [ searchParam, setSearchParam ] = React.useState<string>('');
   
    return (
        <Box sx={{ pl: '250px', pr: '35px'}}>
            <Typography sx={{fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#535E6C', mt: '35px', mb:'30px'}}>Projects (0)</Typography>
            <Box sx={{display: 'flex'}}>              
                    <Input setParam={setSearchParam} placeholder={"Search project"}/>
                    <ProjectsTypeSelect />
                    <ProjectsTechSelect />
                <Box sx={{marginLeft:'auto'}}>
                    <CustomButton variant="contained" onClick={(handleOpen)} children = '+ Add Project' />
                </Box>
            </Box>
            <ProjectsTable />
        </Box>
    )
}
export default ProjectsPage