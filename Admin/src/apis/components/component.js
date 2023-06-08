const API_COMP = "/api/components";

export async function GetComponent() {
  const response = await fetch(API_COMP);

  const backResponse = await response.json();
  return backResponse;
}
