"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔍 Filters
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // 📄 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 🪟 Modal
  const [selected, setSelected] = useState<any>(null);

  // 🔁 Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // 📥 Fetch Data
  const fetchAppointments = async () => {
    const querySnapshot = await getDocs(collection(db, "appointments"));
    const data: any[] = [];

    querySnapshot.forEach((docItem) => {
      data.push({ id: docItem.id, ...docItem.data() });
    });

    setAppointments(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // ❌ Delete
  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "appointments", id));
    fetchAppointments();
  };

  // ✅ Status Update
  const handleStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, "appointments", id), { status });
    fetchAppointments();
  };

  // 🔎 Filter Logic
  const filteredAppointments = appointments.filter((item) => {
    const matchName = item.name
      ?.toLowerCase()
      .includes(debouncedSearch.toLowerCase());

    const matchStatus = status ? item.status === status : true;

    const matchFrom = fromDate ? item.date >= fromDate : true;
    const matchTo = toDate ? item.date <= toDate : true;

    return matchName && matchStatus && matchFrom && matchTo;
  });

  // 📄 Pagination
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  const paginatedData = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Appointments</h1>

      {/* 🔍 FILTER UI */}
      <div className="flex flex-wrap gap-3 mb-4">

        <input
          type="text"
          placeholder="Search name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border rounded-md text-sm"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2 border rounded-md text-sm"
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
          className="px-3 py-2 border rounded-md text-sm"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="px-3 py-2 border rounded-md text-sm"
        />

        <button
          onClick={() => {
            setSearch("");
            setStatus("");
            setFromDate("");
            setToDate("");
          }}
          className="bg-gray-200 px-3 py-2 rounded-md text-sm"
        >
          Clear
        </button>
      </div>

      {/* 📊 TABLE */}
      <div className="rounded-xl border bg-white p-4 shadow-sm overflow-auto">
        {loading ? (
          <p>Loading...</p>
        ) : filteredAppointments.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            No appointments found
          </p>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.date}</TableCell>

                    {/* Status */}
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          item.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : item.status === "completed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.status || "pending"}
                      </span>
                    </TableCell>

                    {/* 👁 Details */}
                    <TableCell>
                      <button
                        onClick={() => setSelected(item)}
                        className="bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-xs"
                      >
                        View
                      </button>
                    </TableCell>

                    {/* ⚙️ Actions */}
                    <TableCell className="flex gap-2">
                      <button
                        onClick={() => handleStatus(item.id, "approved")}
                        className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleStatus(item.id, "completed")}
                        className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                      >
                        Done
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* 📄 PAGINATION */}
            <div className="flex justify-between items-center mt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>

              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* 🪟 MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">

            <button
              onClick={() => setSelected(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4">
              Patient Details
            </h2>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between">
                <span className="text-gray-500">Name</span>
                <span className="font-medium">{selected.name}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Phone</span>
                <span>{selected.phone}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Date</span>
                <span>{selected.date}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span>{selected.status || "pending"}</span>
              </div>

              <div>
                <span className="text-gray-500 block mb-1">Message</span>
                <div className="bg-gray-100 p-2 rounded text-xs">
                  {selected.message || "No message"}
                </div>
              </div>

            </div>

            <div className="flex gap-2 mt-5">

              <a
                href={`https://wa.me/91${selected.phone}`}
                target="_blank"
                className="flex-1 bg-green-600 text-white text-sm py-2 rounded text-center"
              >
                WhatsApp
              </a>

              <button
                onClick={() => setSelected(null)}
                className="flex-1 bg-gray-200 text-sm py-2 rounded"
              >
                Close
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}