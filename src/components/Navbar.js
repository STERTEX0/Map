import React, { useState } from 'react';
import { Navbar, Modal } from 'react-bootstrap';
import DataForm from './DataForm'; // Import DataForm
import './Navbar.css';

const AppNavbar = () => {
  const [showDataFormModal, setShowDataFormModal] = useState(false);

  // const handleShowDataForm = () => setShowDataFormModal(true);
  const handleCloseDataForm = () => setShowDataFormModal(false);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand>GPS Drone</Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Button 
              variant="outline-light" 
              onClick={handleShowDataForm}
              style={{ marginRight: '10px' }}
            >
              เพิ่มตำแหน่ง Drone
            </Button>
          </Nav>
        </Navbar.Collapse> */}
      </Navbar>

      {/* Modal for DataForm */}
      <Modal show={showDataFormModal} onHide={handleCloseDataForm} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>เพิ่มข้อมูล Drone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DataForm onClose={handleCloseDataForm} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AppNavbar;
