// // src/components/Sidebar.js
// import React, { useEffect, useState } from 'react';
// import { Card } from 'react-bootstrap';
// import './Sidebar.css';

// const Sidebar = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const ws = new WebSocket('ws://192.168.1.54:3005'); // Replace with your WebSocket URL

//     ws.onopen = () => {
//       console.log('Connected to WebSocket');
//     };

//     ws.onmessage = (event) => {
//       const newData = JSON.parse(event.data);
//       setData(prevData => [...prevData, newData]);
//     };

//     ws.onclose = () => {
//       console.log('Disconnected from WebSocket');
//     };

//     return () => {
//       ws.close();
//     };
//   }, []);

//   return (
//     <div className="sidebar">
//       {data.length ? (
//         data.map((item, index) => (
//           <Card key={index} style={{ width: '100%' }}>
//             <Card.Img variant="top" src={item.image} />
//             <Card.Body>
//               <Card.Text>Model: {item.device_type}</Card.Text>
//               <Card.Text>ID: {item.serial_number}</Card.Text>
//               <Card.Text>Distance: {item.distance}</Card.Text>
//               <Card.Text>Height: {item.height}</Card.Text>
//             </Card.Body>
//           </Card>
//         ))
//       ) : (
//         <p>Loading data...</p>
//       )}
//     </div>
//   );
// };

// export default Sidebar;
