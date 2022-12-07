import React, { useEffect, useState } from 'react';
import { useAppDispatch, useTypedSelector } from '../../../redusers/useTypedSelector';
import { Box, styled, Typography } from '@mui/material';
import { companiesActions } from '../../../actionsTypes/companiesActionTypes';
import PreviewPageTable from '../../Items/PreviewPages/PreviewPageTable';
import NoResult from '../../Items/Search/NoResult';
import WorkExpTable from './Items/WorkExpTable';
import Input from '../../Items/Input';
import CustomButton from '../../Items/CustomButton';
import AddModal from '../../Items/AddModal';
import { ICompany } from '../../../interfaces';
import '../../Components.css';

const CustomBox = styled(Box)(() => ({
    paddingRight: '35px',
    paddingLeft: '250px',
    marginBottom: '30px',
    ['@media (max-width:768px)']: {
        paddingLeft: '35px',
    }
}))

const WorkExperiencePage: React.FC = () => {

    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const AllCompanies = useTypedSelector((state) => state.companies.companies);
    const load = useTypedSelector((state) => state.companies.isLoading.getAll);
    const isAdded = useTypedSelector((state) => state.companies.isLoading.add);
    const del = useTypedSelector((state) => state.companies.isLoading.delete);
    const edit = useTypedSelector((state) => state.companies.isLoading.edit);
    const search = useTypedSelector((state) => state.companies.isLoading.search);

    const [searchParam, setSearchParam] = useState<string>('');
    const [companies, setCmpanies] = useState<ICompany[]>([]);

    useEffect(() => {
        dispatch({ type: companiesActions.GET_COMPANIES_REQUEST });
    }, [dispatch]);

    useEffect(() => {
        setCmpanies(AllCompanies)
    }, [load, isAdded, del, edit, search]);

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
                <CustomBox>
                    <AddModal open={open} handleClose={handleClose} action={companiesActions.ADD_COMPANY_REQUEST} addName={'Company'} />
                    <Box className='pageTitleContainer'>
                        <Typography className='pageTitle pageName'>Work experience </Typography>
                        <Typography className='pageTitle pageNameCount'>({companies.length})</Typography>
                    </Box>
                    <Box className='searchContainer'>
                        <Input setParam={setSearchParam} placeholder={"Search company"} />
                        <Box className='addButtonContainer'>
                            <CustomButton variant="contained" onClick={(handleOpen)} children='+ Add Company' />
                        </Box>
                    </Box>
                    {companies.length === 0 ? (
                        <NoResult />
                    ) : (
                        <WorkExpTable companies={companies} />
                    )}
                </CustomBox>
            ) : (
                <PreviewPageTable />
            )}
        </>
    )
}
export default WorkExperiencePage

