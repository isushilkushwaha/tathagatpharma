"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

export default function BlogSection() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(
          collection(db, "blogs"),
          where("status", "==", "published"),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => {
          const d = doc.data();
          return {
            id: doc.id,
            title: d.title,
            description: d.content,
            createdAt: d.createdAt,
          };
        });

        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-lg  font-semibold text-gray-900 sm:text-5xl">
            Health Blogs 
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Learn health tips, awareness, and medical guidance.
          </p>
        </div>

        {/* 🔥 Horizontal Scroll Blogs */}
        <div className="mt-10 flex gap-6 overflow-x-auto pb-4">

          {blogs.length === 0 ? (
            <p className="text-gray-500">No blogs available</p>
          ) : (
            blogs.map((blog) => (
              <div
                key={blog.id}
                onClick={() => router.push(`/blogs/${blog.id}`)}
                className="min-w-[300px] cursor-pointer border rounded-lg p-4 hover:shadow-md transition flex flex-col justify-between"
              >

                {/* Date */}
                <p className="text-xs text-gray-500">
                  {blog.createdAt?.toDate?.().toDateString() || "Recent"}
                </p>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mt-2">
                  {blog.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                  {blog.description}
                </p>

                {/* Footer */}
                <div className="mt-4 text-sm">
                  <p className="font-semibold text-gray-900">
                    Tathagat Pharma
                  </p>
                  <p className="text-gray-600">Health Team</p>
                </div>

                {/* Read More */}
                <p className="text-green-600 mt-2 text-sm font-medium">
                  Read More →
                </p>

              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
}