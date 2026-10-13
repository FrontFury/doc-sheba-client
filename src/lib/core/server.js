"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const parseResponse = async (res) => {
  const body = await res.text();
  return body.trim() ? JSON.parse(body) : null;
};

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  return parseResponse(res);
};

export const serverMutation = async (path, data) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return parseResponse(res);
};
