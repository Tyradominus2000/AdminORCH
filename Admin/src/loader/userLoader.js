import { GetCurrentUser } from "../apis/auth";

export async function userLoader() {
  return GetCurrentUser();
}
