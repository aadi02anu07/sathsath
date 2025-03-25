import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import "../styles/Login.css"; // Import the same CSS file

const StaffLogin = () => {
  const [credentials, setCredentials] = useState({ staffID: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/staff/login", credentials);
      alert("Login successful!");
      navigate("/dashboard"); // Redirect to staff dashboard where all patients are shown
    } catch (error) {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-wrapper"> {/* Centers the login box */}
      <Container className="container"> {/* Matches your CSS container class */}
        <h2 className="heading">Staff Login (Doctors/Nurses)</h2>
        <Form className="form" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Staff ID</Form.Label>
            <Form.Control 
              className="input"
              type="text" 
              name="staffID" 
              onChange={handleChange} 
              required 
              placeholder="Enter your Staff ID"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control 
              className="input"
              type="password" 
              name="password" 
              onChange={handleChange} 
              required 
              placeholder="Enter your password"
            />
          </Form.Group>
          <Button className="login-button" type="submit">Login</Button>
        </Form>
      </Container>
    </div>
  );
};

export default StaffLogin;
