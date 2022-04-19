import React, { useEffect, useState } from 'react';
import EducationTable from '../components/EducationTable';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import ModalInput from '../components/ModalInput';
import DelInput from '../img/DelInput'
import { universitiesActions } from '../actionsTypes/universitiesActionTypes';
import { useAppDispatch, useTypedSelector } from '../redusers/useTypedSelector';
import { Box, Modal, Typography } from '@mui/material';

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
    const [ searchParam, setSearchParam ] = React.useState<string>('');
    const universities = useTypedSelector((state) => state.universities.universities);

    useEffect(() => {
        const listener = (event: { code: string; preventDefault: () => void; }) => {
          if (event.code === "Enter" || event.code === "NumpadEnter") {
            event.preventDefault();
            if (searchParam === '') {
                dispatch({ type: universitiesActions.GET_UNIVERSITIES_REQUEST });
            } else {
                dispatch( {type: universitiesActions.SEARCH_UNIVERSITIES_REQUEST, payload: searchParam});
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

    const [isDisabled, setIsDisabled] = React.useState(false);
    React.useEffect(() => {
        setIsDisabled(false)
        arrayUniversity.map((n) => {
            !n && setIsDisabled(true)
        });
    }, [arrayUniversity]);
    
    const addUniversity = () => {
        const objArr= arrayUniversity.map(e => ({'Name': e}));
        dispatch( {type: universitiesActions.ADD_UNIVERSITY_REQUEST, payload: objArr});
        setArrayUniversity(['']);
        handleClose();
    }
    const handleAddUnivercity = () =>
        setArrayUniversity([...arrayUniversity, university])
    ;
    
    return (
        <Box sx={{ pl: '250px', pr: '35px'}}>

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
                                <ModalInput placeholder="University" item={university} setItem={handleChangeUniverscity(index)} index={index} />
                            </Box>
                        ))}
                        <Box sx={{ mb: '35px' }}>
                            <CustomButton variant="outlined" children='+ Add University' onClick={handleAddUnivercity} />
                        </Box>
                        <Box>
                            <CustomButton variant="contained" onClick={addUniversity} children='Save University' disabled={isDisabled} />
                        </Box>
                    </Box>
                </Box>
            </Modal>
            <Typography sx={{fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#535E6C', mt: '35px', mb:'30px'}}>Education ({universities.length})</Typography>
            <Box sx={{display: 'flex'}}>              
                    <Input setParam={setSearchParam} placeholder={"Search university"}/>
                <Box sx={{marginLeft:'auto'}}>
                    <CustomButton variant="contained" onClick={(handleOpen)} children = '+ Add University' />
                </Box>
            </Box>
            <EducationTable />
        </Box>
    )
}
export default EducationPage