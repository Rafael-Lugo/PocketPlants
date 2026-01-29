import bcrypt from "bcrypt";
import dbConnect from "@/db/connect";
import User from "@/db/models/User";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ message: "Method not allowed" });
  }

  const { email, password, name } = request.body;

  const normalizedEmail = String(email || "")
    .toLowerCase()
    .trim();
  const plainPassword = String(password || "");
  const displayName = String(name || "").trim();

  if (!normalizedEmail || plainPassword.length < 8) {
    return response
      .status(400)
      .json({ message: "Invalid Input" });
  }

  await dbConnect();

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    return response.status(409).json({ message: "Email already exists" });
  }

  const passwordHash = await bcrypt.hash(plainPassword, 12);

  await User.create({
    email: normalizedEmail,
    passwordHash,
    name: displayName,
    provider: "credentials",
  });

  return response.status(201).json({ message: "User created" });
}
