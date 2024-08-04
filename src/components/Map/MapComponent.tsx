// import React, { useEffect, useState, useCallback } from "react";
// import useGetLocation from "@app/hooks/useGetLocation";
// import {
//   MapContainer,
//   MapContainerProps,
//   TileLayer,
//   Marker,
//   Popup,
// } from "react-leaflet";
// import { LatLngExpression, LeafletMouseEvent } from "leaflet";

// const containerStyle = {
//   width: "100%",
//   height: "250px",
// };

// interface MapComponentProps {
//   address: string;
// }

// const MapComponent: React.FC<MapComponentProps> = ({ address }) => {
//   const { coords } = useGetLocation();
//   const [center, setCenter] = useState<LatLngExpression | null>(null);
//   const [map, setMap] = useState<MapContainerProps | null>(null);
//   if (!coords) {
//     return <h1>Getting localization ...</h1>;
//   }

//   return (
//     <MapContainer
//       center={{ lat: coords[0], lng: coords[1] } as LatLngExpression}
//       style={containerStyle}
//       zoom={20}
//       whenReady={(map) => {
//         map.addEventListerner("click", (event: LeafletMouseEvent) => {
//           setMap((prev) => ({
//             ...prev,
//             map: [event.latlng.lat, event.latlng.lng],
//           }));
//         });
//       }}
//       scrollWheelZoom={false}
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <Marker position={{ lat: coords[0], lng: coords[1] } as LatLngExpression}>
//         <Popup>
//           A pretty CSS3 popup. <br /> Easily customizable.
//         </Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// export default MapComponent;
