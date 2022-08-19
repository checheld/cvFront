import { Box, Modal, Typography } from '@mui/material';
import React from 'react';
import { CVsActions } from '../../actionsTypes/CVsActionTypes';
import { usersActions } from '../../actionsTypes/usersActionTypes';
import { useAppDispatch } from '../../redusers/useTypedSelector';
import CustomButton from './CustomButton';
import { useNavigate } from 'react-router-dom';
import { projectsActions } from '../../actionsTypes/projectsActionTypes';
import { universitiesActions } from '../../actionsTypes/universitiesActionTypes';
import { technologiesActions } from '../../actionsTypes/technologiesActionTypes';
import { companiesActions } from '../../actionsTypes/companiesActionTypes';
import { projectTypesActions } from '../../actionsTypes/projectTypesActionTypes';
import CloseIcon from "@mui/icons-material/Close";

interface IProjectModal {
    open: boolean,
    handleClose: () => void,
    id: string | number,
    type: string
}
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#FFFFFF',
    borderRadius: '30px',
    boxShadow: 24,
    p: 4,
    width: '450px',
    height: '209px'
};

const ProjectModal: React.FC<IProjectModal> = ({ open, handleClose, id, type }) => {

    const dispatch = useAppDispatch();
    const router = useNavigate();

    const deleteItem = () => {
        if (type === "CV") {
            dispatch({ type: CVsActions.DEL_CV_REQUEST, payload: id });
            handleClose();
        }
        else if (type === "user") {
            dispatch({ type: usersActions.DEL_USER_REQUEST, payload: id });
            router(`/users`)
            handleClose();
        }
        else if (type === "project") {
            dispatch({ type: projectsActions.DEL_PROJECT_REQUEST, payload: id });
            router(`/projects`)
            handleClose();
        }
        else if (type === "university") {
            dispatch({ type: universitiesActions.DEL_UNIVERSITY_REQUEST, payload: id });
            handleClose();
        }
        else if (type === "technology") {
            dispatch({ type: technologiesActions.DEL_TECHNOLOGY_REQUEST, payload: id });
            handleClose();
        }
        else if (type === "company") {
            dispatch({ type: companiesActions.DEL_COMPANY_REQUEST, payload: id });
            handleClose();
        }
        else if (type === "projectType") {
            dispatch({ type: projectTypesActions.DEL_PROJECTTYPE_REQUEST, payload: id });
            handleClose();
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box sx={{ m: '30px' }}>
                    <Typography sx={{ fontSize: '20px', color: '#535E6C', fontWeight: 700, mb: '20px' }}>
                        Delete {type}?
                    </Typography>
                    <Typography sx={{ fontSize: '14px', color: '#AFB5BF', fontWeight: 400, mb: '30px' }}>
                        When you delete this {type}, you cannot be undone.
                    </Typography>
                    <CloseIcon
                        style={{
                            width: `30px`,
                            position: `absolute`,
                            top: 30,
                            right: 30,
                            color: '#535E6C'
                        }}
                        onClick={handleClose}
                    />
                    <Box>
                        <CustomButton variant="contained" onClick={deleteItem} children='Delete' />
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}
export default ProjectModal