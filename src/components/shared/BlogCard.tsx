"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

export default function BlogCard({ blog }: any) {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/blog/${blog.id}`)}
      className="rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer"
    >
      <img
        src={blog.image || "/default-blog.jpg"}
        alt={blog.title}
        className="rounded-t-2xl h-48 w-full object-cover"
      />

      <CardContent className="p-4">
        <h2 className="text-xl font-semibold">{blog.title}</h2>
        <p className="text-gray-600 mt-2 line-clamp-2">
          {blog.description}
        </p>
      </CardContent>
    </Card>
  );
}