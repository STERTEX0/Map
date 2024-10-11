import React, { useRef, useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import './GoogleMapComponent.css';
import { getIconUrl } from './iconUtils'; // Import ฟังก์ชัน

const containerStyle = {
  width: '100%',
  height: '94.3vh'
};

const center = {
  lat: 13.7563,
  lng: 100.5018
};

// Dark mode map options
const mapOptions = {
  mapTypeControl: false,
  styles: [
    {
      "elementType": "geometry",
      "stylers": [{ "color": "#212121" }]
    },
    {
      "elementType": "labels.icon",
      "stylers": [{ "visibility": "off" }]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#757575" }]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [{ "color": "#212121" }]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [{ "color": "#757575" }]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#757575" }]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [{ "color": "#2c2c2c" }]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#8a8a8a" }]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{ "color": "#000000" }]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#3d3d3d" }]
    }
  ]
};


const GoogleMapComponent = ({ droneData, selectedData, onMarkerClick }) => {
  const mapRef = useRef(null); // อ้างอิงไปยัง Google Map instance
  const [paths, setPaths] = useState({}); // สถานะสำหรับเก็บเส้นทางของโดรน
  const [latestMarkers, setLatestMarkers] = useState([]); // สถานะสำหรับเก็บมาร์คเกอร์ล่าสุด

  useEffect(() => {
    if (droneData && Array.isArray(droneData)) {
      const newMarkers = [];
      const newPaths = { Drone1: [], Drone2: [], Drone3: [] };

      droneData.forEach(device => {
        const deviceType = device.device_type;
        const latestPoi = device.poi[device.poi.length - 1]; // รับข้อมูล POI ล่าสุด

        if (latestPoi) {
          const dronePosition = { lat: parseFloat(latestPoi.drone_lat), lng: parseFloat(latestPoi.drone_lon) };
          const appPosition = { lat: parseFloat(latestPoi.app_lat), lng: parseFloat(latestPoi.app_lon) };
          const homePosition = { lat: parseFloat(latestPoi.home_lat), lng: parseFloat(latestPoi.home_lon) }; // รับข้อมูล home

          // เพิ่มมาร์คเกอร์สำหรับตำแหน่งโดรนและแอพ
          newMarkers.push({
            position: dronePosition,
            icon: getIconUrl(deviceType, 'drone'),
            title: `Model: ${deviceType}\nID: ${device.serial_number}`,
            serial_number: device.serial_number
          });

          if (latestPoi.app_lat && latestPoi.app_lon) {
            newMarkers.push({
              position: appPosition,
              icon: getIconUrl(deviceType, 'app'),
              title: `App Location for ${deviceType}`
            });
          }

          if (latestPoi.home_lat && latestPoi.home_lon) { // เพิ่มมาร์คเกอร์สำหรับ home
            newMarkers.push({
              position: homePosition,
              icon: getIconUrl(deviceType, 'home'),
              title: `Home Location for ${deviceType}`
            });
          }

          // เพิ่มจุดเส้นทางสำหรับแต่ละโดรน
          newPaths[deviceType] = device.poi.map(poi => ({
            lat: parseFloat(poi.drone_lat),
            lng: parseFloat(poi.drone_lon)
          }));
        }
      });

      setLatestMarkers(newMarkers);
      setPaths(newPaths);
    }
  }, [droneData]);

  useEffect(() => {
    if (selectedData && mapRef.current) {
      const { drone_lat, drone_lon, app_lat, app_lon } = selectedData;
      const bounds = new window.google.maps.LatLngBounds();
      if (drone_lat && drone_lon) {
        bounds.extend(new window.google.maps.LatLng(drone_lat, drone_lon));
      }
      if (app_lat && app_lon) {
        bounds.extend(new window.google.maps.LatLng(app_lat, app_lon));
      }
      mapRef.current.fitBounds(bounds);
    }
  }, [selectedData]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyB4nXk5bJajZVx1OWN4esLGd5GQxmwb10M">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        options={mapOptions}  // Apply dark mode options
        onLoad={map => mapRef.current = map} // กำหนด mapRef เป็น Google Map instance
      >
        {latestMarkers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            icon={{
              url: marker.icon,
              scaledSize: new window.google.maps.Size(50, 50),
              anchor: new window.google.maps.Point(25, 25)
            }}
            title={marker.title}
            onClick={() => onMarkerClick(marker.serial_number)} // จัดการคลิกมาร์คเกอร์
          />
        ))}
        {Object.keys(paths).map((deviceType, index) => (
          <Polyline
            key={index}
            path={paths[deviceType]}
            options={{
              strokeColor: deviceType === 'Drone1' ? '#FF0000' : deviceType === 'Drone2' ? '#00FF00' : '#0000FF',
              strokeOpacity: 1.0,
              strokeWeight: 2
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
