import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import Admin from "@/models/Admin";
import { connectDB } from "./db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        try {
          await connectDB();

          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          const user = await Admin.findOne({
            email: credentials.email,
          });

          if (!user) {
            throw new Error("No admin found");
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValid) {
            throw new Error("Wrong password");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,

            // IMPORTANT
            isAdmin: true,
          };
        } catch (error) {
          console.error("AUTH ERROR:", error);
          throw error;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // runs on login
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;

        // admin flag
        token.isAdmin = user.isAdmin;
      }

      return token;
    },

    async session({ session, token }) {
      // send data to frontend
      if (session.user) {
        session.user.id = token.id as string;

        session.user.email = token.email as string;

        session.user.name = token.name as string;

        session.user.isAdmin = token.isAdmin as boolean;
      }

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};