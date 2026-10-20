import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { admin } from "better-auth/plugins";

const getOrigin = (value) => {
  if (!value) return null;
  const url = value.includes("://") ? value : `https://${value}`;
  return new URL(url).origin;
};

const trustedOrigins = [
  process.env.BETTER_AUTH_URL,
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  process.env.VERCEL_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
]
  .map(getOrigin)
  .filter((origin, index, origins) => origin && origins.indexOf(origin) === index);

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  trustedOrigins,
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db, {
    client,
  }),
  user:{
    additionalFields:{
      role:{
        default : "patient"
      }
    }
  },
  plugins: [
    admin()
  ]
});
