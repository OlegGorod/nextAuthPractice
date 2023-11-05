import { MongoClient } from "mongodb";

export async function connectToDatabase() {
    const client = await MongoClient.connect(
        "mongodb+srv://ogorodenskyi:U6y21UsEzwPH2hRM@cluster0.ptwva33.mongodb.net/auth-demo?retryWrites=true&w=majority"
    );
    return client
}