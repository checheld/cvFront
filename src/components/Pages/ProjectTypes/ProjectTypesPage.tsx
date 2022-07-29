import React, { useEffect, useState } from 'react';
import Input from '../../Items/Input';
import CustomButton from '../../Items/CustomButton';
import ModalInput from '../../Items/ModalInput';
import DelInput from '../../../img/DelInput'
import { useAppDispatch, useTypedSelector } from '../../../redusers/useTypedSelector';
import { Box, Modal, Typography } from '@mui/material';
import PreviewPageTable from '../../Items/PreviewPages/PreviewPageTable';
import NoResult from '../../Items/Search/NoResult';
import { projectTypesActions } from '../../../actionsTypes/projectTypesActionTypes';
import ProjectTypesTable from './Items/ProjectTypesTable';

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
    const [arrayProjectType, setArrayProjectType] = useState([""])
    const [projectType, setProjectType] = React.useState('');
    const [searchParam, setSearchParam] = React.useState<string>('');
    const projectTypes = useTypedSelector((state) => state.projectTypes.projectTypes);
    const load = useTypedSelector((state) => state.projectTypes.isLoading.getAll);
    const result = useTypedSelector((state) => state.projectTypes.result);

    useEffect(() => {
        dispatch({ type: projectTypesActions.GET_PROJECTTYPES_REQUEST });
    }, [result, dispatch]);

    useEffect(() => {
        const listener = (event: { code: string; preventDefault: () => void; }) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault();
                if (searchParam === '') {
                    dispatch({ type: projectTypesActions.GET_PROJECTTYPES_REQUEST });
                } else {
                    dispatch({ type: projectTypesActions.SEARCH_PROJECTTYPES_REQUEST, payload: searchParam });
                }
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [searchParam]);

    const handleChangeProjectTypes =
        (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
            const editedArr = [...arrayProjectType];
            editedArr[index as number] = event.target.value;
            setArrayProjectType(editedArr);
        };

    const removeProjectType = (index: number): void => {
        setArrayProjectType([...arrayProjectType.slice(0, index), ...arrayProjectType.slice(index + 1)]);
    };

    const addProjectType = () => {
        const clearArrayProjectTypes = arrayProjectType.filter(el => el != "")
        const objArr = clearArrayProjectTypes.map(e => ({ 'Name': e }));
        dispatch({ type: projectTypesActions.ADD_PROJECTTYPE_REQUEST, payload: objArr });
        setArrayProjectType(['']);
        handleClose();
    }
    const handleAddProjectType = () => setArrayProjectType([...arrayProjectType, projectType]);

    const [check, setCheck] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    React.useEffect(() => {
        setIsError(false);
        !arrayProjectType[0] && setIsError(true);
    }, [arrayProjectType]);

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
                                    Add Project type
                                </Typography>
                                <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                    Project type
                                </Typography>
                                {arrayProjectType.length && arrayProjectType.map((projectType, index) => (
                                    <Box key={index}>
                                        {index > 0 && (
                                            <Box sx={{ position: `relative`, left: `-35px`, top: `40px` }}>
                                                <DelInput index={index} removeItem={removeProjectType} />
                                            </Box>
                                        )}
                                        <ModalInput placeholder="Project type name" item={projectType} setItem={handleChangeProjectTypes(index)} index={index} check={check} width={700} />
                                    </Box>
                                ))}
                                <Box sx={{ mb: '35px' }}>
                                    <CustomButton variant="outlined" children='+ Add Project type' onClick={handleAddProjectType} />
                                </Box>
                                <Box>
                                    <CustomButton variant="contained"
                                        children='Save Project type'
                                        onClick={() => {
                                            if (isError) setCheck(true);
                                            else (addProjectType())
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Modal>
                    <Box sx={{ m: 0, display: 'flex' }}>
                        <Typography sx={{ fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#535E6C', mt: '35px', mb: '30px' }}>Project type </Typography>
                        <Typography sx={{ fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#D0D4DA', mt: '35px', mb: '30px', ml: '5px' }}>({projectTypes.length})</Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Input setParam={setSearchParam} placeholder={"Search project type"} />
                        <Box sx={{ marginLeft: 'auto' }}>
                            <CustomButton variant="contained" onClick={(handleOpen)} children='+ Add Project type' />
                        </Box>
                    </Box>
                    {projectTypes.length === 0 ? (
                        <NoResult />
                    ) : (
                        <ProjectTypesTable />
                    )}
                </Box>
            ) : (
                <PreviewPageTable />
            )}
        </>
    )
}
export default EducationPage