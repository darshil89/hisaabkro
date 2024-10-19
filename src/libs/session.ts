import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";

export const getSessionForServer = async () => {
  const session = await getServerSession(authOptions);
  return session;
};
