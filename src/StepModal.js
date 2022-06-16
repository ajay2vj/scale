import React, { useState } from "react";
import {
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  useForm,
  FormProvider,
} from "react-hook-form";
import BasicForm from "./components/basicForm";
import ContactForm from "./components/contactForm";
import PersonalForm from "./components/personalForm";
import PaymentForm from "./components/paymentForm";
import Modal from "./components/Modal";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Basic information",
    "Contact Information",
    "Personal Information",
    "Payment",
  ];
}



function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicForm />;

    case 1:
      return <ContactForm />;
    case 2:
      return <PersonalForm />;
    case 3:
      return <PaymentForm />;
    default:
      return "unknown step";
  }
}

export default function StepModal() {
  const [showmodal, setShowModal] = useState(false)
  const classes = useStyles();
  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      nickName: "",
      emailAddress: "",
      phoneNumber: "",
      alternatePhone: "",
      address1: "",
      address2: "",
      country: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = (data) => {
    // console.log(data);
    if (activeStep === steps.length - 1) {
      setActiveStep(activeStep + 1);
      setTimeout(()=>{
        setShowModal(false)
        window.location.reload()
      },[2000])
    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };

  // const onSubmit = (data) => {
  //   console.log(data);
  // };
  return (
    <div>
      <div className="p-8">
      <Button 
        variant="contained" 
        onClick={()=>setShowModal(true)}
      >
        Click to Install
        </Button>
      </div>
      <Modal
        className="md:w-2/3"
        showModal={showmodal}
        setShowModal={()=>setShowModal(false)}
      >
        <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map((step, index) => {
            const labelProps = {};
            const stepProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography
                  variant="caption"
                  align="center"
                  style={{ display: "block" }}
                >
                  optional
                </Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step {...stepProps} key={index}>
                <StepLabel {...labelProps}>{step}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length ? (
          <div className="pb-6 pt-6">
            <Typography variant="h3" align="center">
              Thank You
            </Typography>
          </div>
        ) : (
          <>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(handleNext)} className="p-7">
                {getStepContent(activeStep)}

                <Button
                  className={classes.button}
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  back
                </Button>
                {isStepOptional(activeStep) && (
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={handleSkip}
                  >
                    skip
                  </Button>
                )}
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  // onClick={handleNext}
                  type="submit"
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </form>
            </FormProvider>
          </>
        )}
      </Modal>
    </div>
  );
};
