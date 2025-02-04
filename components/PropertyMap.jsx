'use client';
import { useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker } from 'react-map-gl';
import { setDefaults, fromAddress } from 'react-geocode'; // setDefaults is where we pass our google geocode api key, fromAddress gives us lat & long from an address
import Spinner from './Spinner';
import Image from 'next/image';
import pin from '@/assets/images/pin.svg';

const PropertyMap = ({ property }) => {
	const [lat, setLat] = useState(null);
	const [lng, setLng] = useState(null);

	const [viewport, setViewport] = useState({
		latitude: 0,
		longitude: 0,
		zoom: 15,
		width: '100%',
		height: 500,
	});

	const [loading, setLoading] = useState(true);
	const [geocodeError, setGeocodeError] = useState(false);

	setDefaults({
		key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
		language: 'en',
		region: 'us',
	});

	useEffect(() => {
		const fetchCoords = async () => {
			try {
				const { street, city, state, zipcode } = property.location;

				// Make fetch call to Google geocoding API
				const res = await fromAddress(
					`${street} ${city} ${state} ${zipcode}`
				);

				// Check for results
				if (res.results.length === 0) {
					// No results
					setGeocodeError(true);
					setLoading(false);
					return;
				}

				const { lat, lng } = res.results[0].geometry.location;

				setLat(lat);
				setLng(lng);

				setViewport({
					...viewport,
					latitude: lat,
					longitude: lng,
				});

				setLoading(false);

				// console.log('### lat, lng:: =', lat, lng);
			} catch (error) {
				console.log('### Error fetching coordinates:: error=', error);

				setGeocodeError(true);
				setLoading(false);
			}
		};

		fetchCoords();
	}, []);

	if (loading) return <Spinner loading={loading} />;

	// Handle case where geocoding failed
	if (geocodeError) {
		return <div className='text-xl'>No location data found</div>;
	}

	return (
		!loading && (
			<Map
				mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
				mapLib={import('mapbox-gl')}
				initialViewState={{
					longitude: lng,
					latitude: lat,
					zoom: viewport.zoom,
				}}
				style={{
					width: viewport.width,
					height: viewport.height,
				}}
				mapStyle={'mapbox://styles/mapbox/streets-v9'}
			>
				<Marker longitude={lng} latitude={lat} anchor={'bottom'}>
					<Image src={pin} alt='location' width={40} height={40} />
				</Marker>
			</Map>
		)
	);
};
export default PropertyMap;
