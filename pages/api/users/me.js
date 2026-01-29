import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import Plant from "@/db/models/Plant";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import bcrypt from "bcrypt";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);

  if (!session?.user?.id) {
    return response.status(401).json({ message: "Not authorized" });
  }

  await dbConnect();

  const user = await User.findById(session.user.id);
  if (!user) {
    return response.status(404).json({ message: "User not found" });
  }

  if (request.method === "GET") {
    return response.status(200).json({
      id: user._id.toString(),
      name: user.name || "",
      email: user.email,
      provider: user.provider || "credentials",
    });
  }

  if (request.method === "PATCH") {
    const { name, email, currentPassword, newPassword } = request.body || {};

    const isCredentials = (user.provider || "credentials") === "credentials";

    if (currentPassword || newPassword) {
      if (!isCredentials) {
        return response.status(400).json({
          message: "Password changes are only available for credentials users",
        });
      }

      if (!currentPassword || !newPassword) {
        return response
          .status(400)
          .json({ message: "Missing password fields" });
      }

      if (String(newPassword).length < 8) {
        return response.status(400).json({ message: "Password too short" });
      }

      if (!user.passwordHash) {
        return response.status(400).json({ message: "No password set" });
      }

      const ok = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!ok) {
        return response
          .status(400)
          .json({ message: "Current password is wrong" });
      }

      user.passwordHash = await bcrypt.hash(newPassword, 12);
      await user.save();

      return response.status(200).json({ message: "Password updated" });
    }

    if (typeof name === "string") {
      user.name = name.trim();
    }

    if (typeof email === "string") {
      if (!isCredentials) {
        return response.status(400).json({
          message: "GitHub users cannot change email here",
        });
      }
      user.email = email.trim().toLowerCase();
    }

    await user.save();

    return response.status(200).json({ message: "Profile updated" });
  }

  if (request.method === "DELETE") {
    await Plant.deleteMany({ owner: session.user.id });
    await User.deleteOne({ _id: session.user.id });

    return response.status(200).json({ message: "Account deleted" });
  }

  return response.status(405).json({ message: "Method not allowed" });
}
