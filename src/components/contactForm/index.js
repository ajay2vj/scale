import React from 'react'
import {
  Controller,
  useFormContext,
} from "react-hook-form";
import {
  TextField
} from "@material-ui/core";

export default function ContactForm() {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="emailAddress"
        render={({ field }) => (
          <TextField
            id="email"
            label="Version"
            variant="outlined"
            placeholder="Enter Version"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <TextField
            id="phone-number"
            label="Modal Number"
            variant="outlined"
            placeholder="Enter Modal Number"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
    </>
  );
};