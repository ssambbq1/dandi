'use client';
import React, { useEffect, useState, useRef } from "react";
import Notification from '../components/Notification';
import Sidebar from '../components/Sidebar';
import ApiKeysTable from "./ApiKeysTable";
import ApiKeyModal from "./ApiKeyModal";
import { useApiKeys, ApiKey } from "./useApiKeys";

export default function DashboardPage() {
  const {
    apiKeys,
    loading,
    error,
    fetchKeys,
    createKey,
    updateKey,
    deleteKey,
  } = useApiKeys();

  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState("");
  const [notificationColor, setNotificationColor] = useState<"green" | "red">(
    "green"
  );
  const [showKeyId, setShowKeyId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const showKeyTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchKeys();
  }, [fetchKeys]);

  const showNotify = (msg: string, color: "green" | "red" = "green") => {
    setNotification(msg);
    setNotificationColor(color);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  // Table actions
  const handleEdit = (k: ApiKey) => {
    setEditId(k.id);
    setName(k.name);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteKey(id);
    showNotify("API key deleted.", "red");
  };

  const handleCopy = async (value: string, id: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
      showNotify("API key was copied.");
    } catch {}
  };

  const handleShowKey = (id: string) => {
    if (showKeyTimeout.current) clearTimeout(showKeyTimeout.current);
    setShowKeyId(id);
    showKeyTimeout.current = setTimeout(() => setShowKeyId(null), 2000);
  };

  // Modal actions
  const handleModalSubmit = async (modalName: string) => {
    if (editId) {
      await updateKey(editId, modalName);
      showNotify("API key updated.");
    } else {
      await createKey(modalName);
      showNotify("API key created.");
    }
    setName("");
    setEditId(null);
    setModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />
      <main className="flex-1 flex justify-center items-start p-8">
        <div className="w-full max-w-5xl">
          <h1 className="text-3xl font-bold mb-8">Overview</h1>
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-semibold">API Keys</div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition-colors text-lg"
                onClick={() => {
                  setEditId(null);
                  setName("");
                  setModalOpen(true);
                }}
              >
                +
              </button>
            </div>
            <p className="text-gray-500 mb-6 text-sm">
              The key is used to authenticate your requests. You can create, view, copy, edit, or delete your API keys here.
            </p>
            <ApiKeysTable
              apiKeys={apiKeys}
              loading={loading}
              error={error}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onCopy={handleCopy}
              showKeyId={showKeyId}
              onShowKey={handleShowKey}
              copiedId={copiedId}
            />
          </div>
          <ApiKeyModal
            open={modalOpen}
            onClose={() => {
              setModalOpen(false);
              setEditId(null);
              setName("");
            }}
            onSubmit={handleModalSubmit}
            name={name}
            setName={setName}
            loading={loading}
            editId={editId}
          />
          <Notification
            message={notification}
            show={showNotification}
            color={notificationColor}
          />
        </div>
      </main>
    </div>
  );
} 