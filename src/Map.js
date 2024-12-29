import { useEffect, useRef, useState } from 'react';
import Map from 'react-map-gl';
import mapboxgl from 'mapbox-gl'; // Import mapbox-gl
import 'mapbox-gl/dist/mapbox-gl.css'; // Correct mapbox-gl stylesheet import
mapboxgl.accessToken = 'pk.eyJ1IjoianBhYmVsYTAzIiwiYSI6ImNtNWE1OGF6bDNmZzYyaXB3aHZvb3l1OTkifQ.LvtLNNEZDUJpAOdCKXY53w';


const zoomStart = 5;

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

  // Initialize the map when geojsonData is updated
  useEffect(() => {
    if (geojsonData === null) return; // Prevent map initialization until GeoJSON is loaded

    console.log("Updated geojson data: ", geojsonData);

    // // Initialize the Mapbox map
    // const map = new mapboxgl.Map({
    //   container: mapContainer.current, // Reference to the div element
    //   style: 'mapbox://styles/jpabela03/cm5a5e17y00pg01s2b2c521kz', // Map style URL (Mapbox style)
    //   center: [38.9072, 77.0369], // Starting position [lng, lat]
    //   zoom: zoomStart, // Starting zoom level
    // });

    // // Add points to the map from the GeoJSON data
    // map.on('load', () => {
    //   map.addSource('geojson-source', {
    //     type: 'geojson',
    //     data: geojsonData, // Use the loaded geojsonData
    //   });

    //   map.addLayer({
    //     id: 'geojson-layer',
    //     type: 'circle',
    //     source: 'geojson-source',
    //     paint: {
    //       'circle-radius': 6,
    //       'circle-color': '#007cbf',
    //     },
    //   });
    // });

    // Clean up map instance on component unmount
    return /*() => {
      map.remove();
    }*/;
  }, [geojsonData]);  // Only runs when geojsonData is updated

  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoianBhYmVsYTAzIiwiYSI6ImNtNWE1OGF6bDNmZzYyaXB3aHZvb3l1OTkifQ.LvtLNNEZDUJpAOdCKXY53w"
      initialViewState={{
        longitude: -100,
        latitude: 40,
        zoom: 3.5
      }}
      style={{width: '100%', height: '100%'}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  );
}
