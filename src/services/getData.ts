import { USERS_URL } from "../constants/url";

export const getUserData = async (email: string, password: string) => {
  const data = await fetch(`${USERS_URL}?email=${email}&password=${password}`);
  return data.json();
};
