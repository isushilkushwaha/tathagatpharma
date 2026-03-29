
"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";

import ViewAppointmentButton from "@/components/ViewAppointmentButton";
import ApproveButton from "@/components/ApproveButton";

export default function Page() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // 🔒 Disable body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // 🔍 Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // 🚀 Fetch (LATEST ENTRY FIRST using Firestore)
  const fetchAppointments = async () => {
    try {
      const q = query(
        collection(db, "appointments"),
        orderBy("createdAt", "desc") // ✅ latest entry first
      );

      const querySnapshot = await getDocs(q);
      const data: any[] = [];

      querySnapshot.forEach((docItem) => {
        data.push({ id: docItem.id, ...docItem.data() });
      });

      // ⚠️ fallback (if old data has no createdAt)
      data.sort((a, b) => {
        const timeA =
          a.createdAt?.seconds || new Date(a.date).getTime();
        const timeB =
          b.createdAt?.seconds || new Date(b.date).getTime();
        return timeB - timeA;
      });

      setAppointments(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // ❌ Delete (instant UI)
  const handleDelete = async (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
    await deleteDoc(doc(db, "appointments", id));
  };

  // ✅ Complete (instant UI)
  const handleComplete = async (item: any) => {
    if (item.status !== "approved") return;

    setAppointments((prev) =>
      prev.map((a) =>
        a.id === item.id ? { ...a, status: "completed" } : a
      )
    );

    await updateDoc(doc(db, "appointments", item.id), {
      status: "completed",
    });
  };

  // 🔍 Filter
  const filteredAppointments = appointments.filter((item) => {
    const matchName = item.name
      ?.toLowerCase()
      .includes(debouncedSearch.toLowerCase());

    const matchStatus = status ? item.status === status : true;
    const matchFrom = fromDate ? item.date >= fromDate : true;
    const matchTo = toDate ? item.date <= toDate : true;

    return matchName && matchStatus && matchFrom && matchTo;
  });

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">

      {/* HEADER */}
      <div className="shrink-0 p-4 sm:p-6 border-b bg-white sticky top-0 z-20">
        <h1 className="text-lg sm:text-2xl font-semibold">
          Appointments
        </h1>
      </div>

      {/* FILTERS */}
      <div className="shrink-0 p-3 sm:p-4 border-b bg-white flex flex-col sm:flex-row gap-3 overflow-x-auto">

        <input
          type="text"
          placeholder="Search name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border rounded-md text-sm w-full sm:w-auto"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2 border rounded-md text-sm w-full sm:w-auto"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="completed">Completed</option>
        </select>

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="px-3 py-2 border rounded-md text-sm w-full sm:w-auto"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="px-3 py-2 border rounded-md text-sm w-full sm:w-auto"
        />

        <button
          onClick={() => {
            setSearch("");
            setStatus("");
            setFromDate("");
            setToDate("");
          }}
          className="bg-gray-200 px-3 py-2 rounded-md text-sm w-full sm:w-auto"
        >
          Clear
        </button>
      </div>

      {/* LIST */}
      <div className="flex-1 overflow-hidden p-3 sm:p-4">
        <div className="h-full bg-white rounded-xl border shadow flex flex-col">

          <div className="flex-1 overflow-y-auto">

            {loading ? (
              <p className="p-6">Loading...</p>
            ) : filteredAppointments.length === 0 ? (
              <p className="p-6 text-center text-gray-500">
                No appointments found
              </p>
            ) : (
              <>
                {/* DESKTOP */}
                <div className="hidden md:block">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <th className="px-6 py-4 text-left">Name</th>
                        <th className="px-6 py-4 text-left">Phone</th>
                        <th className="px-6 py-4 text-left">Date</th>
                        <th className="px-6 py-4 text-left">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y">
                      {filteredAppointments.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4">{item.name}</td>
                          <td className="px-6 py-4">{item.phone}</td>
                          <td className="px-6 py-4">{item.date}</td>

                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs rounded ${
                              item.status === "approved"
                                ? "bg-green-100 text-green-700"
                                : item.status === "completed"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}>
                              {item.status}
                            </span>
                          </td>

                          <td className="px-6 py-4 text-right flex gap-2 justify-end">
                            <ApproveButton item={item} onSuccess={fetchAppointments} />

                            <button
                              disabled={item.status !== "approved"}
                              onClick={() => handleComplete(item)}
                              className={`px-2 py-1 text-xs rounded ${
                                item.status === "completed"
                                  ? "bg-gray-300"
                                  : item.status !== "approved"
                                  ? "bg-gray-200"
                                  : "bg-blue-500 text-white"
                              }`}
                            >
                              {item.status === "completed" ? "Completed" : "Done"}
                            </button>

                            <ViewAppointmentButton data={item} />

                            <button
                              onClick={() => handleDelete(item.id)}
                              className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* MOBILE */}
                <div className="md:hidden space-y-3">
                  {filteredAppointments.map((item) => (
                    <div key={item.id} className="p-4 border rounded-xl space-y-2">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.phone}</p>
                        </div>

                        <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                          {item.status}
                        </span>
                      </div>

                      <p className="text-sm">📅 {item.date}</p>

                      <div className="flex gap-2 flex-wrap">
                        <ApproveButton item={item} onSuccess={fetchAppointments} />

                        <button
                          disabled={item.status !== "approved"}
                          onClick={() => handleComplete(item)}
                          className="flex-1 px-3 py-2 bg-blue-500 text-white rounded"
                        >
                          {item.status === "completed" ? "Completed" : "Done"}
                        </button>

                        <ViewAppointmentButton data={item} />

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="flex-1 px-3 py-2 bg-red-500 text-white rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}