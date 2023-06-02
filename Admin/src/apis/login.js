const API_LOG = "/api/login";

export async function LogIn(credidential) {
  const response = await fetch(API_LOG, {
    method: "POST",
    body: JSON.stringify(credidential),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const backResponse = await response.json();
  if (response.ok) {
    return backResponse;
  } else {
    if (backResponse) {
      throw backResponse;
    } else {
      throw new Error("Oops une erreur est survenue");
    }
  }
}
