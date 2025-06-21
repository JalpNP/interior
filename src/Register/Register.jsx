import { useFormik } from "formik";
import * as Yup from "yup";
import "./Register.scss";
import { useState } from "react";
import { Form, Button, FormControl, Spinner, Alert, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const Navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const [loader, setLoader] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "success" });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("**Name is required"),
      email: Yup.string().email("**Enter a valid email").required("**Email is required"),
      mobile: Yup.string().matches(/^[0-9]{10}$/, "**Enter a valid 10-digit mobile number").required("**Mobile number is required"),
      password: Yup.string().min(8, "**Password must be at least 8 characters").required("**Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoader(true);
      const response = await fetch("http://localhost:3032/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      setLoader(false);

      if (data.success) {
        setAlert({ show: true, message: "Registration successful!", variant: "success" });
        resetForm();
        setTimeout(() => Navigate("/login"), 1000);
      } else {
        setAlert({ show: true, message: data.error || "Registration failed.", variant: "danger" });
      }
    },
  });

  return (
    <>
      {!sessionStorage.getItem("token") ? (
        <>
          <h1 className="reg_heading text-center mb-4">Register</h1>
          <Container className="Register_main d-flex justify-content-center">
            <Card className="p-4 shadow register-card">
              {alert.show && (
                <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
                  {alert.message}
                </Alert>
              )}
              <Form onSubmit={formik.handleSubmit} className="Register_form">
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <FormControl
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.name && !!formik.errors.name}
                  />
                  <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                    {formik.errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <FormControl
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.email && !!formik.errors.email}
                  />
                  <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                    {formik.errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="mobile">
                  <Form.Label>Mobile</Form.Label>
                  <FormControl
                    type="text"
                    name="mobile"
                    placeholder="Enter your mobile number"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.mobile && !!formik.errors.mobile}
                  />
                  <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                    {formik.errors.mobile}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <FormControl
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.password && !!formik.errors.password}
                  />
                  <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="dark" type="submit" className="reg_btn w-100 mb-2">
                  {loader ?'wait...' : "Sign up"}
                </Button>

                <p className="reg_ca text-center text-primary" onClick={() => Navigate("/login")}>
                  Already have an account? Login
                </p>
              </Form>
            </Card>
          </Container>
        </>
      ) : (
        Navigate("/")
      )}
    </>
  );
};

export default Register;
