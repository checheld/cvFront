import React, { useEffect, useState } from 'react';
import EducationTable from './Items/EducationTable';
import Input from '../../Items/Input';
import CustomButton from '../../Items/CustomButton';
import { universitiesActions } from '../../../actionsTypes/universitiesActionTypes';
import { useAppDispatch, useTypedSelector } from '../../../redusers/useTypedSelector';
import { Box, styled, Typography } from '@mui/material';
import PreviewPageTable from '../../Items/PreviewPages/PreviewPageTable';
import NoResult from '../../Items/Search/NoResult';
import AddModal from '../../Items/AddModal';
import { IUniversity } from '../../../interfaces';
import '../../Components.css';

const CustomBox = styled(Box)(() => ({
    paddingRight: '35px',
    paddingLeft: '250px',
    marginBottom: '30px',
    ['@media (max-width:768px)']: {
        paddingLeft: '35px',
    }
}))

const EducationPage: React.FC = () => {

    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const Allniversities = useTypedSelector((state) => state.universities.universities);
    const load = useTypedSelector((state) => state.universities.isLoading.getAll);
    const isAdded = useTypedSelector((state) => state.universities.isLoading.add);
    const del = useTypedSelector((state) => state.universities.isLoading.delete);
    const edit = useTypedSelector((state) => state.universities.isLoading.edit);
    const search = useTypedSelector((state) => state.universities.isLoading.search);

    const [searchParam, setSearchParam] = useState<string>('');
    const [universities, setUniversities] = useState<IUniversity[]>([]);

    useEffect(() => {
        dispatch({ type: universitiesActions.GET_UNIVERSITIES_REQUEST });
    }, [dispatch]);

    useEffect(() => {
        setUniversities(Allniversities)
    }, [load, isAdded, del, edit, search]);

    useEffect(() => {
        const listener = (event: { code: string; preventDefault: () => void; }) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault();
                if (searchParam === '') {
                    dispatch({ type: universitiesActions.GET_UNIVERSITIES_REQUEST });
                } else {
                    dispatch({ type: universitiesActions.SEARCH_UNIVERSITIES_REQUEST, payload: searchParam });
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
                <CustomBox >
                    <AddModal open={open} handleClose={handleClose} action={universitiesActions.ADD_UNIVERSITY_REQUEST} addName={'University'} />
                    <Box className='pageTitleContainer'>
                        <Typography className='pageTitle pageName'>Education </Typography>
                        <Typography className='pageTitle pageNameCount'>({universities.length})</Typography>
                    </Box>
                    <Box className='searchContainer'>
                        <Input setParam={setSearchParam} placeholder={"Search university"} />
                        <Box className='addButtonContainer'>
                            <CustomButton variant="contained" onClick={(handleOpen)} children='+ Add University' />
                        </Box>
                    </Box>
                    {universities.length === 0 ? (
                        <NoResult />
                    ) : (
                        <EducationTable universities={universities} />
                    )}
                </CustomBox>
            ) : (
                <PreviewPageTable />
            )}
        </>
    )
}
export default EducationPage