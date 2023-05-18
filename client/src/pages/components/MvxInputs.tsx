import { Form } from "react-bootstrap";
type PrivateProps = {
  formik: any;
  objectName: string;
  label?: string;
};

export const InputUserName = ({ formik, objectName, label }: PrivateProps) => {
  return (
    <Form.Group className="mb-3" controlId="formBasicFullname">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="text"
        name="fullName"
        placeholder="Enter name"
        value={formik.values[objectName]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <InputValidationErrorAndTouch formik={formik} objectName={objectName} />
    </Form.Group>
  );
};

export const InputEmail = ({ formik, objectName, label }: PrivateProps) => {
  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="text"
        name="email"
        placeholder="Enter email"
        value={formik.values[objectName]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <InputValidationErrorAndTouch formik={formik} objectName={objectName} />
    </Form.Group>
  );
};

export const InputPassword = ({ formik, objectName, label }: PrivateProps) => {
  return (
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="password"
        name="password"
        placeholder="Enter password"
        value={formik.values[objectName]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <InputValidationErrorAndTouch formik={formik} objectName={objectName} />
    </Form.Group>
  );
};

export const InputAmount = ({ formik, objectName, label }: PrivateProps) => {
  return (
    <Form.Group className="mb-3" controlId="formBasicDepositAmount">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="number"
        name="amount"
        placeholder="Enter amount"
        value={formik.values[objectName]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <InputValidationError formik={formik} objectName={objectName} />
    </Form.Group>
  );
};

const InputValidationError = ({ formik, objectName }: PrivateProps) => {
  return (
    <>
      {formik.errors[objectName] ? (
        <Form.Label style={{ color: "red", fontSize: "0.9em" }}>
          {formik.errors[objectName]}
        </Form.Label>
      ) : null}
    </>
  );
};

const InputValidationErrorAndTouch = ({ formik, objectName }: PrivateProps) => {
  return (
    <>
      {formik.errors[objectName] && formik.touched[objectName] ? (
        <Form.Label style={{ color: "red", fontSize: "0.9em" }}>
          {formik.errors[objectName]}
        </Form.Label>
      ) : null}
    </>
  );
};
