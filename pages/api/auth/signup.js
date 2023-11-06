import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

async function handler(request, response) {
  if (request.method !== "POST") {
    return;
  }

  const data = request.body;

  const { email, password } = data;
  if (
    !email ||
    !password ||
    /@mail\.ch$/.test(email) ||
    !email.includes("@") ||
    password.trim().length < 6
  ) {
    response.status(402).json({ message: "Invalid password or email" });
    return;
  }
  const client = await connectToDatabase();
  const db = client.db();
  const existingUser = await db.collection("users").findOne({ email: email });
  if (existingUser) {
    response.status(422).json({ message: "This user is already exists" });
    client.close();
    return;
  }
  const hashedPassword = await hashPassword(password);
  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
  });
  response.status(201).json({ message: "The user is created!" });
  client.close();
}

export default handler;
