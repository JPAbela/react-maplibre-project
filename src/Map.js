import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const zoomStart = 5;

export default function Map() {
  const [geojsonData, setGeojsonData] = useState(null);
  const mapContainer = useRef(null); // Reference to the map container

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

  useEffect(() => {
    // if (!geojsonData) {
    //   console.log("no geogson data");
    //   return;
    // };
    // Initialize the MapLibre map
    const map = new maplibregl.Map({
      container: mapContainer.current, // Reference to the div element
      style: 'https://demotiles.maplibre.org/style.json', // Map style URL
      center: [38.9072, 77.0369], // Starting position [lng, lat]
      zoom: zoomStart, // Starting zoom level
    });

    // Add points to the map from the GeoJSON data
    map.on("load", () => {
      map.addSource("geojson-source", {
        type: "geojson",
        data: geojsonData,
      });

      map.addLayer({
        id: "geojson-layer",
        type: "circle",
        source: "geojson-source",
        paint: {
          "circle-radius": 6,
          "circle-color": "#007cbf",
        },
      });
    });

    return () => {
      map.remove(); // Clean up the map instance on component unmount
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{ width: '100%', height: '100%' }} // Style for the map container
    />
  );
}