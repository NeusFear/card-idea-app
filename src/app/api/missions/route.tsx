import clientPromise from "../../../../lib/mongodb";
import {NextApiRequest, NextApiResponse} from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const client = clientPromise;
    const db = client.db("cards");
    const missions = await db
        .collection("missions")
        .find({})
        .toArray();
    res.json(JSON.parse(JSON.stringify(missions)))
}