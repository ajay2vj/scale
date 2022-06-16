import React from 'react'
import {
  Controller,
  useFormContext,
} from "react-hook-form";
import {
  TextField
} from "@material-ui/core";

export default function PersonalForm() {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="address1"
        render={({ field }) => (
          <TextField
            id="address1"
            label="OS Version"
            variant="outlined"
            placeholder="Enter OS Version"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="address2"
        render={({ field }) => (
          <TextField
            id="address2"
            label="Kernal Version"
            variant="outlined"
            placeholder="Enter Kernal Version"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
    </>
  );
};