import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Container, Table, Button, Spinner, Modal, Form } from "react-bootstrap";

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Fetch patient data from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/patients/")
      .then((response) => {
        setPatients(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
        setLoading(false);
      });
  }, []);

  const handleEditClick = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const handleSaveChanges = () => {
    axios.put(`http://localhost:5000/api/patients/update/${selectedPatient.patientID}`, selectedPatient)
      .then((response) => {
        alert("Patient details updated successfully!");
        setShowModal(false);
        setPatients(patients.map(p => p.patientID === selectedPatient.patientID ? selectedPatient : p));
      })
      .catch((error) => {
        console.error("Error updating patient details:", error);
      });
  };

  const handleDelete = (patientID) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      axios.delete(`http://localhost:5000/api/patients/delete/${patientID}`)
        .then(() => {
          alert("Patient deleted successfully!");
          setPatients(patients.filter(p => p.patientID !== patientID));
        })
        .catch((error) => {
          console.error("Error deleting patient:", error);
        });
    }
  };

  const handleChange = (e) => {
    setSelectedPatient({ ...selectedPatient, [e.target.name]: e.target.value });
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Patient Dashboard</h1>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>BP</th>
              <th>Sugar</th>
              <th>Heart Rate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.patientID}>
                <td>{patient.patientID}</td>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.bp}</td>
                <td>{patient.sugar}</td>
                <td>{patient.heartRate}</td>
                <td>
                  <Button variant="warning" className="m-1" onClick={() => handleEditClick(patient)}>
                    Edit
                  </Button>
                  <Button variant="danger" className="m-1" onClick={() => handleDelete(patient.patientID)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Edit Patient Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Patient Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPatient && (
            <Form>
              <Form.Group>
                <Form.Label>Blood Pressure</Form.Label>
                <Form.Control type="text" name="bp" value={selectedPatient.bp} onChange={handleChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Sugar</Form.Label>
                <Form.Control type="text" name="sugar" value={selectedPatient.sugar} onChange={handleChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Heart Rate</Form.Label>
                <Form.Control type="text" name="heartRate" value={selectedPatient.heartRate} onChange={handleChange} />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Dashboard;
