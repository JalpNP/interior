import { useFormik } from "formik";
import * as Yup from "yup";
import "./Login.scss";
import { useContext, useState } from "react";
import {
  Form,
  Button,
  FormControl,
  Spinner,
  Alert,
  Container,
  Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MyContext from "../MyContext/MyContext";

const Login = () => {
  const Navigate = useNavigate();
  const { handleLogin } = useContext(MyContext);

  const [showPass, setShowPass] = useState(false);
  const [loader, setLoader] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "success" });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("**Enter a valid email").required("**Email is required"),
      password: Yup.string().min(8, "**Password must be at least 8 characters").required("**Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoader(true);
      const response = await fetch("http://localhost:3032/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      setLoader(false);

      if (data.success) {
        handleLogin(data.data);
        setAlert({ show: true, message: "Login successful!", variant: "success" });
        resetForm();
        Navigate("/");
      } else {
        setAlert({ show: true, message: data.error || "Login failed.", variant: "danger" });
      }
    },
  });

  const handleForgotPassword = () => {
    if (window.confirm("Are you sure you want to reset your password?")) {
      Navigate("/forget-password");
    }
  };

  return (
    <>
      {!sessionStorage.getItem("token") ? (
        <>
          <h1 className="log_heading text-center mb-4">Login</h1>
          <Container className="Login_main d-flex justify-content-center">
            <Card className="p-4 shadow login-card">
              {alert.show && (
                <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
                  {alert.message}
                </Alert>
              )}
              <Form onSubmit={formik.handleSubmit} className="Login_form">
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <div className="password-wrapper">
                  <FormControl
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.email && !!formik.errors.email}
                  />
                  </div>
                  <Form.Control.Feedback type="invalid" style={{color: "red"}}>
                    {formik.errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <div className="password-wrapper">
                    <FormControl
                      type={showPass ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      isInvalid={formik.touched.password && !!formik.errors.password}
                    />
               
                  </div>
                  <Form.Control.Feedback type="invalid" style={{color: "red"}}>
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <p className="log_fp text-primary mb-3" onClick={handleForgotPassword}>
                  Forgot Your Password?
                </p>

                <Button variant="dark" type="submit" className="log_btn w-100 mb-2">
                  {loader ?'wait...' : "Sign in"}
                </Button>

                <p className="log_ca text-center text-primary" onClick={() => Navigate("/register")}>
                  Create account
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

export default Login;
