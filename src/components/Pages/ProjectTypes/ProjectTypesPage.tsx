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

    const [isDisabled, setIsDisabled] = React.useState(false);
    React.useEffect(() => {
        setIsDisabled(false)
        arrayProjectType.map((n) => {
            !n && setIsDisabled(true)
        });
    }, [arrayProjectType]);

    const addProjectType = () => {
        const objArr = arrayProjectType.map(e => ({ 'Name': e }));
        dispatch({ type: projectTypesActions.ADD_PROJECTTYPE_REQUEST, payload: objArr });
        setArrayProjectType(['']);
        handleClose();
    }
    const handleAddProjectType = () =>
        setArrayProjectType([...arrayProjectType, projectType])
        ;

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
                                        <ModalInput placeholder="Project type name" item={projectType} setItem={handleChangeProjectTypes(index)} index={index} />
                                    </Box>
                                ))}
                                <Box sx={{ mb: '35px' }}>
                                    <CustomButton variant="outlined" children='+ Add Project type' onClick={handleAddProjectType} />
                                </Box>
                                <Box>
                                    <CustomButton variant="contained" onClick={addProjectType} children='Save Project type' disabled={isDisabled} />
                                </Box>
                            </Box>
                        </Box>
                    </Modal>
                    <Typography sx={{ fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#535E6C', mt: '35px', mb: '30px' }}>Project type ({projectTypes.length})</Typography>
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