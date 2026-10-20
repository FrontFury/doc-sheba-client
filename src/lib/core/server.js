"use server";

import { redirect } from "next/navigation";
import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const getApiUrl = (path) => {
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not configured.");
  }

  return `${baseUrl.replace(/\/$/, "")}${path}`;
};

export const authHeader = async () => {
  const token = await getUserToken();
  return token ? { authorization: `Bearer ${token}` } : {};
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
  const res = await fetch(getApiUrl(path), {
    headers: await authHeader(),
  });
  return parseResponse(res);
};

export const protectedFetch = async (path) => serverFetch(path);

const serverRequest = async (path, method, data) => {
  const headers = await authHeader();
  const res = await fetch(getApiUrl(path), {
    method,
    headers: {
      ...headers,
      ...(data === undefined ? {} : { "Content-Type": "application/json" }),
    },
    ...(data === undefined ? {} : { body: JSON.stringify(data) }),
  });

  if (res.status === 401) {
    redirect("/auth/signin"); 
  } else if (res.status === 403) {
    redirect("/unauthorized");
  }

  return parseResponse(res);
};

export const serverMutation = async (path, data) =>
  serverRequest(path, "POST", data);

export const serverPatch = async (path, data) =>
  serverRequest(path, "PATCH", data);

export const serverDelete = async (path) => serverRequest(path, "DELETE");

