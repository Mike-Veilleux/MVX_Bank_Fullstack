import * as yup from "yup";

const pwRules =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const createAccountSchema = yup.object({
  name: yup.string().required("Required"),
  email: yup
    .string()
    .matches(pwRules, {
      message: "Please enter a valid email",
    })
    .required("Required"),
  password: yup.string().min(8).required("Required"),
});

export const loginAccountSchema = yup.object({
  email: yup
    .string()
    .matches(pwRules, {
      message: "Please enter a valid email",
    })
    .required("Required"),
  password: yup.string().min(8).required("Required"),
});

export const transactionAmountSchema = yup.object({
  amount: yup
    .number()
    .positive("Amount must be a positive number")
    .required("Required")
    .test("Is whole numbers", "Only whole numbers are accepted", (value) =>
      Number.isInteger(value)
    ),
});
