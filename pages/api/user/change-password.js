import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../lib/db";
import { hashPassword, verifyPassword } from "../../../lib/auth";

async function handler(request, response) {
  if (request.method !== "PATCH") {
    return;
  }

  const { newPassword, oldPassword } = request.body;

  const session = await getSession({ req: request });

  if (!session) {
    response.status(401).json({ message: "No authenticated" });
    return;
  }

  const userEmail = session.user.email;
  const client = await connectToDatabase();
  const usersCollection = client.db().collection("users");
  const user = await usersCollection.findOne({ email: userEmail });
  const passwordAreEqual = await verifyPassword(oldPassword, user.password);

  if (!passwordAreEqual) {
    response.status(403).json({ message: "Password is valid" });
    client.close();
    return;
  }

  const newHashedPassword = await hashPassword(newPassword);
  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: newHashedPassword } }
  );

  client.close();
  response.status(200).json({ message: "Updated password" });
}

export default handler;
