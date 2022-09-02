import React, { useEffect, useState } from 'react';
import EducationTable from './Items/EducationTable';
import Input from '../../Items/Input';
import CustomButton from '../../Items/CustomButton';
import { universitiesActions } from '../../../actionsTypes/universitiesActionTypes';
import { useAppDispatch, useTypedSelector } from '../../../redusers/useTypedSelector';
import { Box, Typography } from '@mui/material';
import PreviewPageTable from '../../Items/PreviewPages/PreviewPageTable';
import NoResult from '../../Items/Search/NoResult';
import AddModal from '../../Items/AddModal';
import { IUniversity } from '../../../interfaces';

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

    const screenWidth = window.screen.width;
    const [winWidthPadding, setWinWidthPadding] = useState<string>();
    const [inputSearchWidth, setInputSearchWidth] = useState<number>();
    const [widthButton, setWidthButton] = useState<string>();

    useEffect(() => {
        if (screenWidth < 769 && screenWidth > 425) {
            setWinWidthPadding('35px')
            setInputSearchWidth(300)
        } else if (screenWidth < 426) {
            setWinWidthPadding('35px')
            setInputSearchWidth(355)
            setWidthButton('355px')
        } else {
            setWidthButton('auto')
            setInputSearchWidth(300)
            setWinWidthPadding('250px')
        }
    }, [screenWidth]);

    return (
        <>
            {!load ? (
                <Box sx={{ pl: winWidthPadding, pr: '35px' }}>
                    <AddModal open={open} handleClose={handleClose} action={universitiesActions.ADD_UNIVERSITY_REQUEST} addName={'University'} />
                    <Box sx={{ m: 0, display: 'flex' }}>
                        <Typography sx={{ fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#535E6C', mt: '35px', mb: '30px' }}>Education </Typography>
                        <Typography sx={{ fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#D0D4DA', mt: '35px', mb: '30px', ml: '5px' }}>({universities.length})</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <Input setParam={setSearchParam} placeholder={"Search university"} width={inputSearchWidth!} />
                        <Box sx={{ marginLeft: 'auto', mb: '20px' }}>
                            <CustomButton variant="contained" onClick={(handleOpen)} children='+ Add University' width={widthButton} />
                        </Box>
                    </Box>
                    {universities.length === 0 ? (
                        <NoResult />
                    ) : (
                        <EducationTable universities={universities} />
                    )}
                </Box>
            ) : (
                <PreviewPageTable />
            )}
        </>
    )
}
export default EducationPage