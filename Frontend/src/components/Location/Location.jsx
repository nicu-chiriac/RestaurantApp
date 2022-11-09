import React from 'react';
import './Location.css';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function Location() {

  return (
    <section className="location" id="location">
      <div className='grey-block'>
        <h1>Where you can find us</h1>
        <h2>6th Main Street, Somersworth, NH</h2>
        <h3>Contacts: <br />Email: example@gmail.com <br /><br />Phone(1): +0001 4548 6457 <br /> Phone(2): +0001 8974 6584 </h3>
      </div>
      <div className='map-container'>
        <MapContainer center={[43.262741, -70.863345]} zoom={15} scrollWheelZoom={true}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[43.262741, -70.863345]}>
            <Popup>
              Our adress <br /> <b>6th Main Street, Somersworth</b>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  )
}
