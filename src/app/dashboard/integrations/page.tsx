import { mockIntegrations } from "@/lib/data";
import type { Integration } from "@/types";

function statusBadge(status: Integration["status"]) {
  switch (status) {
    case "connected":
      return "bg-emerald-600/20 text-emerald-400 border-emerald-500/30";
    case "pending":
      return "bg-amber-600/20 text-amber-400 border-amber-500/30";
    default:
      return "bg-gray-700/50 text-gray-400 border-gray-600/30";
  }
}

function statusDot(status: Integration["status"]) {
  switch (status) {
    case "connected":
      return "bg-emerald-400";
    case "pending":
      return "bg-amber-400 animate-pulse";
    default:
      return "bg-gray-500";
  }
}

const productColors: Record<Integration["product"], string> = {
  aegis: "from-indigo-600/20 to-indigo-800/10 border-indigo-500/20",
  ledger: "from-emerald-600/20 to-emerald-800/10 border-emerald-500/20",
  scribe: "from-violet-600/20 to-violet-800/10 border-violet-500/20",
  haven: "from-sky-600/20 to-sky-800/10 border-sky-500/20",
  forge: "from-orange-600/20 to-orange-800/10 border-orange-500/20",
};

export default function IntegrationsPage() {
  const connected = mockIntegrations.filter((i) => i.status === "connected").length;
  const total = mockIntegrations.length;

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header info */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold">NyxCollective Suite</h3>
            <p className="text-gray-400 text-sm mt-1">
              Your portal connects to the full NyxCollective product suite for a seamless client experience.
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-emerald-400">{connected}</p>
            <p className="text-gray-500 text-xs">of {total} connected</p>
          </div>
        </div>
        {/* Connection bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-800 rounded-full h-1.5">
            <div
              className="bg-emerald-500 h-1.5 rounded-full"
              style={{ width: `${(connected / total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Integration cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockIntegrations.map((integration) => (
          <div
            key={integration.id}
            className={`bg-gradient-to-br ${productColors[integration.product]} border rounded-xl p-5`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-3xl">{integration.icon}</div>
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${statusDot(integration.status)}`} />
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusBadge(integration.status)}`}
                >
                  {integration.status}
                </span>
              </div>
            </div>
            <h4 className="text-white font-semibold text-sm">{integration.name}</h4>
            <p className="text-gray-400 text-xs mt-1.5 leading-relaxed">{integration.description}</p>
            <div className="mt-4">
              {integration.status === "connected" ? (
                <button
                  type="button"
                  className="text-xs font-medium text-gray-400 hover:text-gray-200 bg-gray-800/80 hover:bg-gray-700 border border-gray-700 px-3 py-1.5 rounded-lg transition-all"
                >
                  Manage
                </button>
              ) : (
                <button
                  type="button"
                  className="text-xs font-medium text-indigo-400 hover:text-indigo-300 bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 px-3 py-1.5 rounded-lg transition-all"
                >
                  Connect
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Suite overview */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">About the NyxCollective Suite</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          {[
            { icon: "🛡️", name: "Aegis", desc: "Security, SSO, and identity management" },
            { icon: "📒", name: "Ledger", desc: "Billing, invoicing, and financial operations" },
            { icon: "✍️", name: "Scribe", desc: "Document management and e-signatures" },
            { icon: "🏠", name: "Haven", desc: "Customer support and help desk" },
            { icon: "⚒️", name: "Forge", desc: "Project management and collaboration" },
          ].map(({ icon, name, desc }) => (
            <div key={name} className="flex items-start gap-3">
              <span className="text-lg">{icon}</span>
              <div>
                <p className="text-white font-medium">{name}</p>
                <p className="text-gray-400 text-xs mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
