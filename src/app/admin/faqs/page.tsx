"use client";

import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  query,
  where,
  serverTimestamp,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type FAQ = {
  id: string;
  question: string;
  answer: string;
  status: string;
};

export default function AdminFAQPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState("draft");
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [filter, setFilter] = useState("all");

  const [editId, setEditId] = useState<string | null>(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");

  // 🔥 REAL-TIME FETCH
  useEffect(() => {
    let q;

    if (filter === "all") {
      q = collection(db, "faqs");
    } else {
      q = query(
        collection(db, "faqs"),
        where("status", "==", filter)
      );
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<FAQ, "id">),
      }));

      setFaqs(data);
    });

    return () => unsubscribe();
  }, [filter]);

  // ➕ ADD FAQ
  const handleAddFAQ = async () => {
    if (!question || !answer) return alert("Fill all fields");

    await addDoc(collection(db, "faqs"), {
      question,
      answer,
      status,
      createdAt: serverTimestamp(),
    });

    setQuestion("");
    setAnswer("");
    setStatus("draft");
  };

  // 🗑 DELETE
  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "faqs", id));
  };

  // 🔄 TOGGLE STATUS
  const toggleStatus = async (faq: FAQ) => {
    const newStatus =
      faq.status === "published" ? "draft" : "published";

    await updateDoc(doc(db, "faqs", faq.id), {
      status: newStatus,
    });
  };

  // ✏️ START EDIT
  const handleEdit = (faq: FAQ) => {
    setEditId(faq.id);
    setEditQuestion(faq.question);
    setEditAnswer(faq.answer);
  };

  // 💾 SAVE EDIT
  const handleUpdate = async () => {
    if (!editId) return;

    await updateDoc(doc(db, "faqs", editId), {
      question: editQuestion,
      answer: editAnswer,
    });

    setEditId(null);
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Manage FAQs</h1>

      {/* ➕ ADD FORM */}
      <div className="bg-white p-4 rounded-2xl shadow space-y-4">
        <Input
          placeholder="Enter question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <Textarea
          placeholder="Enter answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <select
          className="border rounded p-2 w-full"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>

        <Button onClick={handleAddFAQ} className="w-full">
          Add FAQ
        </Button>
      </div>

      {/* 🔍 FILTER */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "draft" ? "default" : "outline"}
          onClick={() => setFilter("draft")}
        >
          Draft
        </Button>
        <Button
          variant={filter === "published" ? "default" : "outline"}
          onClick={() => setFilter("published")}
        >
          Published
        </Button>
      </div>

      {/* 📋 LIST */}
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="p-4 bg-white rounded-xl shadow space-y-2"
          >
            {editId === faq.id ? (
              <>
                <Input
                  value={editQuestion}
                  onChange={(e) =>
                    setEditQuestion(e.target.value)
                  }
                />
                <Textarea
                  value={editAnswer}
                  onChange={(e) =>
                    setEditAnswer(e.target.value)
                  }
                />
                <div className="flex gap-2">
                  <Button onClick={handleUpdate}>
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditId(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-semibold">
                  {faq.question}
                </h3>

                <p className="text-gray-600">
                  {faq.answer}
                </p>

                <span
                  className={`text-sm ${
                    faq.status === "published"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {faq.status}
                </span>

                {/* 🔥 ACTION BUTTONS */}
                <div className="flex gap-2 flex-wrap pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(faq)}
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(faq.id)}
                  >
                    Delete
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => toggleStatus(faq)}
                  >
                    {faq.status === "published"
                      ? "Make Draft"
                      : "Publish"}
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}