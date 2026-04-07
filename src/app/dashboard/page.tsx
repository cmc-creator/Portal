import Link from "next/link";
import { mockProjects, mockInvoices, mockTickets, mockUser } from "@/lib/data";

function StatCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string | number;
  sub: string;
  color: string;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <p className="text-gray-400 text-sm font-medium">{label}</p>
      <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
      <p className="text-gray-500 text-xs mt-1">{sub}</p>
    </div>
  );
}

export default function DashboardPage() {
  const activeProjects = mockProjects.filter((p) => p.status === "active").length;
  const unpaidInvoices = mockInvoices.filter((i) => i.status === "unpaid" || i.status === "overdue");
  const unpaidTotal = unpaidInvoices.reduce((sum, i) => sum + i.amount, 0);
  const openTickets = mockTickets.filter((t) => t.status === "open" || t.status === "in-progress").length;

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-indigo-600/20 to-violet-600/10 border border-indigo-500/20 rounded-2xl p-6">
        <p className="text-indigo-400 text-sm font-medium mb-1">Welcome back 👋</p>
        <h2 className="text-white text-2xl font-bold">{mockUser.name}</h2>
        <p className="text-gray-400 text-sm mt-1">{mockUser.company}</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Active Projects"
          value={activeProjects}
          sub="in progress"
          color="text-indigo-400"
        />
        <StatCard
          label="Outstanding"
          value={`$${unpaidTotal.toLocaleString()}`}
          sub={`${unpaidInvoices.length} invoice${unpaidInvoices.length !== 1 ? "s" : ""}`}
          color="text-amber-400"
        />
        <StatCard
          label="Open Tickets"
          value={openTickets}
          sub="awaiting response"
          color="text-rose-400"
        />
        <StatCard
          label="Documents"
          value={3}
          sub="pending signature"
          color="text-emerald-400"
        />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
            <h3 className="text-white font-semibold text-sm">Recent Projects</h3>
            <Link
              href="/dashboard/projects"
              className="text-indigo-400 hover:text-indigo-300 text-xs transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="divide-y divide-gray-800">
            {mockProjects.slice(0, 3).map((project) => (
              <div key={project.id} className="px-5 py-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm font-medium">{project.name}</span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      project.status === "active"
                        ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                        : project.status === "completed"
                          ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-gray-700/50 text-gray-400 border border-gray-600/30"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5">
                  <div
                    className="bg-indigo-500 h-1.5 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <p className="text-gray-500 text-xs mt-1.5">{project.progress}% complete</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
            <h3 className="text-white font-semibold text-sm">Recent Invoices</h3>
            <Link
              href="/dashboard/invoices"
              className="text-indigo-400 hover:text-indigo-300 text-xs transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="divide-y divide-gray-800">
            {mockInvoices.slice(0, 4).map((invoice) => (
              <div key={invoice.id} className="px-5 py-3.5 flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-medium">{invoice.number}</p>
                  <p className="text-gray-500 text-xs mt-0.5">Due {invoice.dueDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm font-semibold">
                    ${invoice.amount.toLocaleString()}
                  </p>
                  <span
                    className={`text-xs font-medium ${
                      invoice.status === "paid"
                        ? "text-emerald-400"
                        : invoice.status === "overdue"
                          ? "text-rose-400"
                          : "text-amber-400"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="text-white font-semibold text-sm mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard/tickets"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 rounded-lg text-indigo-400 text-sm font-medium transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Support Ticket
          </Link>
          <Link
            href="/dashboard/invoices"
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-300 text-sm font-medium transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Invoice
          </Link>
          <Link
            href="/dashboard/documents"
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-300 text-sm font-medium transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Sign Document
          </Link>
        </div>
      </div>
    </div>
  );
}
