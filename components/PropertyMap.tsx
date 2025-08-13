'use client';

import { useState, useEffect } from 'react';
import getCoordinatesFromAddress from '@/utils/getCoordinates';
import Map, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import Image from 'next/image';
import pin from '@/assets/images/pin.svg';
import { Property } from '@/types';
import Spinner from './Spinner';

type PropertyMapProps = {
  property: Property;
};

const PropertyMap = ({ property }: PropertyMapProps) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: '100%',
    height: '500px',
  });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  const address = `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`;

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const coords = await getCoordinatesFromAddress(address);

        const { lat, lng } = coords;

        if (!lat || !lng) {
          setGeocodeError(true);
          return;
        }

        setLat(lat);
        setLng(lng);
        setViewport({
          ...viewport,
          latitude: lat,
          longitude: lng,
        });
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCoords();
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  if (geocodeError)
    return <div className="text-xl">No location data found</div>;

  return (
    !loading &&
    lat !== null &&
    lng !== null && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 15,
        }}
        style={{ width: '100%', height: 500 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={lng} latitude={lat} anchor="bottom">
          <Image src={pin} alt="location" width={40} height={40} />
        </Marker>
      </Map>
    )
  );
};

export default PropertyMap;
