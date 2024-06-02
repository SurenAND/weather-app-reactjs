import { USERS_URL } from "../constants/url";
import { newUser } from "../types/types";

export const postUserData = async (user: newUser) => {
  const data = await fetch(`${USERS_URL}`, {
    signal: AbortSignal.timeout(6000),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(user),
  });
  return data.json();
};
