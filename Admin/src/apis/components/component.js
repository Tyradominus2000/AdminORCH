const API_COMP = "/api/components";

export async function GetComponent() {
  const response = await fetch(API_COMP);

  const backResponse = await response.json();
  return backResponse;
}

export async function UpdateComponent(component) {
  const response = await fetch(API_COMP + "/update", {
    method: "POST",
    body: JSON.stringify(component),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const backResponse = await response.json();

  return backResponse;
}
