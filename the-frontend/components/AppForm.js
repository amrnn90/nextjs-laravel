import { ErrorMessage, FastField, Form, Formik, useField } from "formik";
import FormikErrorFocus from "formik-error-focus";

export const Fieldset = ({ name, label = name, ...rest }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <FastField name={name} id={name} {...rest} />
      <ErrorMessage name={name} />
    </div>
  );
};

export const AppForm = ({ children, ...rest }) => {
  return (
    <Formik {...rest}>
      {(formikProps) => (
        <Form>
          {typeof children === "function" ? children(formikProps) : children}
          <FormikErrorFocus focusDelay={100} duration={300} />
        </Form>
      )}
    </Formik>
  );
};

AppForm.propTypes = Formik.propTypes;
