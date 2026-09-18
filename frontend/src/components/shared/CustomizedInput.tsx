import { TextField } from '@mui/material';
import React from 'react';

type Props = {
  name: string;
  type: string;
  label: string;
};

function CustomizedInput(props: Props) {
  return (
    <TextField
      margin="normal"
      name={props.name}
      label={props.label}
      type={props.type}
      sx={{
        '& .MuiInputBase-root': {
          width: '400px',
          borderRadius: '10px',
          fontSize: '20px',
          color: 'white',
        },
        '& .MuiInputLabel-root': {
          color: 'white',
        },
      }}
    />
  );
}

export default CustomizedInput
