import React from 'react';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';


import ModalTitle from './modalTitle/ModalTitle';
import ModalBody from './modalBody/ModalBody';

const ModalContainer = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const DatasetSelectModal = ({ open, handleClose }) => {
    return (
        <ModalContainer onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <ModalTitle id="customized-dialog-title" onClose={handleClose}> Select a Dataset </ModalTitle>
            < ModalBody />
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Save changes
                </Button>
            </DialogActions>
        </ModalContainer>
    )
}

export default DatasetSelectModal;