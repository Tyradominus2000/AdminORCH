const API_AUTH = "/api/auth";

export async function GetCurrentUser() {
  const response = await fetch(API_AUTH);

  const backResponse = await response.json();
  return backResponse;
}
