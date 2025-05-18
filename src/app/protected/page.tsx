import React from "react";

export default function ProtectedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200">
      <h1 className="text-3xl font-bold mb-4">Protected Page</h1>
      <p className="text-lg text-gray-700">This is a protected page that can only be accessed with a valid API key.</p>
    </div>
  );
} 