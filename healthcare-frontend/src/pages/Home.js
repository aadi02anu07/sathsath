import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <Container className="text-center mt-5">
      <h1>Welcome to Swasthify</h1>
      <p>Providing real-time patient health monitoring.</p>
      <div className="mt-4">
        <Link to="/staff-login">
          <Button className="home-button">Staff Login</Button>
        </Link>
        <Link to="/patient-login">
          <Button className="home-button">Patient Login</Button>
        </Link>
        <Link to="/signup">
          <Button className="home-button">Sign Up</Button>
        </Link>
      </div>
    </Container>
  );
};

export default Home;
