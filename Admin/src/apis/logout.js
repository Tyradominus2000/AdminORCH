const API_LOGOUT = "/api/logout";

export async function signout() {
  const response = await fetch(API_LOGOUT, {
    method: "DELETE",
    credentials: "include",
  });
  if (response.ok) {
    window.location.reload();
  }
}
