import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const StaffLogin = () => {
  const [credentials, setCredentials] = useState({ staffID: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/staff/login", credentials);
      alert("Login successful!");
      navigate("/dashboard"); // Redirect to staff dashboard where all patients are shown
    } catch (error) {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <Container>
      <h2>Staff Login (Doctors/Nurses)</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Staff ID</Form.Label>
          <Form.Control type="text" name="staffID" onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" onChange={handleChange} required />
        </Form.Group>
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
};

export default StaffLogin;
