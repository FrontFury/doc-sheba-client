"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Loader2, Search, ShieldCheck, Trash2, Users } from "lucide-react";
import { deleteUser, getUsers, updateUserRole } from "@/lib/actions/users";

const roles = ["patient", "doctor", "admin"];

const formatDate = (value) => {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-BD", { dateStyle: "medium" }).format(
    new Date(value)
  );
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [updatingUserId, setUpdatingUserId] = useState("");
  const [deletingUserId, setDeletingUserId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let isActive = true;

    getUsers()
      .then((result) => {
        if (!isActive) return;
        if (result?.error) {
          setErrorMessage(result.error);
        } else {
          setUsers(result.users);
          setCurrentUserId(result.currentUserId);
        }
      })
      .catch((error) => {
        console.error("Unable to load admin users:", error);
        if (isActive) {
          setErrorMessage("Unable to load users. Please try again.");
        }
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  const handleRoleChange = async (user, role) => {
    if (role === user.role) return;

    setUpdatingUserId(user.id);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const result = await updateUserRole(user.id, role);
      if (result?.error) {
        setErrorMessage(result.error);
        return;
      }

      setUsers((currentUsers) =>
        currentUsers.map((currentUser) =>
          currentUser.id === user.id ? { ...currentUser, role } : currentUser
        )
      );
      setSuccessMessage(`${user.name || user.email}'s role was updated.`);
    } catch (error) {
      console.error("Unable to update user role:", error);
      setErrorMessage("Unable to update this user's role. Please try again.");
    } finally {
      setUpdatingUserId("");
    }
  };

  const handleDelete = async (user) => {
    const label = user.name || user.email || "this user";
    if (!window.confirm(`Delete ${label}? This action cannot be undone.`)) {
      return;
    }

    setDeletingUserId(user.id);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const result = await deleteUser(user.id);
      if (result?.error) {
        setErrorMessage(result.error);
        return;
      }

      setUsers((currentUsers) =>
        currentUsers.filter((currentUser) => currentUser.id !== user.id)
      );
      setSuccessMessage(`${label} was deleted.`);
    } catch (error) {
      console.error("Unable to delete user:", error);
      setErrorMessage("Unable to delete this user. Please try again.");
    } finally {
      setDeletingUserId("");
    }
  };

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredUsers = users.filter((user) =>
    [user.name, user.email, user.role].some((value) =>
      value.toLowerCase().includes(normalizedSearch)
    )
  );

  return (
    <section className="mx-auto max-w-6xl space-y-6">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm font-bold text-[#0F766E] dark:text-teal-400">
            <Users className="h-4 w-4" />
            Admin management
          </div>
          <h1 className="mt-2 text-3xl font-black text-[#12343B] dark:text-slate-100">
            Users
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            View accounts and manage their access roles.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
          <Users className="h-4 w-4 text-[#0F766E] dark:text-teal-400" />
          {users.length} {users.length === 1 ? "user" : "users"}
        </div>
      </header>

      <label className="relative block max-w-md">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search name, email, or role"
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
      </label>

      {errorMessage && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
        >
          <ShieldCheck className="h-4 w-4 shrink-0" />
          {successMessage}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {isLoading ? (
          <div className="flex min-h-64 items-center justify-center gap-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
            <Loader2 className="h-5 w-5 animate-spin text-[#0F766E]" />
            Loading users…
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
            <Users className="h-8 w-8 text-slate-400" />
            <p className="mt-3 font-bold text-slate-800 dark:text-slate-100">
              {users.length ? "No matching users" : "No users found"}
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {users.length
                ? "Try another search term."
                : "There are no accounts to display yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-slate-800/70 dark:text-slate-400">
                <tr>
                  <th scope="col" className="px-5 py-4 font-extrabold">User</th>
                  <th scope="col" className="px-5 py-4 font-extrabold">Role</th>
                  <th scope="col" className="px-5 py-4 font-extrabold">Joined</th>
                  <th scope="col" className="px-5 py-4 text-right font-extrabold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredUsers.map((user) => {
                  const isBusy =
                    updatingUserId === user.id || deletingUserId === user.id;

                  return (
                    <tr key={user.id} className="text-slate-700 dark:text-slate-200">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 font-black text-[#0F766E] dark:bg-teal-950 dark:text-teal-300">
                            {(user.name || user.email || "?")[0].toUpperCase()}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate font-bold text-slate-900 dark:text-slate-100">
                              {user.name || "Unnamed user"}
                            </p>
                            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                              {user.email || "No email"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <select
                          aria-label={`Role for ${user.name || user.email || "user"}`}
                          value={roles.includes(user.role) ? user.role : "patient"}
                          onChange={(event) =>
                            handleRoleChange(user, event.target.value)
                          }
                          disabled={isBusy || user.id === currentUserId}
                          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold capitalize text-slate-700 outline-none focus:border-teal-600 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                        >
                          {roles.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-500 dark:text-slate-400">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleDelete(user)}
                          disabled={isBusy || user.id === currentUserId}
                          aria-label={`Delete ${user.name || user.email || "user"}`}
                          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
                        >
                          {deletingUserId === user.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
