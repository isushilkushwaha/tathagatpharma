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
} from "firebase/firestore";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  // 📥 Fetch Blogs
  const fetchBlogs = async () => {
    const snapshot = await getDocs(collection(db, "blogs"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ➕ Create / Update Blog
  const handleSubmit = async () => {
    if (!form.title || !form.content) {
      alert("Title & Content required");
      return;
    }

    if (editingId) {
      // ✏️ Update
      await updateDoc(doc(db, "blogs", editingId), {
        ...form,
        updatedAt: serverTimestamp(),
      });
      alert("Updated ✅");
    } else {
      // ➕ Create
      await addDoc(collection(db, "blogs"), {
        ...form,
        status: "draft",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      alert("Created ✅");
    }

    // Reset
    setForm({ title: "", content: "" });
    setEditingId(null);
    fetchBlogs();
  };

  // 🗑 Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog?")) return;
    await deleteDoc(doc(db, "blogs", id));
    fetchBlogs();
  };

  // 🔄 Publish Toggle
  const toggleStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, "blogs", id), {
      status: status === "published" ? "draft" : "published",
    });
    fetchBlogs();
  };

  // ✏️ Edit Click
  const handleEdit = (blog: any) => {
    setEditingId(blog.id);
    setForm({
      title: blog.title,
      content: blog.content,
    });
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* ===================== */}
      {/* 📋 BLOG LIST */}
      {/* ===================== */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">All Blogs</h2>

        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{blog.title}</h3>
              <p className="text-sm text-gray-500">
                {blog.status}
              </p>
            </div>

            <div className="flex gap-2">

              <button
                onClick={() => handleEdit(blog)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => toggleStatus(blog.id, blog.status)}
                className="bg-yellow-500 text-amber-300  px-2 py-1 rounded"
              >
                {blog.status === "published"
                  ? "Unpublish"
                  : "Publish"}
              </button>

              <button
                onClick={() => handleDelete(blog.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* ===================== */}
      {/* ✍️ BLOG FORM */}
      {/* ===================== */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">
          {editingId ? "Edit Blog" : "Create Blog"}
        </h2>

        <input
          placeholder="Title"
          value={form.title}
          className="w-full border p-2"
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <textarea
          placeholder="Content"
          value={form.content}
          className="w-full border p-2 h-40"
          onChange={(e) =>
            setForm({ ...form, content: e.target.value })
          }
        />

        <button
          onClick={handleSubmit}
          className={`px-4 py-2 text-white rounded ${
            editingId ? "bg-blue-600" : "bg-green-600"
          }`}
        >
          {editingId ? "Update Blog" : "Create Blog"}
        </button>
      </div>

    </div>
  );
}