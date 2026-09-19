import * as React from 'react';
import { DefaultButton } from '../';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';

export default function DefaultDialog({ title, description, open, onConfirm, onCancel }: { title: string; description: string; open: boolean; onConfirm: () => void; onCancel: () => void }) {
  const { t } = useTranslation();

    return (
        <React.Fragment>
            <Dialog
            open={open}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ flexDirection: { md: "row", xs: "column" }, padding: "16px 24px", gap: { md: "0px", xs: "12px" } }}>
                <DefaultButton action={onConfirm} label={t('buttons.confirm')} />
                <DefaultButton action={onCancel} label={t('buttons.cancel')} />
            </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
