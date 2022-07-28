import React, { useEffect, useState } from 'react';
import EducationTable from './Items/EducationTable';
import Input from '../../Items/Input';
import CustomButton from '../../Items/CustomButton';
import ModalInput from '../../Items/ModalInput';
import DelInput from '../../../img/DelInput'
import { universitiesActions } from '../../../actionsTypes/universitiesActionTypes';
import { useAppDispatch, useTypedSelector } from '../../../redusers/useTypedSelector';
import { Box, Modal, Typography } from '@mui/material';
import PreviewPageTable from '../../Items/PreviewPages/PreviewPageTable';
import NoResult from '../../Items/Search/NoResult';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#FFFFFF',
    borderRadius: '30px',
    boxShadow: 24,
    p: 4,
};

const EducationPage: React.FC = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useAppDispatch();
    const [arrayUniversity, setArrayUniversity] = useState([""])
    const [university, setUniversity] = React.useState('');
    const [searchParam, setSearchParam] = React.useState<string>('');
    const universities = useTypedSelector((state) => state.universities.universities);
    const load = useTypedSelector((state) => state.universities.isLoading.getAll);
    const result = useTypedSelector((state) => state.projects.result);

    useEffect(() => {
        dispatch({ type: universitiesActions.GET_UNIVERSITIES_REQUEST });
    }, [result, dispatch]);

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

    const handleChangeUniverscity =
        (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
            const editedArr = [...arrayUniversity];
            editedArr[index as number] = event.target.value;
            setArrayUniversity(editedArr);
        };

    const removeUniversity = (index: number): void => {
        setArrayUniversity([...arrayUniversity.slice(0, index), ...arrayUniversity.slice(index + 1)]);
    };

    const addUniversity = () => {
        const clearArrayUniversities = arrayUniversity.filter(el => el != "")
        const objArr = clearArrayUniversities.map(e => ({ 'Name': e }));
        dispatch({ type: universitiesActions.ADD_UNIVERSITY_REQUEST, payload: objArr });
        setArrayUniversity(['']);
        handleClose();
    }
    const handleAddUnivercity = () => setArrayUniversity([...arrayUniversity, university]);

    const [check, setCheck] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    React.useEffect(() => {
        setIsError(false);
        !arrayUniversity[0] && setIsError(true);
    }, [arrayUniversity]);

    return (
        <>
            {!load ? (
                <Box sx={{ pl: '250px', pr: '35px' }}>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Box sx={{ m: '50px' }}>
                                <Typography sx={{ fontSize: '24px', color: '#535E6C', fontWeight: 800, mb: '40px' }}>
                                    Add University
                                </Typography>
                                <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                    University
                                </Typography>
                                {arrayUniversity.length && arrayUniversity.map((university, index) => (
                                    <Box key={index}>
                                        {index > 0 && (
                                            <Box sx={{ position: `relative`, left: `-35px`, top: `40px` }}>
                                                <DelInput index={index} removeItem={removeUniversity} />
                                            </Box>
                                        )}
                                        <ModalInput placeholder="University" item={university} setItem={handleChangeUniverscity(index)} index={index} check={check} width={700} />
                                    </Box>
                                ))}
                                <Box sx={{ mb: '35px' }}>
                                    <CustomButton variant="outlined" children='+ Add University' onClick={handleAddUnivercity} />
                                </Box>
                                <Box>
                                    <CustomButton variant="contained"
                                        children='Save University'
                                        onClick={() => {
                                            if (isError) setCheck(true);
                                            else (addUniversity())
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Modal>
                    <Typography sx={{ fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#535E6C', mt: '35px', mb: '30px' }}>Education ({universities.length})</Typography>
                    <Box sx={{ display: 'flex' }}>
                        <Input setParam={setSearchParam} placeholder={"Search university"} />
                        <Box sx={{ marginLeft: 'auto' }}>
                            <CustomButton variant="contained" onClick={(handleOpen)} children='+ Add University' />
                        </Box>
                    </Box>
                    {universities.length === 0 ? (
                        <NoResult />
                    ) : (
                        <EducationTable />
                    )}
                </Box>
            ) : (
                <PreviewPageTable />
            )}
        </>
    )
}
export default EducationPage