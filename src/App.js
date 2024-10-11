import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import GoogleMapComponent from "./components/GoogleMapComponent";
import DataForm from "./components/DataForm";

import "./App.css";

function App() {
  const [mapData, setMapData] = React.useState([]); // สถานะสำหรับเก็บข้อมูลที่จะแสดงในแผนที่
  const [selectedData, setSelectedData] = React.useState(null); // สถานะสำหรับเก็บข้อมูลที่เลือก
  const [highlightedDrone, setHighlightedDrone] = React.useState(null); // สถานะสำหรับเน้นโดรนที่เลือก

  // ฟังก์ชันจัดการเมื่อคลิกการ์ดใน Sidebar
  const handleCardClick = (data) => {
    setSelectedData({
      drone_lat: parseFloat(data.drone_lat),
      drone_lon: parseFloat(data.drone_lon),
      app_lat: parseFloat(data.app_lat),
      app_lon: parseFloat(data.app_lon),
    });
    setHighlightedDrone(data.serial_number); // เน้นโดรนที่เลือก
  };

  // ฟังก์ชันจัดการเมื่อคลิกที่มาร์คเกอร์ใน GoogleMapComponent
  const handleMarkerClick = (serial_number) => {
    setHighlightedDrone(serial_number); // เน้นโดรนที่เลือก
  };

  return (
    <Router>
      <div className="App">
        <AppNavbar /> 
        <div className="main-content">
          <Sidebar 
            setMapData={setMapData} // ส่งฟังก์ชันเพื่ออัปเดตข้อมูลแผนที่
            onCardClick={handleCardClick} // ส่งฟังก์ชันเพื่อจัดการคลิกการ์ด
            highlightedDrone={highlightedDrone} // ส่งข้อมูลโดรนที่เน้น
          />
          <div className="content">
            <Routes>
              <Route path="/data-form" element={<DataForm />} /> {/* เส้นทางสำหรับคอมโพเนนต์ DataForm */}
              <Route
                path="/"
                element={
                  <GoogleMapComponent
                    droneData={mapData} // ส่งข้อมูลสำหรับมาร์คเกอร์และเส้นทางในแผนที่
                    selectedData={selectedData} // ส่งข้อมูลที่เลือกสำหรับแผนที่
                    onMarkerClick={handleMarkerClick} // ส่งฟังก์ชันเพื่อจัดการคลิกมาร์คเกอร์
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
