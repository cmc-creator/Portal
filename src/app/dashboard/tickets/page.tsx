import { mockTickets } from "@/lib/data";
import type { SupportTicket } from "@/types";

function priorityBadge(priority: SupportTicket["priority"]) {
  switch (priority) {
    case "urgent":
      return "bg-rose-600/20 text-rose-400 border-rose-500/30";
    case "high":
      return "bg-orange-600/20 text-orange-400 border-orange-500/30";
    case "medium":
      return "bg-amber-600/20 text-amber-400 border-amber-500/30";
    default:
      return "bg-gray-700/50 text-gray-400 border-gray-600/30";
  }
}

function statusBadge(status: SupportTicket["status"]) {
  switch (status) {
    case "open":
      return "bg-indigo-600/20 text-indigo-400 border-indigo-500/30";
    case "in-progress":
      return "bg-blue-600/20 text-blue-400 border-blue-500/30";
    case "resolved":
      return "bg-emerald-600/20 text-emerald-400 border-emerald-500/30";
    default:
      return "bg-gray-700/50 text-gray-400 border-gray-600/30";
  }
}

function statusDot(status: SupportTicket["status"]) {
  switch (status) {
    case "open":
      return "bg-indigo-400";
    case "in-progress":
      return "bg-blue-400 animate-pulse";
    case "resolved":
      return "bg-emerald-400";
    default:
      return "bg-gray-500";
  }
}

export default function TicketsPage() {
  const open = mockTickets.filter((t) => t.status === "open").length;
  const inProgress = mockTickets.filter((t) => t.status === "in-progress").length;
  const resolved = mockTickets.filter((t) => t.status === "resolved" || t.status === "closed").length;

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Open", value: open, color: "text-indigo-400" },
          { label: "In Progress", value: inProgress, color: "text-blue-400" },
          { label: "Resolved", value: resolved, color: "text-emerald-400" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center">
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
            <p className="text-gray-400 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Tickets */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
          <h3 className="text-white font-semibold text-sm">All Tickets</h3>
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 px-3 py-1.5 rounded-lg transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Ticket
          </button>
        </div>
        <div className="divide-y divide-gray-800">
          {mockTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="px-6 py-4 hover:bg-gray-800/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className={`w-2 h-2 rounded-full mt-2 shrink-0 ${statusDot(ticket.status)}`} />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-white text-sm font-medium">{ticket.subject}</p>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full border ${priorityBadge(ticket.priority)}`}
                      >
                        {ticket.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-gray-500 text-xs font-mono">{ticket.id}</span>
                      <span className="text-gray-700 text-xs">·</span>
                      <span className="text-gray-500 text-xs">{ticket.category}</span>
                      <span className="text-gray-700 text-xs">·</span>
                      <span className="text-gray-500 text-xs">Updated {ticket.updatedDate}</span>
                    </div>
                  </div>
                </div>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full border shrink-0 ${statusBadge(ticket.status)}`}
                >
                  {ticket.status.replace("-", " ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Haven note */}
      <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <span className="text-xl shrink-0">🏠</span>
          <div>
            <p className="text-indigo-300 text-sm font-medium">Powered by Haven Support</p>
            <p className="text-gray-400 text-xs mt-0.5">
              Support tickets are managed through the Haven integration. Our team typically responds within 4 business hours. For urgent issues, call{" "}
              <span className="text-indigo-400">+1 (800) NYX-HELP</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
