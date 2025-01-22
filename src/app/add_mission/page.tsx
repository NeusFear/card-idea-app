'use client';

import React, { useState } from 'react';

export default function HomePage() {
    const [desc, setDesc] = useState('');
    const [submitter, setSubmitter] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const newData = { desc, submitter };

        try {
            const response = await fetch('/api/add_mission', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message); // Show success message
                setDesc('');
                setSubmitter('');
            } else {
                throw new Error('Failed to add data');
            }
        } catch (error) {
            console.error('Error adding data:', error);
            setMessage('Error adding data');
        }
    };

    return (
        <main>
            <h1>Add Data to MongoDB</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="desc">Mission</label>
                    <input type="text" id="desc" value={desc} onChange={(e) => setDesc(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="value">Your Name</label>
                    <input type="text" id="value" value={submitter} onChange={(e) => setSubmitter(e.target.value)} required/>
                </div>
                <button type="submit">Add Data</button>
            </form>
            {message && <p>{message}</p>}
        </main>
    );
}