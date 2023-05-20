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

// validate: (values) => {
//   let errors = {} as ICreateAccountForm;
//   if (!values.fullName) {
//     errors.fullName = "Name required";
//   }
//   if (!values.email) {
//     errors.email = "Email required";
//   } else if (
//     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/i.test(values.email!)
//   ) {
//     errors.email = "This is not a valid email!";
//   }
//   const existingAccounts = accountStore!;
//   const matchingEmail = existingAccounts?.find(
//     (acc) => acc.credentials?.email === values.email
//   );
//   if (matchingEmail) {
//     errors.email = "This email address is already used!";
//   }
//   if (!values.password) {
//     errors.password = "Password required";
//   } else if (values.password.length < 8) {
//     errors.password = "Your password need to have at least 8 characters!";
//   }
//   return errors;
// },
