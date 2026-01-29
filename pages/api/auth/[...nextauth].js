import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import bcrypt from "bcrypt";

export const authOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const email = String(credentials?.email || "")
            .toLowerCase()
            .trim();
          const password = String(credentials?.password || "");

          if (!email || !password) {
            console.log("[AUTH][CREDENTIALS] Missing email or password");
            return null;
          }

          await dbConnect();

          
          const user = await User.findOne({ email, provider: "credentials" })
            .select("+passwordHash")
            .lean();

          if (!user) {
            console.log("[AUTH][CREDENTIALS] User not found:", email);
            return null;
          }

          if (!user.passwordHash) {
            console.log("[AUTH][CREDENTIALS] No passwordHash for user:", email);
            return null;
          }

          const ok = await bcrypt.compare(password, user.passwordHash);
          if (!ok) {
            console.log("[AUTH][CREDENTIALS] Password mismatch for:", email);
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name || user.email,
            image: user.image || null,
          };
        } catch (error) {
          console.error("[AUTH][CREDENTIALS] authorize error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (user?.id) token.sub = user.id;

      if (account?.provider === "github" && token?.email) {
        await dbConnect();
        const email = String(token.email).toLowerCase().trim();

        const updateFields = {};
        if (token?.name) updateFields.name = token.name;
        if (token?.picture) updateFields.image = token.picture;

        await User.updateOne(
          { email },
          {
            $setOnInsert: { email, provider: "github" },
            ...(Object.keys(updateFields).length ? { $set: updateFields } : {}),
          },
          { upsert: true }
        );

        const dbUser = await User.findOne({ email }).lean();
        if (dbUser?._id) token.sub = dbUser._id.toString();
      }

      return token;
    },

    async session({ session, token }) {
      if (session?.user) session.user.id = token.sub;
      return session;
    },
  },
};

export default NextAuth(authOptions);
