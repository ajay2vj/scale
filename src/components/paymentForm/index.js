import React from 'react'
import {
  Controller,
  useFormContext,
} from "react-hook-form";
import {
  TextField
} from "@material-ui/core";

export default function PaymentForm(){
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="cardNumber"
        render={({ field }) => (
          <TextField
            id="cardNumber"
            label="UI Core Version"
            variant="outlined"
            placeholder="Enter UI Core Version"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="cardMonth"
        render={({ field }) => (
          <TextField
            id="cardMonth"
            label="Build Number"
            variant="outlined"
            placeholder="Enter Build Number"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
    </>
  );
};