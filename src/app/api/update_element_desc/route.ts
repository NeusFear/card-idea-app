import { NextResponse } from 'next/server';
import clientPromise from "../../../../lib/mongodb";

export async function POST(req: Request) {
    try {
        const { type, desc, newDesc } = await req.json(); // Get data from the request body

        // Connect to the database
        await clientPromise.connect();
        const db = clientPromise.db('cards');
        const collection = db.collection(type);

        console.log("change: " + desc + " " + newDesc);

        // Find and update the document
        const result = await collection.findOneAndUpdate(
            { desc: desc }, // Find by description
            { $set: { desc: newDesc } }, // Update the description
            { returnDocument: 'after' } // Return the updated document
        );

        if (!result) {
            return NextResponse.json({ error: 'Document not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Document updated successfully', result });
    } catch (error) {
        console.error('Error updating document:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await clientPromise.close();
    }
}