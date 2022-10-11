import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import Persons from "../../../class/Persons.class";
import { SUBSCRIPTION } from "../../../class/Subscription.enum";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { PersonContext } from "../../container/PersonList";

const PersonFormFormik = ({ add }) => {
  //Find the biggest ID number in the PersonContext array
  //to continue from that number
  const context = useContext(PersonContext);

  const idsFromContext = context.map((person, index) => {
    return person.id;
  });

  const maxID = Math.max(...idsFromContext);

  const initialValues = {
    nameForm: "",
    ageForm: "",
    birthForm: "",
    phoneForm: "", // to confirm password
    signForm: "",
  };

  const registerSchema = Yup.object().shape({
    nameForm: Yup.string()
      .min(6, "Username too short")
      .max(12, "Username too long")
      .required("Username is required"),
    ageForm: Yup.number()
      //.email("Invalid email format")
      .required("Age is required"),
    birthForm: Yup.string()
      // .oneOf([ROLES.USER, ROLES.ADMIN], "You must select a Role: User / Admin")
      .required("Birth date is required"),
    phoneForm: Yup.string()
      .min(8, "Phone too short")
      .required("Phone is required"),

    signForm: Yup.string()
      .min(8, "Sign up date too short")
      .required("Sign up date is required"),
    /*  subForm: Yup.string()
      .min(8, "Password too short")
      .required("Password is required"),
    confirm: Yup.string()
      .when("password", {
        is: (value) => (value && value.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "¡Passwords must match!"
       )
      })
      .required("You must confirm the password"),,*/
  });

  let [id, setId] = useState(maxID);

  function addPerson(values) {
    console.log("addperson", values);
    // e.preventDefault();
    try {
      id++;
      setId(id);

      const newPerson = new Persons(
        id,
        values.nameForm,
        values.ageForm,
        values.birthForm,
        values.phoneForm,
        values.signForm,
        values.subForm
      );
      add(newPerson);
    } catch (error) {
      console.log(error);
    }
    //clear all input values in the form
    // e.target.reset();
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        // *** Yup Validation Schema ***
        validationSchema={registerSchema}
        className="container"
        onSubmit={(values) => {
          addPerson(values);
          console.log("forki", values);
        }}
        // onSubmit Event
        /*onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 1000));
          alert(JSON.stringify(values, null, 2));
        }}*/
      >
        {({
          values,
          touched,
          errors,
          isSubmitting,
          handleSubmit,
          handleBlur,
        }) => (
          <Form className="container">
            <div className="col p-2">
              <div className="row m-1">
                <label htmlFor="nameForm">Username</label>
                <Field
                  value={values.nameForm}
                  id="nameForm"
                  type="text"
                  name="nameForm"
                  placeholder="Client name"
                />

                {/* name Errors */}
                {errors.nameForm && touched.nameForm && (
                  <ErrorMessage name="nameForm" component="div"></ErrorMessage>
                )}
              </div>

              <div className="row m-1">
                <label htmlFor="ageForm">Age</label>
                <Field
                  value={values.ageForm}
                  id="ageForm"
                  type="number"
                  name="ageForm"
                  placeholder="0"
                />
              </div>
              {/* age Errors */}
              {errors.ageForm && touched.ageForm && (
                <ErrorMessage name="ageForm" component="div"></ErrorMessage>
              )}
              <div className="row m-1">
                <label htmlFor="birthForm">Birth date</label>
                <Field
                  value={values.birthForm}
                  id="birthForm"
                  name="birthForm"
                  placeholder="Birth date"
                  type="text"
                />
                {/* birthdate Errors */}
                {errors.birthForm && touched.birthForm && (
                  <ErrorMessage name="birthForm" component="div"></ErrorMessage>
                )}
              </div>
              <div className="row m-1">
                <label htmlFor="phoneForm">Phone</label>
                <Field
                  value={values.phoneForm}
                  id="phoneForm"
                  name="phoneForm"
                  placeholder="Phone"
                  type="text"
                />
                {/* phoneForm Errors */}
                {errors.phoneForm && touched.phoneForm && (
                  <ErrorMessage name="phoneForm" component="div"></ErrorMessage>
                )}
              </div>
              <div className="row m-1">
                <label htmlFor="signForm">Birth date</label>
                <Field
                  value={values.signForm}
                  id="signForm"
                  name="signForm"
                  placeholder="Sign up date"
                  type="text"
                />
                {/* signForm Errors */}
                {errors.signForm && touched.signForm && (
                  <ErrorMessage name="signForm" component="div"></ErrorMessage>
                )}
              </div>
              <div className="row m-1">
                <label htmlFor="subForm">Subscription status</label>

                <Field
                  className="col m-1"
                  id="subForm"
                  defaultValue="1"
                  value={values.subForm}
                  as="select"
                  name="subForm"
                >
                  <option value={1} disabled>
                    Choose one
                  </option>
                  <option value={SUBSCRIPTION.ACTIVE}>Active</option>
                  <option value={SUBSCRIPTION.INACTIVE}>Inactive</option>
                  <option value={SUBSCRIPTION.PENDING}>Pending</option>
                </Field>

                {/* subForm Errors */}
                {errors.subForm && touched.subForm && (
                  <ErrorMessage name="subForm" component="div"></ErrorMessage>
                )}
              </div>
              <div className="p-2">
                <button type="submit">Register Account</button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

PersonFormFormik.propTypes = {
  add: PropTypes.func.isRequired,
};

export default PersonFormFormik;
