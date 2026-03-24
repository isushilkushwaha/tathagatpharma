"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

import { toast } from "sonner";

import { Card } from "@/components/ui/card";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Calendar,
  CheckCircle,
  Clock,
  Activity,
} from "lucide-react";

export default function DashboardPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [prevCount, setPrevCount] = useState(0);
  const [ratings, setRatings] = useState<any[]>([]);


  // 🔄 REAL-TIME
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

  // 📊 STATS
  const total = appointments.length;
  const pending = appointments.filter(a => !a.status || a.status === "pending").length;
  const approved = appointments.filter(a => a.status === "approved").length;
  const completed = appointments.filter(a => a.status === "completed").length;
  const [blogs, setBlogs] = useState<any[]>([]);


  const totalBlogs = blogs.length;

const publishedBlogs = blogs.filter(
  (b) => b.status === "published"
).length;

const unpublishedBlogs = totalBlogs - publishedBlogs;



 const totalRatings = ratings.length;

  // ⭐ Average Rating
  const avgRating =
    totalRatings === 0
      ? 0
      : (
          ratings.reduce((acc, r) => acc + Number(r.rating || 0), 0) /
          totalRatings
        ).toFixed(1);

  // ⭐ Star Breakdown
  const starCount = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: ratings.filter((r) => Number(r.rating) === star).length,
  }));

  // ✅ Approved / ⏳ Pending
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
    <div className="p-6 space-y-8">

      
      
      {/* 📈 CHART + SUMMARY CARDS */}
       <h3 className="text-lg font-semibold bg-blue-100">
    Appointment Overviwe
  </h3>

<div className="bg-white p-5 rounded-xl border shadow-sm space-y-5">

 
  {/* 🔢 POINT-WISE SUMMARY */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

    <div className="bg-gray-50 rounded-lg p-3 text-sm">
      <p className="text-gray-500 text-xs">Total Appointments</p>
      <p className="font-semibold text-lg">{total}</p>
    </div>

    <div className="bg-yellow-50 rounded-lg p-3 text-sm">
      <p className="text-yellow-600 text-xs">Pending Appointments</p>
      <p className="font-semibold text-lg">{pending}</p>
    </div>

    <div className="bg-green-50 rounded-lg p-3 text-sm">
      <p className="text-green-600 text-xs">Approved Appointments</p>
      <p className="font-semibold text-lg">{approved}</p>
    </div>

    <div className="bg-blue-50 rounded-lg p-3 text-sm">
      <p className="text-blue-600 text-xs">Completed Appointments</p>
      <p className="font-semibold text-lg">{completed}</p>
    </div>

  </div>

  {/* 📊 CHART */}
  <ResponsiveContainer width="100%" height={250} className="bg-accent">
    <LineChart data={chartData}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="count"
        strokeWidth={2}
      />
    </LineChart>
  </ResponsiveContainer>

</div>

      {/* ========================= */}
{/* 📊 BLOG ANALYTICS */}
{/* ========================= */}
<div className="space-y-6">

  <h2 className="text-lg font-semibold bg-blue-100 px-3 py-1 rounded-md">
    Blogs Overview
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

    {/* Total Blogs */}
    <div className="bg-white p-4 rounded-xl border shadow-sm">
      <p className="text-xs text-gray-500">Total Blogs</p>
      <p className="text-lg font-semibold">{totalBlogs}</p>
    </div>

    {/* Published */}
    <div className="bg-green-50 p-4 rounded-xl border shadow-sm">
      <p className="text-xs text-green-600">Published Blogs</p>
      <p className="text-lg font-semibold">{publishedBlogs}</p>
    </div>

    {/* Unpublished */}
    <div className="bg-red-50 p-4 rounded-xl border shadow-sm">
      <p className="text-xs text-red-600">Unpublished Blogs</p>
      <p className="text-lg font-semibold">{unpublishedBlogs}</p>
    </div>

  </div>

<div className="space-y-6">

      {/* ========================= */}
      {/* ⭐ HEADER */}
      {/* ========================= */}
      <h2 className="text-lg font-semibold bg-blue-100 px-3 py-1 rounded-md">
        Ratings Overview
      </h2>

      {/* ========================= */}
      {/* 📦 TOP CARDS */}
      {/* ========================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {/* Total */}
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-xs text-gray-500">Total Ratings</p>
          <p className="text-lg font-semibold">{totalRatings}</p>
        </div>

        {/* Average */}
        <div className="bg-yellow-50 p-4 rounded-xl border shadow-sm">
          <p className="text-xs text-yellow-600">Average Rating</p>
          <p className="text-lg font-semibold">⭐ {avgRating}</p>
        </div>

        {/* Approved */}
        <div className="bg-green-50 p-4 rounded-xl border shadow-sm">
          <p className="text-xs text-green-600">Approved</p>
          <p className="text-lg font-semibold">{approvedRatings}</p>
        </div>

        {/* Pending */}
        <div className="bg-red-50 p-4 rounded-xl border shadow-sm">
          <p className="text-xs text-red-600">Pending</p>
          <p className="text-lg font-semibold">{pendingRatings}</p>
        </div>

      </div>

      {/* ========================= */}
      {/* ⭐ STAR BREAKDOWN */}
      {/* ========================= */}
      <div className="bg-white p-4 rounded-xl border shadow-sm">
        <h3 className="text-sm font-medium mb-3">
          Rating Breakdown
        </h3>

        {starCount.map((s) => (
          <div key={s.star} className="flex items-center gap-3 mb-2">

            {/* Star */}
            <span className="w-6 text-sm">{s.star}★</span>

            {/* Progress */}
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

            {/* Count */}
            <span className="text-xs text-gray-500">
              {s.count}
            </span>

          </div>
        ))}
      </div>

    </div>


</div>
    </div>
  );
}