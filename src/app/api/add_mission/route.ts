import { NextResponse } from 'next/server';
import clientPromise from "../../../../lib/mongodb";

export async function POST(req: Request) {
    try {
        const { desc, submitter } = await req.json(); // Get data from the request body

        // Connect to the database
        await clientPromise.connect();
        const db = clientPromise.db('cards');
        const collection = db.collection('missions');

        // Insert the new document into MongoDB
        const result = await collection.insertOne({ desc, submitter });

        return NextResponse.json({ message: 'Document added successfully', result });
    } catch (error) {
        console.error('Error inserting document:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await clientPromise.close();
    }
}