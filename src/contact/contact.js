import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./contact.css";
import axios from "axios";
import { GiWorld } from "react-icons/gi";
import { HiOutlineMail } from "react-icons/hi";
import { BsTelephone, BsArrowRight } from "react-icons/bs";
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedin } from "react-icons/fa";

export function Contact() {
  const initialValues = {
    fullname: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  };

  const validationSchema = Yup.object({
    fullname: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    subject: Yup.string().required("Subject is required"),
    phone: Yup.string().required("Phone number is required"),
    message: Yup.string().required("Message is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
   const {data}=   await axios.post("http://localhost:3032/contact", values);
      alert(data.message);
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Failed to send message!");
    }
  };

  return (
    <div className="contact">
      <div className="contact-header">
        <h1>
          Contact Us<p>Home / Contact</p>
        </h1>
      </div>

      <div className="contact-content">
        <h2>We love meeting new people and helping them.</h2>

        <div className="contact-form">
          <div className="contact-form-info">
            <div className="icons">
              <p>
                <span className="icon">
                  <HiOutlineMail />
                </span>
                <a href="mailto:info@yourdomain.com">info@yourdomain.com</a>
              </p>
              <p>
                <span className="icon">
                  <BsTelephone />
                </span>
                <a href="tel:+13784001234">+1 (378) 400-1234</a>
              </p>
              <p>
                <span className="icon">
                  <GiWorld />
                </span>
                <a href="https://www.yourdomain.com" target="_blank" rel="noopener noreferrer">
                  www.yourdomain.com
                </a>
              </p>
            </div>
            <div className="contact-smedias">
              <ul>
                <li><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a></li>
                <li><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a></li>
                <li><a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer"><FaTwitter /></a></li>
                <li><a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a></li>
              </ul>
            </div>
          </div>

          <div className="contact-form-fill">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
              <Form>
                <div className="nameEmail">
                  <div>
                    <Field type="text" name="fullname" placeholder="Name" />
                    <ErrorMessage name="fullname" component="div" className="error" />
                  </div>
                  <div>
                    <Field type="email" name="email" placeholder="Email" />
                    <ErrorMessage name="email" component="div" className="error" />
                  </div>
                </div>

                <div className="subjectPhone">
                  <div>
                    <Field type="text" name="subject" placeholder="Subject" />
                    <ErrorMessage name="subject" component="div" className="error" />
                  </div>
                  <div>
                    <Field type="text" name="phone" placeholder="Phone" />
                    <ErrorMessage name="phone" component="div" className="error" />
                  </div>
                </div>

                <div className="interested">
                  <Field as="textarea" name="message" placeholder="Hello, I am interested in.." />
                  <ErrorMessage name="message" component="div" className="error" />
                </div>

                <div className="send">
                  <button type="submit">
                    Send Now
                    <BsArrowRight style={{ marginLeft: "5px" }} color="#CDA274" />
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>

      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d97236.62360572393!2d49.78474799369314!3d40.394571267599446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d6bd6211cf9%3A0x343f6b5e7ae56c6b!2sBaku!5e0!3m2!1sen!2saz!4v1677357758009!5m2!1sen!2saz"
          title="map"
          style={{
            border: "0",
            width: "100%",
            height: "350px",
          }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
