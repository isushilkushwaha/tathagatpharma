


"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const fetchBlogs = async () => {
    const q = query(
      collection(db, "blogs"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSubmit = async () => {
    if (!form.title || !form.content) {
      alert("Title & Content required");
      return;
    }

    if (editingId) {
      await updateDoc(doc(db, "blogs", editingId), {
        ...form,
        updatedAt: serverTimestamp(),
      });
    } else {
      await addDoc(collection(db, "blogs"), {
        ...form,
        status: "draft",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }

    setForm({ title: "", content: "" });
    setEditingId(null);
    fetchBlogs();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog?")) return;
    await deleteDoc(doc(db, "blogs", id));
    fetchBlogs();
  };

  const toggleStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, "blogs", id), {
      status: status === "published" ? "draft" : "published",
    });
    fetchBlogs();
  };

  const handleEdit = (blog: any) => {
    setEditingId(blog.id);
    setForm({
      title: blog.title,
      content: blog.content,
    });
  };

  const filteredBlogs = blogs.filter((blog) => {
    if (filter === "all") return true;
    return blog.status === filter;
  });

  return (
    <div className="h-screen overflow-hidden flex flex-col p-4 max-w-3xl mx-auto gap-3">

      {/* ✍️ CREATE BLOG (TOP) */}
      <div className="bg-white border rounded-xl shadow-md p-4 space-y-3">

        <h2 className="text-sm font-semibold">
          {editingId ? "Edit Blog" : "Create Blog"}
        </h2>

        <input
          placeholder="Title"
          value={form.title}
          className="w-full border p-2 rounded-lg text-sm"
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <textarea
          placeholder="Content"
          value={form.content}
          className="w-full border p-2 h-20 rounded-lg text-sm"
          onChange={(e) =>
            setForm({ ...form, content: e.target.value })
          }
        />

        <button
          onClick={handleSubmit}
          className={`w-full py-2 text-white rounded-lg ${
            editingId ? "bg-blue-600" : "bg-green-600"
          }`}
        >
          {editingId ? "Update Blog" : "Create Blog"}
        </button>
      </div>

      {/* 🔘 FILTER BUTTONS */}
      <div className="flex gap-2 justify-center flex-wrap">
        {["all", "published", "draft"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* 📋 BLOG LIST (ONLY SCROLL AREA) */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">

        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white border rounded-xl p-4 shadow-sm space-y-2"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-sm">
                {blog.title}
              </h3>

              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  blog.status === "published"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {blog.status}
              </span>
            </div>

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => handleEdit(blog)}
                className="flex-1 text-xs bg-blue-500 text-white py-1.5 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => toggleStatus(blog.id, blog.status)}
                className="flex-1 text-xs bg-yellow-500 text-white py-1.5 rounded"
              >
                {blog.status === "published"
                  ? "Unpublish"
                  : "Publish"}
              </button>

              <button
                onClick={() => handleDelete(blog.id)}
                className="flex-1 text-xs bg-red-500 text-white py-1.5 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {filteredBlogs.length === 0 && (
          <p className="text-center text-gray-500 text-sm">
            No blogs found
          </p>
        )}
      </div>

    </div>
  );
}