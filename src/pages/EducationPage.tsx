import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import EducationTable from '../components/EducationTable';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import Box from '@mui/material/Box';
import { RootStateOrAny, useSelector } from 'react-redux';

const EducationPage: React.FC = () => {

    const [ searchParam, setSearchParam ] = React.useState<string>('');

    const universities = useSelector((state:RootStateOrAny) => state.universities.universities);
    return (
        <Box sx={{ pl: '250px', pr: '35px'}}>
            <Typography sx={{fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#535E6C', mt: '35px', mb:'30px'}}>Education ({universities.length})</Typography>
            <Box sx={{display: 'flex'}}>
                <Input setParam={setSearchParam} />
                <Box sx={{marginLeft:'auto'}}>
                    <CustomButton variant="contained" children = '+ Add University' />
                </Box>
            </Box>
            <EducationTable searchParam={searchParam}/>
        </Box>
    )
}
export default EducationPage