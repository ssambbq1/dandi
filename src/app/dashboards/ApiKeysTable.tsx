import React from "react";
import { FiEye, FiCopy, FiEdit2, FiTrash2 } from "react-icons/fi";
import { ApiKey } from "./useApiKeys";

interface Props {
  apiKeys: ApiKey[];
  loading: boolean;
  error: string | null;
  onEdit: (key: ApiKey) => void;
  onDelete: (id: string) => void;
  onCopy: (value: string, id: string) => void;
  showKeyId: string | null;
  onShowKey: (id: string) => void;
  copiedId: string | null;
}

const ApiKeysTable: React.FC<Props> = ({
  apiKeys,
  loading,
  error,
  onEdit,
  onDelete,
  onCopy,
  showKeyId,
  onShowKey,
  copiedId,
}) => (
  <div className="overflow-x-auto">
    {error && <div className="text-red-500 mb-4">{error}</div>}
    <table className="w-full text-left border-separate border-spacing-y-2">
      <thead>
        <tr className="text-gray-500 text-xs uppercase">
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Type</th>
          <th className="px-4 py-2">Usage</th>
          <th className="px-4 py-2">Key</th>
          <th className="px-4 py-2">Options</th>
        </tr>
      </thead>
      <tbody>
        {apiKeys.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center text-gray-400 py-8">
              No API keys found.
            </td>
          </tr>
        ) : (
          apiKeys.map((k) => (
            <tr key={k.id} className="bg-gray-50 rounded-xl shadow-sm">
              <td className="px-4 py-3 font-medium text-base">{k.name}</td>
              <td className="px-4 py-3">
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                  dev
                </span>
              </td>
              <td className="px-4 py-3">{k.usage ?? 0}</td>
              <td className="px-4 py-3 font-mono">
                <span className="inline-block align-middle">
                  {showKeyId === k.id
                    ? k.value
                    : `${k.value.slice(0, 6)}**********`}
                </span>
              </td>
              <td className="px-4 py-3 flex gap-2 items-center">
                <button
                  title="Show/Hide"
                  className="hover:bg-gray-200 p-2 rounded"
                  onClick={() => onShowKey(k.id)}
                >
                  <FiEye size={20} />
                </button>
                <button
                  title="Copy"
                  className="hover:bg-gray-200 p-2 rounded relative"
                  onClick={() => onCopy(k.value, k.id)}
                >
                  <FiCopy size={20} />
                  {copiedId === k.id && (
                    <span className="absolute left-2/3 -translate-x-1/3 -top-5 text-xs bg-black text-white min-w-[110px] h-7 flex items-center justify-center rounded-full shadow px-2">
                      API key was copied.
                    </span>
                  )}
                </button>
                <button
                  title="Edit"
                  className="hover:bg-gray-200 p-2 rounded"
                  onClick={() => onEdit(k)}
                  disabled={loading}
                >
                  <FiEdit2 size={20} />
                </button>
                <button
                  title="Delete"
                  className="hover:bg-red-100 p-2 rounded"
                  onClick={() => onDelete(k.id)}
                  disabled={loading}
                >
                  <FiTrash2 size={20} />
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default ApiKeysTable; 