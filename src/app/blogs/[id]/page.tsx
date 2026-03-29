"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";

export default function BlogDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [blog, setBlog] = useState<any>(null);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, "blogs", id as string);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          setBlog(snap.data());
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    const fetchAllBlogs = async () => {
      try {
        const q = query(
          collection(db, "blogs"),
          where("status", "==", "published"),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
      fetchAllBlogs();
    }
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!blog) return <p className="p-6">Blog not found ❌</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">


      <header className="sticky top-0 z-50 bg-white border-b">
  <div className="max-w-6xl mx-auto px-4 py-3 flex items-center">
    
    {/* Logo */}
    <div>
      <span className="text-green-600 font-semibold text-lg">Tathagat</span>
      <span className="text-blue-600 ml-1 font-semibold text-lg">Pharma</span>
    </div>

  </div>
</header>

      {/* Title */}
      <h1 className="text-3xl font-bold text-green-600">
        {blog.title}
      </h1>

      {/* Date */}
      <p className="text-gray-400 text-sm mt-2">
        {blog.createdAt?.toDate?.().toLocaleDateString() || "Recent"}
      </p>

      {/* Content */}
      <div className="mt-6 text-gray-700 leading-relaxed whitespace-pre-line">
        {blog.content}
      </div>

      {/* ========================= */}
      {/* 🔥 MORE BLOGS SECTION */}
      {/* ========================= */}
      <div className="mt-16">
        <h2 className="text-xl font-bold mb-4">More Health Blogs</h2>

        <div className="space-y-4">
          {blogs
            .filter((b) => b.id !== id) // remove current blog
            .map((b) => (
              <div
                key={b.id}
                onClick={() => router.push(`/blogs/${b.id}`)}
                className="cursor-pointer border p-4 rounded hover:shadow transition"
              >
                <h3 className="font-semibold text-gray-900">
                  {b.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {b.content}
                </p>
              </div>
            ))}
        </div>
      </div>

    </div>
  );
}