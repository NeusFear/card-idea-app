import { NextResponse } from 'next/server';
import clientPromise from "../../../../lib/mongodb";

export async function GET() {
    try {
        await clientPromise.connect();
        const db = clientPromise.db('cards'); // Replace with your database name
        const collection = db.collection('missions'); // Replace with your collection name

        const data = await collection.find({}).toArray();

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    } finally {
        await clientPromise.close();
    }
}