export const Fetch = async <ResponseType>(
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE",
  url: string,
  body?: any
) => {
  const response = await fetch(url, {
    method,
    body: !!body ? JSON.stringify({ url, body }) : undefined,
  });
  const json = (await response.json()) as ResponseType;
  // if (response.status >= 300) {
  // throw new Error(json.error);
  // } else {
  return json;
  // }
};
