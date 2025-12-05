import { cookies } from "next/headers";
import { decryptToken } from "./sessions";

type authUserType = {
  userId: string;
  expiresAt: string;
  iat: number;
  exp: number;
};

export default async function getAuthUser(): Promise<authUserType | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return null;
  const user = await decryptToken(token);
  return user as authUserType;
}
