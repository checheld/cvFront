import React, { useState } from 'react';
import WorkExpTable from '../components/WorkExpTable';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import ModalInput from '../components/ModalInput';
import DelInput from '../img/DelInput'
import { useAppDispatch, useTypedSelector } from '../redusers/useTypedSelector';
import { Box, Modal, Typography } from '@mui/material';
import { companiesActions } from '../actionsTypes/companiesActionTypes';

interface IAddModal {
    open: boolean,
    handleClose: () => void,
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
};

const AddModal: React.FC<IAddModal> = ({open, handleClose}) => {

    const [arrayCompanies, setarrayCompanies] = useState([""])
    const [company, setCompany] = React.useState('');

    const [isDisabled, setIsDisabled] = React.useState(false);
    React.useEffect(() => {
        setIsDisabled(false)
        arrayCompanies.map((n) => {
            !n && setIsDisabled(true)
        });
    }, [arrayCompanies]);
    
    const dispatch = useAppDispatch();
    const addCompany = () => {
        const objArr= arrayCompanies.map(e => ({'Name': e}));
        dispatch( {type: companiesActions.ADD_COMPANY_REQUEST, payload: objArr});
        setarrayCompanies(['']);
        handleClose();
    }
    const handleAddCompany = () =>
        setarrayCompanies([...arrayCompanies, company])
        ;
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box sx={{ m: '50px' }}>
                    <Typography sx={{ fontSize: '24px', color: '#535E6C', fontWeight: 800, mb: '40px' }}>
                        Add Technology
                    </Typography>
                    <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                        Technology name
                    </Typography>
                    <ModalInput placeholder="Company" item={company} />
                    <Box>
                        <CustomButton variant="contained" onClick={addCompany} children='Save Company' disabled={isDisabled} />
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}
export default AddModal