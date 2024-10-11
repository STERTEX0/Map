import React, { useState, useEffect } from 'react';
import { Card, Button, Dropdown } from 'react-bootstrap';
import { getIconUrl } from './iconUtils'; // Import ฟังก์ชัน
import './Sidebar.css';

const Sidebar = ({ setMapData, onCardClick, highlightedDrone }) => {
  const [uniqueData, setUniqueData] = useState([]);
  const [selectedDrone, setSelectedDrone] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://192.168.1.54:3004');

    ws.onopen = () => {
      console.log('Connected to WebSocket');
    };

    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);

      setUniqueData(prevList => {
        let found = false;

        for (let i = 0; i < prevList.length; i++) {
          if (prevList[i].serial_number === newData.serial_number && prevList[i].device_type === newData.device_type) {
            const poiExists = prevList[i].poi.some(poi => poi.id === newData.id);
            if (!poiExists) {
              prevList[i].poi.push(newData);
            } else {
              prevList[i].poi = prevList[i].poi.map(poi => poi.id === newData.id ? newData : poi);
            }
            found = true;
            break;
          }
        }

        if (!found) {
          prevList.push({
            serial_number: newData.serial_number,
            device_type: newData.device_type,
            poi: [newData]
          });
        }

        const uniqueData = prevList.reduce((acc, data) => {
          if (!acc.some(item => item.serial_number === data.serial_number)) {
            acc.push(data);
          }
          return acc;
        }, []);

        return uniqueData;
      });
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket');
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (selectedDrone) {
      setMapData([selectedDrone]);
    } else {
      setMapData(uniqueData);
    }
  }, [uniqueData, selectedDrone, setMapData]);

  const handleCardClick = (data) => {
    const latestPoi = data.poi[data.poi.length - 1];
    onCardClick({
      drone_lat: parseFloat(latestPoi.drone_lat),
      drone_lon: parseFloat(latestPoi.drone_lon),
      app_lat: parseFloat(latestPoi.app_lat),
      app_lon: parseFloat(latestPoi.app_lon)
    });
  };

  const handleShowAll = () => {
    setSelectedDrone(null);
  };

  const handleShowOne = (deviceType) => {
    const selected = uniqueData.find(data => data.device_type === deviceType);
    setSelectedDrone(selected);
  };

  return (
    <div className="sidebar">
      <div className="button-container">
        <Button variant="primary" onClick={handleShowAll}>
          ทั้งหมด
        </Button>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            แสดงอันเดียว
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {uniqueData.map((data, index) => (
              <Dropdown.Item 
                key={index}
                onClick={() => handleShowOne(data.device_type)}
              >
                {data.device_type}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="card-container">
        {(selectedDrone ? [selectedDrone] : uniqueData).map((data, index) => {
          const poi = data.poi[data.poi.length - 1];
          const isHighlighted = highlightedDrone === data.serial_number;
          const droneIconUrl = getIconUrl(data.device_type, 'drone'); // ดึง URL ของไอคอนโดรน
  
          return (
            <Card 
              key={index} 
              className={`card ${isHighlighted ? 'highlight' : ''}`}
              onClick={() => handleCardClick(data)}
            >
              <Card.Img 
                variant="top" 
                src={droneIconUrl}  // ใช้ไอคอนเดียวกับใน GoogleMapComponent
                alt={`Image of ${data.device_type}`} 
                className="card-img-top"
              />
              <Card.Body className="card-body-content">
                <Card.Text>Model: {data.device_type}</Card.Text>
                <Card.Text>ID: {data.serial_number}</Card.Text>
                <Card.Text>Distance: {poi.distance}</Card.Text>
                <Card.Text>Height: {poi.height}</Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
  
};

export default Sidebar;
