import { useEffect, useRef, useState } from 'react';
import Map, {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Correct mapbox-gl stylesheet import

const MAPBOX_TOKEN = "pk.eyJ1IjoianBhYmVsYTAzIiwiYSI6ImNtNWE1OGF6bDNmZzYyaXB3aHZvb3l1OTkifQ.LvtLNNEZDUJpAOdCKXY53w"
const zoomStart = 10;

// const layerStyle = {
//   id: 'point',
//   type: 'circle',
//   paint: {
//     'circle-radius': 10,
//     'circle-color': '#007cbf'
//   }
// };

export default function MyMap() {
  const [geojsonData, setGeojsonData] = useState(null);
  const mapContainer = useRef(null); // Reference to the map container

  // Fetch GeoJSON data
  useEffect(() => {
    fetch('/crime-data.geojson') 
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('GeoJSON Data:', data); // Debugging step
        setGeojsonData(data); 
      })
      .catch((error) => console.error('Error loading GeoJSON:', error));
  }, []);

  if (!geojsonData) {
    // Show a loading state while waiting for GeoJSON data to load
    return <div>Loading map...</div>;
  }

  return (
    <Map
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={{
        longitude: -77.009056,
        latitude: 38.889805,
        zoom: zoomStart
      }}
      style={{width: '100%', height: '100%'}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
    {geojsonData.features.map((feature) => (
        <Marker
          key={feature.properties.CCN} // Use a unique property from GeoJSON
          latitude={feature.geometry.coordinates[1]} // GeoJSON has [lng, lat]
          longitude={feature.geometry.coordinates[0]}
        >
          <div style={{ cursor: 'pointer' }}>📍</div>
        </Marker>
      ))}
    </Map>  
  );
}
