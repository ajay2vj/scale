import React from 'react'
import {
  Controller,
  useFormContext,
} from "react-hook-form";
import {
  TextField
} from "@material-ui/core";

export default function BasicForm(){
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="firstName"
        render={({ field }) => (
          <TextField
            id="first-name"
            label="Custom Name"
            variant="outlined"
            placeholder="Enter Custom Name"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="lastName"
        render={({ field }) => (
          <TextField
            id="last-name"
            label="Port Number"
            variant="outlined"
            placeholder="Enter Port Number"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
    </>
  );
};