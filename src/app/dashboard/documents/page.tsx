import { mockDocuments } from "@/lib/data";
import type { Document } from "@/types";

function statusBadge(status: Document["status"]) {
  switch (status) {
    case "signed":
      return "bg-emerald-600/20 text-emerald-400 border-emerald-500/30";
    case "pending":
      return "bg-amber-600/20 text-amber-400 border-amber-500/30";
    default:
      return "bg-gray-700/50 text-gray-400 border-gray-600/30";
  }
}

function typeIcon(type: Document["type"]) {
  switch (type) {
    case "contract":
      return "📄";
    case "proposal":
      return "📋";
    case "nda":
      return "🔒";
    case "report":
      return "📊";
    default:
      return "📁";
  }
}

export default function DocumentsPage() {
  const pending = mockDocuments.filter((d) => d.status === "pending");

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Pending signature alert */}
      {pending.length > 0 && (
        <div className="bg-amber-600/10 border border-amber-500/20 rounded-xl p-5">
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5 text-amber-400 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="text-amber-300 text-sm font-medium">
                {pending.length} document{pending.length !== 1 ? "s" : ""} awaiting your signature
              </p>
              <p className="text-gray-400 text-xs mt-0.5">
                Review and sign the documents below via Scribe Documents.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Documents list */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
          <h3 className="text-white font-semibold text-sm">All Documents</h3>
          <span className="text-gray-500 text-xs">{mockDocuments.length} documents</span>
        </div>
        <div className="divide-y divide-gray-800">
          {mockDocuments.map((doc) => (
            <div
              key={doc.id}
              className="px-6 py-4 flex items-center gap-4 hover:bg-gray-800/50 transition-colors"
            >
              {/* Type icon */}
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-xl shrink-0">
                {typeIcon(doc.type)}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-white text-sm font-medium">{doc.title}</p>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusBadge(doc.status)}`}
                  >
                    {doc.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-gray-500 text-xs capitalize">{doc.type}</span>
                  <span className="text-gray-700 text-xs">·</span>
                  <span className="text-gray-500 text-xs">{doc.fileSize}</span>
                  {doc.signedDate && (
                    <>
                      <span className="text-gray-700 text-xs">·</span>
                      <span className="text-gray-500 text-xs">Signed {doc.signedDate}</span>
                    </>
                  )}
                  {!doc.signedDate && (
                    <>
                      <span className="text-gray-700 text-xs">·</span>
                      <span className="text-gray-500 text-xs">Created {doc.createdDate}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Action */}
              <div className="shrink-0">
                {doc.status === "pending" ? (
                  <button
                    type="button"
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 px-3 py-1.5 rounded-lg transition-all"
                  >
                    Sign Now
                  </button>
                ) : (
                  <button
                    type="button"
                    className="text-xs font-medium text-gray-400 hover:text-gray-200 bg-gray-800 hover:bg-gray-700 border border-gray-700 px-3 py-1.5 rounded-lg transition-all"
                  >
                    Download
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scribe integration note */}
      <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <span className="text-xl shrink-0">✍️</span>
          <div>
            <p className="text-indigo-300 text-sm font-medium">Powered by Scribe Documents</p>
            <p className="text-gray-400 text-xs mt-0.5">
              E-signatures and document management are handled by the Scribe integration. Signed documents are stored securely and are legally binding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
