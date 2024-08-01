'use client';
import { useCallback, useEffect, useState } from 'react';
import {
  Map,
  MapCameraChangedEvent,
  MapCameraProps,
  Marker,
} from '@vis.gl/react-google-maps';
import { geocodeAddress } from '@/utils/geocodeAdressAndReverse';

const INITIAL_CAMERA: MapCameraProps = {
  center: { lat: -17.797610035031738, lng: -63.52392568413111 },
  zoom: 3,
};

const MapCoworking = ({
  filter,
  coworkings,
}: {
  filter: any;
  coworkings: any;
}) => {
  const [markersCoworking, setMarkersCoworking] = useState<any>([]);
  const [cameraProps, setCameraProps] =
    useState<MapCameraProps>(INITIAL_CAMERA);

  useEffect(() => {}, [filter]);

  const handleCameraChange = (ev: MapCameraChangedEvent) => {
    setCameraProps(ev.detail);
  };
  const responseCenter = async () => {
    if (filter.country) {
      const centerMap = await geocodeAddress(
        `${filter.city}, ${filter.state}, ${filter.country}`,
      );
      console.log(centerMap);

      const lat = await centerMap[0].geometry.location.lat();
      const lng = await centerMap[0].geometry.location.lng();
      if (filter.city) {
        setCameraProps((prevProps) => ({
          ...prevProps,
          center: { lat: Number(lat), lng: Number(lng) },
          zoom: 10,
        }));
      } else if (filter.state) {
        setCameraProps((prevProps) => ({
          ...prevProps,
          center: { lat: Number(lat), lng: Number(lng) },
          zoom: 8,
        }));
      } else if (filter.country) {
        setCameraProps((prevProps) => ({
          ...prevProps,
          center: { lat: Number(lat), lng: Number(lng) },
          zoom: 5,
        }));
      }
    }
  };
  const responseMarker = async () => {
    if (coworkings) {
      const arrayMarkersCoworkings = coworkings.map(async (coworking: any) => {
        if (coworking.lat && coworking.long) {
          return { lat: Number(coworking.lat), lng: Number(coworking.long) };
        } else if (coworking.country) {
          const location = await geocodeAddress(
            `${coworking.address} ,${coworking.city}, ${coworking.state}, ${coworking.country}`,
          );
          console.log(location);
          const lat = await location[0].geometry.location.lat();
          const lng = await location[0].geometry.location.lng();
          return { lat: Number(lat), lng: Number(lng) };
        }
      });

      setMarkersCoworking(await Promise.all(arrayMarkersCoworkings));
    }
  };

  useEffect(() => {
    responseMarker();
  }, [coworkings]);

  useEffect(() => {
    console.log(filter);
    responseCenter();
    console.log(coworkings);
  }, [filter]);

  return (
    <Map
      {...cameraProps}
      onCameraChanged={handleCameraChange}
      style={{ width: '100%', height: '500px' }}
    >
      {markersCoworking &&
        markersCoworking.map((marker: any, index: any) => (
          <Marker key={index} position={marker} />
        ))}
    </Map>
  );
};

export default MapCoworking;
