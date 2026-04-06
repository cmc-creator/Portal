import { mockInvoices } from "@/lib/data";
import type { Invoice } from "@/types";

function statusBadge(status: Invoice["status"]) {
  switch (status) {
    case "paid":
      return "bg-emerald-600/20 text-emerald-400 border-emerald-500/30";
    case "unpaid":
      return "bg-amber-600/20 text-amber-400 border-amber-500/30";
    case "overdue":
      return "bg-rose-600/20 text-rose-400 border-rose-500/30";
    default:
      return "bg-gray-700/50 text-gray-400 border-gray-600/30";
  }
}

function SummaryCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <p className="text-gray-400 text-sm">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
    </div>
  );
}

export default function InvoicesPage() {
  const paid = mockInvoices.filter((i) => i.status === "paid");
  const unpaid = mockInvoices.filter((i) => i.status === "unpaid");
  const overdue = mockInvoices.filter((i) => i.status === "overdue");

  const totalPaid = paid.reduce((s, i) => s + i.amount, 0);
  const totalDue = [...unpaid, ...overdue].reduce((s, i) => s + i.amount, 0);
  const totalOverdue = overdue.reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard
          label="Amount Due"
          value={`$${totalDue.toLocaleString()}`}
          color="text-amber-400"
        />
        <SummaryCard
          label="Overdue"
          value={`$${totalOverdue.toLocaleString()}`}
          color="text-rose-400"
        />
        <SummaryCard
          label="Paid (All Time)"
          value={`$${totalPaid.toLocaleString()}`}
          color="text-emerald-400"
        />
      </div>

      {/* Invoice table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <h3 className="text-white font-semibold text-sm">All Invoices</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-800">
                <th className="px-6 py-3 text-gray-500 text-xs font-medium uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-4 py-3 text-gray-500 text-xs font-medium uppercase tracking-wider">
                  Description
                </th>
                <th className="px-4 py-3 text-gray-500 text-xs font-medium uppercase tracking-wider">
                  Issued
                </th>
                <th className="px-4 py-3 text-gray-500 text-xs font-medium uppercase tracking-wider">
                  Due
                </th>
                <th className="px-4 py-3 text-gray-500 text-xs font-medium uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-gray-500 text-xs font-medium uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-gray-500 text-xs font-medium uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {mockInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-indigo-400 font-mono text-sm">{invoice.number}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-gray-300 text-sm">{invoice.description}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-gray-400 text-sm">{invoice.issuedDate}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`text-sm ${
                        invoice.status === "overdue" ? "text-rose-400 font-medium" : "text-gray-400"
                      }`}
                    >
                      {invoice.dueDate}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-white font-semibold text-sm">
                      ${invoice.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full border ${statusBadge(invoice.status)}`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {invoice.status !== "paid" ? (
                      <button
                        type="button"
                        className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors bg-indigo-600/10 hover:bg-indigo-600/20 px-3 py-1.5 rounded-lg border border-indigo-500/20"
                      >
                        Pay Now
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="text-xs font-medium text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        Download
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment info */}
      <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-indigo-300 text-sm font-medium">Payment powered by Ledger Finance</p>
            <p className="text-gray-400 text-xs mt-0.5">
              All payments are processed securely through the NyxCollective Ledger integration. Contact{" "}
              <span className="text-indigo-400">billing@nyxcollective.io</span> for billing inquiries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
