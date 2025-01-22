import clientPromise from "../../../lib/mongodb";

interface Card {
    _id: string,
    desc: string,
    submitter: string
}

async function getCards() {
    const client = clientPromise;
    const db = client.db("cards");
    const collection = db.collection("missions");
    const data = await collection.find({}).toArray();
    return JSON.parse(JSON.stringify(data));
}

export default async function HomePage() {
    const data = await getCards();

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