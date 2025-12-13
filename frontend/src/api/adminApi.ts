const BASE_URL = "http://localhost:8080/administrator";

export const adminApi = {
  // GET ALL
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/getAll`);
    if (!res.ok) throw new Error("Failed to fetch admins");
    return res.json();
  },

  // CREATE
  create: async (admin: any) => {
    const res = await fetch(`${BASE_URL}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(admin),
    });

    if (!res.ok) throw new Error("Failed to create admin");
    return res.json();
  },

  // UPDATE
  update: async (id: number, admin: any) => {
    const res = await fetch(`${BASE_URL}/update?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(admin),
    });

    if (!res.ok) throw new Error("Failed to update admin");
    return res.json();
  },

  // DELETE
  delete: async (id: number) => {
    const res = await fetch(`${BASE_URL}/delete/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete admin");
  },
};
