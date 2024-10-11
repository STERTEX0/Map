import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const DataForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    device_type: '',
    serial_number: '',
    distance: '',
    height: '',
    drone_lat: '',
    drone_lon: '',
    app_lat: '',  // Add app_lat to the form state
    app_lon: ''   // Add app_lon to the form state
  });
  const [response, setResponse] = useState(null);

  const location = useLocation();
  const selectedData = location.state?.selectedData;

  useEffect(() => {
    if (selectedData) {
      setFormData({
        device_type: selectedData.device_type,
        serial_number: selectedData.serial_number,
        distance: selectedData.distance,
        height: selectedData.height,
        drone_lat: selectedData.drone_lat,
        drone_lon: selectedData.drone_lon,
        app_lat: selectedData.app_lat || '', // Ensure app_lat is included
        app_lon: selectedData.app_lon || ''  // Ensure app_lon is included
      });
    }
  }, [selectedData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting data:', formData); // Display the data being submitted

      const res = await fetch('http://192.168.1.54:3005/ratlog/ex/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) // Convert data to JSON
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const responseText = await res.text(); // Use .text() if response is not JSON
      console.log('Response:', responseText);

      setResponse(responseText || 'Data submitted successfully!');
      onClose(); // Close modal after successful submission
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error submitting data');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formDeviceType">
          <Form.Label>Model</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter model" 
            name="device_type"
            value={formData.device_type}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formSerialNumber">
          <Form.Label>ID</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter ID" 
            name="serial_number"
            value={formData.serial_number}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formDistance">
          <Form.Label>Distance</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter distance" 
            name="distance"
            value={formData.distance}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formHeight">
          <Form.Label>Height</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter height" 
            name="height"
            value={formData.height}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formDroneLat">
          <Form.Label>Drone Latitude</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter drone latitude" 
            name="drone_lat"
            value={formData.drone_lat}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formDroneLon">
          <Form.Label>Drone Longitude</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter drone longitude" 
            name="drone_lon"
            value={formData.drone_lon}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formAppLat">
          <Form.Label>App Latitude</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter app latitude" 
            name="app_lat"
            value={formData.app_lat}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formAppLon">
          <Form.Label>App Longitude</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter app longitude" 
            name="app_lon"
            value={formData.app_lon}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {response && <p>{response}</p>}
    </Container>
  );
};

export default DataForm;
