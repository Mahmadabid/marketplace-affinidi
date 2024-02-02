import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { ApiError } from "../api-error";
import { UserInfo } from "../types/types";
import { authOptions } from "./authOptions";

export async function auth(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<{ accessToken: string; userId: string; user?: UserInfo }> {
  const session = await getServerSession(req, res, authOptions);
  const accessToken = session?.accessToken;
  const userId = session?.userId;
  const user = session?.user;

  if (!accessToken || !userId) {
    throw new ApiError({
      code: "NOT_AUTHENTICATED",
      message: "Access token is not present in the cookies",
      httpStatusCode: 401,
    });
  }

  return { accessToken, userId, user };
}
