"use server";

import { getUserSession, requireRole } from "@/lib/core/session";
import { serverDelete, serverFetch, serverPatch } from "@/lib/core/server";

const allowedRoles = ["admin", "doctor", "patient"];

const toIsoDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

const requireAdmin = async () => {
  await requireRole("admin");
  return getUserSession();
};

export async function getUsers() {
  const admin = await requireAdmin();

  try {
    const users = await serverFetch("/user");
    if (!Array.isArray(users)) {
      throw new Error("The backend returned an invalid users list.");
    }

    return {
      users: users.map((user) => ({
        id: String(user?._id ?? user?.id ?? ""),
        name: typeof user?.name === "string" ? user.name : "",
        email: typeof user?.email === "string" ? user.email : "",
        role: typeof user?.role === "string" ? user.role : "patient",
        createdAt: toIsoDate(user?.createdAt),
      })),
      currentUserId: admin.id,
    };
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return {
      error: error instanceof Error ? error.message : "Unable to load users.",
    };
  }
}

export async function updateUserRole(userId, role) {
  const admin = await requireAdmin();

  if (typeof userId !== "string" || !userId.trim()) {
    return { error: "A valid user ID is required." };
  }
  if (!allowedRoles.includes(role)) {
    return { error: "Choose a valid user role." };
  }
  if (userId === admin.id) {
    return { error: "You cannot change your own role." };
  }

  try {
    const result = await serverPatch(
      `/user/${encodeURIComponent(userId)}/role`,
      { role }
    );

    if (result?.success !== true) {
      return { error: result?.message || "The user role was not updated." };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to update user role:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "Unable to update the user role.",
    };
  }
}

export async function deleteUser(userId) {
  const admin = await requireAdmin();

  if (typeof userId !== "string" || !userId.trim()) {
    return { error: "A valid user ID is required." };
  }
  if (userId === admin.id) {
    return { error: "You cannot delete your own account." };
  }

  try {
    const result = await serverDelete(`/users/${encodeURIComponent(userId)}`);

    if (result?.success !== true) {
      return { error: result?.message || "The user was not deleted." };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to delete user:", error);
    return {
      error: error instanceof Error ? error.message : "Unable to delete the user.",
    };
  }
}
