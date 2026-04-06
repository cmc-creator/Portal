import { mockLicenses } from "@/lib/data";
import type { License } from "@/types";

function statusBadge(status: License["status"]) {
  switch (status) {
    case "active":
      return "bg-emerald-600/20 text-emerald-400 border-emerald-500/30";
    case "trial":
      return "bg-amber-600/20 text-amber-400 border-amber-500/30";
    case "expired":
      return "bg-rose-600/20 text-rose-400 border-rose-500/30";
    default:
      return "bg-gray-700/50 text-gray-400 border-gray-600/30";
  }
}

function seatUsageColor(used: number, total: number) {
  const pct = used / total;
  if (pct >= 0.9) return "bg-rose-500";
  if (pct >= 0.7) return "bg-amber-500";
  return "bg-emerald-500";
}

function maskKey(key: string) {
  const parts = key.split("-");
  return parts
    .map((p, i) => (i > 2 ? "••••" : p))
    .join("-");
}

export default function LicensesPage() {
  const active = mockLicenses.filter((l) => l.status === "active").length;
  const trial = mockLicenses.filter((l) => l.status === "trial").length;

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-sm">Active Licenses</p>
          <p className="text-3xl font-bold text-emerald-400 mt-1">{active}</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-sm">Trial Licenses</p>
          <p className="text-3xl font-bold text-amber-400 mt-1">{trial}</p>
        </div>
        <div className="col-span-2 sm:col-span-1 bg-gray-900 border border-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-sm">Total Products</p>
          <p className="text-3xl font-bold text-indigo-400 mt-1">{mockLicenses.length}</p>
        </div>
      </div>

      {/* License cards */}
      <div className="space-y-4">
        {mockLicenses.map((license) => (
          <div
            key={license.id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-5"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-semibold">{license.product}</h3>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusBadge(license.status)}`}
                  >
                    {license.status}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-0.5">{license.plan} Plan</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-gray-500 text-xs">Expires</p>
                <p className="text-gray-300 text-sm font-medium">
                  {new Date(license.expiresDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Seat usage */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                <span>Seat usage</span>
                <span>
                  {license.usedSeats} / {license.seats} seats
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${seatUsageColor(license.usedSeats, license.seats)}`}
                  style={{ width: `${(license.usedSeats / license.seats) * 100}%` }}
                />
              </div>
            </div>

            {/* License key */}
            <div className="flex items-center justify-between gap-3 bg-gray-800 rounded-lg px-4 py-2.5">
              <p className="text-gray-500 text-xs">License Key</p>
              <code className="text-indigo-400 text-xs font-mono tracking-wider">
                {maskKey(license.licenseKey)}
              </code>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-300 transition-colors text-xs"
              >
                Copy
              </button>
            </div>

            {license.status === "trial" && (
              <div className="mt-3 bg-amber-600/10 border border-amber-500/20 rounded-lg px-4 py-2.5">
                <p className="text-amber-300 text-xs font-medium">
                  Trial expires {license.expiresDate}. Upgrade to continue using {license.product}.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact for licensing */}
      <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
          <div>
            <p className="text-indigo-300 text-sm font-medium">Need more seats or a new license?</p>
            <p className="text-gray-400 text-xs mt-0.5">
              Contact your account manager or email{" "}
              <span className="text-indigo-400">licensing@nyxcollective.io</span> to upgrade your plan, add seats, or purchase additional NyxCollective products.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
