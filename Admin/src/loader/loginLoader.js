import { redirect } from "react-router-dom";
import { GetCurrentUser } from "../apis/auth";

export async function loginLoader() {
  const response = await GetCurrentUser();
  console.log(response);
  if (response) {
    return redirect("/");
  } else {
    return true;
  }
}
