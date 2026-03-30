"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

import { toast } from "sonner";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [prevCount, setPrevCount] = useState(0);
  const [ratings, setRatings] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);

  // 🔄 APPOINTMENTS REAL-TIME
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "appointments"),
      (snapshot) => {
        const data: any[] = [];
        snapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });

        if (data.length > prevCount && prevCount !== 0) {
          toast.success("New appointment 🚀");
        }

        setPrevCount(data.length);
        setAppointments(data);
      }
    );

    return () => unsubscribe();
  }, [prevCount]);

  // 🔄 BLOGS
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        const data: any[] = [];
        snapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setBlogs(data);
      }
    );

    return () => unsubscribe();
  }, []);

  // 🔄 RATINGS
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "ratings"),
      (snapshot) => {
        const data: any[] = [];
        snapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setRatings(data);
      }
    );

    return () => unsubscribe();
  }, []);

  // 📊 APPOINTMENT STATS
  const total = appointments.length;
  const pending = appointments.filter(
    (a) => !a.status || a.status === "pending"
  ).length;
  const approved = appointments.filter(
    (a) => a.status === "approved"
  ).length;
  const completed = appointments.filter(
    (a) => a.status === "completed"
  ).length;

  // 📊 BLOG STATS
  const totalBlogs = blogs.length;
  const publishedBlogs = blogs.filter(
    (b) => b.status === "published"
  ).length;
  const unpublishedBlogs = totalBlogs - publishedBlogs;

  // 📊 RATINGS
  const totalRatings = ratings.length;

  const avgRating =
    totalRatings === 0
      ? 0
      : (
          ratings.reduce(
            (acc, r) => acc + Number(r.rating || 0),
            0
          ) / totalRatings
        ).toFixed(1);

  const starCount = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: ratings.filter(
      (r) => Number(r.rating) === star
    ).length,
  }));

  const approvedRatings = ratings.filter(
    (r) =>
      r.status === "approved" ||
      r.approved === true ||
      r.approved === "true"
  ).length;

  const pendingRatings = totalRatings - approvedRatings;

  // 📈 CHART DATA
  const grouped: any = {};
  appointments.forEach((item) => {
    const date = item.date;
    if (!grouped[date]) grouped[date] = 0;
    grouped[date]++;
  });

  const chartData = Object.keys(grouped).map((date) => ({
    date,
    count: grouped[date],
  }));

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-6">

      {/* ========================= */}
      {/* 📅 APPOINTMENT SECTION */}
      {/* ========================= */}
      <h3 className="text-base sm:text-lg font-semibold bg-blue-100 px-3 py-2 rounded-md">
        Appointment Overview
      </h3>

      <div className="bg-white p-3 sm:p-4 rounded-xl border shadow-sm space-y-4">

        {/* STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard title="Total" value={total} />
          <StatCard title="Pending" value={pending} color="yellow" />
          <StatCard title="Approved" value={approved} color="green" />
          <StatCard title="Completed" value={completed} color="blue" />
        </div>

        {/* CHART */}
        <div className="overflow-x-auto">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* ========================= */}
      {/* 📝 BLOG SECTION */}
      {/* ========================= */}
      <h2 className="text-base sm:text-lg font-semibold bg-blue-100 px-3 py-2 rounded-md">
        Blogs Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <StatCard title="Total Blogs" value={totalBlogs} />
        <StatCard title="Published" value={publishedBlogs} color="green" />
        <StatCard title="Unpublished" value={unpublishedBlogs} color="red" />
      </div>

      {/* ========================= */}
      {/* ⭐ RATINGS SECTION */}
      {/* ========================= */}
      <h2 className="text-base sm:text-lg font-semibold bg-blue-100 px-3 py-2 rounded-md">
        Ratings Overview
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard title="Total" value={totalRatings} />
        <StatCard title="Average" value={`⭐ ${avgRating}`} color="yellow" />
        <StatCard title="Approved" value={approvedRatings} color="green" />
        <StatCard title="Pending" value={pendingRatings} color="red" />
      </div>

      {/* ⭐ STAR BREAKDOWN */}
      <div className="bg-white p-3 sm:p-4 rounded-xl border shadow-sm">
        <h3 className="text-sm font-medium mb-3">
          Rating Breakdown
        </h3>

        {starCount.map((s) => (
          <div key={s.star} className="flex items-center gap-2 mb-2">
            <span className="w-5 text-xs sm:text-sm">
              {s.star}★
            </span>

            <div className="flex-1 bg-gray-200 h-2 rounded-full">
              <div
                className="bg-yellow-400 h-2 rounded-full"
                style={{
                  width:
                    totalRatings === 0
                      ? "0%"
                      : `${(s.count / totalRatings) * 100}%`,
                }}
              />
            </div>

            <span className="text-xs text-gray-500">
              {s.count}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}

/* ========================= */
/* 🔹 REUSABLE CARD */
/* ========================= */
function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: any;
  color?: string;
}) {
  const colors: any = {
    yellow: "bg-yellow-50 text-yellow-600",
    green: "bg-green-50 text-green-600",
    blue: "bg-blue-50 text-blue-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div
      className={`p-3 sm:p-4 rounded-xl border shadow-sm bg-white ${
        color ? colors[color] : ""
      }`}
    >
      <p className="text-xs opacity-70">{title}</p>
      <p className="text-base sm:text-lg font-semibold">
        {value}
      </p>
    </div>
  );
}