import React, { useEffect, useState } from 'react';
import WorkExpTable from './Items/WorkExpTable';
import Input from '../../Items/Input';
import CustomButton from '../../Items/CustomButton';
import { useAppDispatch, useTypedSelector } from '../../../redusers/useTypedSelector';
import { Box, Typography } from '@mui/material';
import { companiesActions } from '../../../actionsTypes/companiesActionTypes';
import PreviewPageTable from '../../Items/PreviewPages/PreviewPageTable';
import NoResult from '../../Items/Search/NoResult';
import AddModal from '../../Items/AddModal';

const WorkExperiencePage: React.FC = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useAppDispatch();
    const [searchParam, setSearchParam] = useState<string>('');
    const companies = useTypedSelector((state) => state.companies.companies);
    const load = useTypedSelector((state) => state.companies.isLoading.getAll);
    const result = useTypedSelector((state) => state.companies.result);

    useEffect(() => {
        dispatch({ type: companiesActions.GET_COMPANIES_REQUEST });
    }, [result, dispatch]);

    useEffect(() => {
        const listener = (event: { code: string; preventDefault: () => void; }) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault();
                if (searchParam === '') {
                    dispatch({ type: companiesActions.GET_COMPANIES_REQUEST });
                } else {
                    dispatch({ type: companiesActions.SEARCH_COMPANIES_REQUEST, payload: searchParam });
                }
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [searchParam]);

    return (
        <>
            {!load ? (
                <Box sx={{ pl: '250px', pr: '35px' }}>
                    <AddModal open={open} handleClose={handleClose} action={companiesActions.ADD_COMPANY_REQUEST} addName={'Company'} />
                    <Box sx={{ m: 0, display: 'flex' }}>
                        <Typography sx={{ fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#535E6C', mt: '35px', mb: '30px' }}>Work experience </Typography>
                        <Typography sx={{ fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#D0D4DA', mt: '35px', mb: '30px', ml: '5px' }}>({companies.length})</Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Input setParam={setSearchParam} placeholder={"Search company"} width={300} />
                        <Box sx={{ marginLeft: 'auto' }}>
                            <CustomButton variant="contained" onClick={(handleOpen)} children='+ Add Company' />
                        </Box>
                    </Box>
                    {companies.length === 0 ? (
                        <NoResult />
                    ) : (
                        <WorkExpTable searchParam={searchParam} />
                    )}
                </Box>
            ) : (
                <PreviewPageTable />
            )}
        </>
    )
}
export default WorkExperiencePage