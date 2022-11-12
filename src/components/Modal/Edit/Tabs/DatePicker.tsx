import { Box } from '@mui/system';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TextField } from '@mui/material';

type Props = {
  name: string
  label: string
};

const DatePicker = ({ name, label }: Props) => {
  const methods = useFormContext();

  return (
    <Box>
      <Controller
        name={name}
        control={methods.control}
        defaultValue={new Date()}
        render={({ field }) => {
          return (
            <DesktopDatePicker
              inputFormat="dd/MM/yyyy"
              label={label}
              {...field}
              renderInput={(params) => (
                <TextField variant="outlined" color="primary" {...params} />
              )}
            />
          );
        }}
      />
    </Box>
  );
};

export default DatePicker;
