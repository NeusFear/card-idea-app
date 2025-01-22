'use client';

interface Card {
    _id: string,
    desc: string,
    submitter: string
}

import React, { useEffect, useState } from 'react';

export default function HomePage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/get_missions'); // Fetch data from API route
                if (!response.ok) throw new Error('Failed to fetch data');
                const result = await response.json();
                console.log("Fetched data: " + result);
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <main>
            <h1>Data from MongoDB</h1>
            <ul>
                {data.map((item: Card, index: number) => (
                    <li key={index}>
                        {item.desc}: {item.submitter}
                    </li>
                ))}
            </ul>
        </main>
    );
}