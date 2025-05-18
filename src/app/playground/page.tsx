"use client";
import React, { useState } from "react";
import Notification from "../components/Notification";
import { useRouter } from "next/navigation";

export default function PlaygroundPage() {
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const [notificationColor, setNotificationColor] = useState<'green' | 'red'>("green");
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setShowNotification(false);
    try {
      const res = await fetch("/api/protected", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: apiKey }),
      });
      const data = await res.json();
      if (data.valid) {
        setNotification("valid api key, /protected can be accessed");
        setNotificationColor("green");
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
          router.push("/protected");
        }, 2000);
      } else {
        setNotification("invalid api key");
        setNotificationColor("red");
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000);
      }
    } catch {
      setNotification("invalid api key");
      setNotificationColor("red");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fafc]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold mb-2">API Playground</h2>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold">API Key</span>
          <input
            type="text"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            className="border rounded px-3 py-2 text-base"
            placeholder="Enter your API key"
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition-colors text-lg disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Validating..." : "Submit"}
        </button>
      </form>
      <Notification
        message={notification}
        show={showNotification}
        color={notificationColor}
      />
    </div>
  );
} 