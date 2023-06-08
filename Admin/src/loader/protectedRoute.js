import { redirect } from "react-router-dom";
import { GetCurrentUser } from "../apis/auth";

export async function protectedRoute() {
  const response = await GetCurrentUser();
  console.log(response);
  if (response) {
    return true;
  } else {
    return redirect("/");
  }
}
