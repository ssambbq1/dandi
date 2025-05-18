import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  name: string;
  setName: (name: string) => void;
  loading: boolean;
  editId: string | null;
}

const ApiKeyModal: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  name,
  setName,
  loading,
  editId,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative animate-fade-in">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-2">
          {editId ? "Edit API key" : "Create a new API key"}
        </h2>
        <p className="mb-6 text-gray-500">
          Enter a name and limit for the new API key.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(name);
          }}
          className="flex flex-col gap-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Key Name</label>
            <input
              className="w-full border rounded px-3 py-2 text-base"
              placeholder="Key Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              title="Key Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Key Type <span className="text-gray-400">— Choose the environment for this key</span></label>
            <div className="flex gap-2 items-center mt-2">
              <input type="radio" checked readOnly className="accent-blue-600" title="Development" />
              <span className="font-semibold">Development</span>
              <span className="text-xs text-gray-400 ml-2">Rate limited to 100 requests/minute</span>
            </div>
            <div className="flex gap-2 items-center mt-2 opacity-50 cursor-not-allowed">
              <input type="radio" disabled className="accent-blue-600" title="Production" />
              <span className="font-semibold">Production</span>
              <span className="text-xs text-gray-400 ml-2">Rate limited to 1,000 requests/minute</span>
            </div>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-1">
              <input type="checkbox" disabled className="accent-blue-600" title="Limit monthly usage" />
              Limit monthly usage*
            </label>
            <input
              className="w-full border rounded px-3 py-2 text-base bg-gray-100"
              placeholder="1000"
              disabled
              title="Monthly usage limit"
            />
            <div className="text-xs text-gray-400 mt-1">* If the combined usage of all your keys exceeds your plan&apos;s limit, all requests will be rejected.</div>
          </div>
          <div className="flex gap-2 justify-end mt-4">
            <button
              type="button"
              className="px-4 py-2 rounded font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded font-semibold bg-blue-600 text-white hover:bg-blue-700"
              disabled={loading}
            >
              {editId ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApiKeyModal; 