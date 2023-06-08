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

export async function DeleteComponent(id) {
  console.log(id);
  const obj = { id };
  const response = await fetch(API_COMP + "/delete", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const backResponse = await response.json();

  return backResponse;
}

export async function CreateComponent(component) {
  const response = await fetch(API_COMP + "/create", {
    method: "POST",
    body: JSON.stringify(component),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const backResponse = await response.json();

  return backResponse;
}
