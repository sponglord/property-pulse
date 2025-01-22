'use client';

// Since this is a client rendered page the query to the database needs to be done using useEffect
import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';
import { fetchProperty } from '@/utils/requests';

const PropertyPage = () => {
    const { id } = useParams();

    const [property, setProperty] = useState(null);
    // Since we are fetching from the client (c.f. server) you should also have a loading state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // We can't make useEffect async - so we need to write another function
        const fetchPropertyData = async () => {
            if (!id) return;

            try {
                const property = await fetchProperty(id);
                setProperty(property);
            } catch (error) {
                console.error('Error fetchng property:', error);
            } finally {
                setLoading(false); // Whatever happens - we want to reset the loading state
            }
        };

        if (property === null) {
            fetchPropertyData();
        }
    }, [id, property]);

    return <div>Individual PropertyPage</div>;
};
export default PropertyPage;
