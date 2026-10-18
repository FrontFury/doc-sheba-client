"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const getApiUrl = (path) => {
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not configured.");
  }

  return `${baseUrl.replace(/\/$/, "")}${path}`;
};

const parseResponse = async (res) => {
  const body = await res.text();
  let data = null;

  if (body.trim()) {
    try {
      data = JSON.parse(body);
    } catch {
      if (res.ok) {
        throw new Error("The backend returned an invalid response.");
      }
    }
  }

  if (!res.ok) {
    throw new Error(
      data?.message || `Backend request failed with status ${res.status}.`
    );
  }

  return data;
};

export const serverFetch = async (path) => {
  const res = await fetch(getApiUrl(path));
  return parseResponse(res);
};

const serverRequest = async (path, method, data) => {
  const res = await fetch(getApiUrl(path), {
    method,
    ...(data === undefined
      ? {}
      : {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }),
  });

  return parseResponse(res);
};

export const serverMutation = async (path, data) =>
  serverRequest(path, "POST", data);

export const serverPatch = async (path, data) =>
  serverRequest(path, "PATCH", data);

export const serverDelete = async (path) => serverRequest(path, "DELETE");
