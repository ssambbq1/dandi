import { useState, useCallback } from "react";

export interface ApiKey {
  id: string;
  value: string;
  name: string;
  usage: number;
}

export function useApiKeys() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchKeys = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/keys");
    const data = await res.json();
    if (Array.isArray(data)) {
      setApiKeys(data);
    } else {
      setApiKeys([]);
      setError(data.error || "Unknown error");
    }
    setLoading(false);
  }, []);

  const createKey = async (name: string) => {
    setLoading(true);
    await fetch("/api/keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    await fetchKeys();
  };

  const updateKey = async (id: string, name: string) => {
    setLoading(true);
    await fetch("/api/keys", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name }),
    });
    await fetchKeys();
  };

  const deleteKey = async (id: string) => {
    setLoading(true);
    await fetch("/api/keys", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await fetchKeys();
  };

  return {
    apiKeys,
    loading,
    error,
    fetchKeys,
    createKey,
    updateKey,
    deleteKey,
    setError,
  };
} 