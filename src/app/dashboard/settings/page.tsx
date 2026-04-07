import { brandConfig } from "@/lib/data";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      {/* White-label branding */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <h3 className="text-white font-semibold">Branding & White-Label</h3>
          <p className="text-gray-400 text-sm mt-0.5">
            Customize the portal appearance to match your brand.
          </p>
        </div>
        <div className="p-6 space-y-5">
          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Company Name
            </label>
            <input
              type="text"
              defaultValue={brandConfig.companyName}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
            />
          </div>

          {/* Logo URL */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Logo URL
            </label>
            <div className="flex gap-3">
              <input
                type="url"
                placeholder="https://yourcompany.com/logo.png"
                className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
              />
              <button
                type="button"
                className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-300 text-sm transition-all shrink-0"
              >
                Upload
              </button>
            </div>
          </div>

          {/* Colors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Primary Color", value: brandConfig.primaryColor },
              { label: "Secondary Color", value: brandConfig.secondaryColor },
              { label: "Accent Color", value: brandConfig.accentColor },
            ].map(({ label, value }) => (
              <div key={label}>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  {label}
                </label>
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-md border border-gray-600 shrink-0"
                    style={{ backgroundColor: value }}
                  />
                  <input
                    type="text"
                    defaultValue={value}
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Domain */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Custom Domain
            </label>
            <input
              type="text"
              defaultValue={brandConfig.domain}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm font-mono"
            />
            <p className="text-gray-500 text-xs mt-1.5">
              Point your CNAME to <code className="text-indigo-400">portal.nyxcollective.io</code>
            </p>
          </div>

          <button
            type="button"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg shadow-indigo-600/20"
          >
            Save Branding
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <h3 className="text-white font-semibold">Notifications</h3>
          <p className="text-gray-400 text-sm mt-0.5">Choose what email notifications you receive.</p>
        </div>
        <div className="p-6 space-y-4">
          {[
            { label: "New invoice issued", desc: "Receive an email when a new invoice is created" },
            { label: "Invoice overdue reminder", desc: "Get notified when an invoice becomes overdue" },
            { label: "Document ready to sign", desc: "Receive an email when a document requires your signature" },
            { label: "Support ticket updates", desc: "Get notified when your ticket status changes" },
            { label: "Project milestone reached", desc: "Be notified when a project milestone is completed" },
          ].map(({ label, desc }) => (
            <div key={label} className="flex items-start justify-between gap-4">
              <div>
                <p className="text-gray-200 text-sm font-medium">{label}</p>
                <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked="true"
                className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Support contact */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <h3 className="text-white font-semibold">Support Contact</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Support Email
            </label>
            <input
              type="email"
              defaultValue={brandConfig.supportEmail}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
            />
          </div>
          <button
            type="button"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg shadow-indigo-600/20"
          >
            Save Settings
          </button>
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-gray-900 border border-rose-500/20 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-rose-500/10">
          <h3 className="text-rose-400 font-semibold">Danger Zone</h3>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-gray-200 text-sm font-medium">Reset portal to defaults</p>
              <p className="text-gray-500 text-xs mt-0.5">
                This will reset all branding and settings to the default NyxPortal configuration.
              </p>
            </div>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-rose-400 hover:text-rose-300 bg-rose-600/10 hover:bg-rose-600/20 border border-rose-500/20 rounded-lg transition-all shrink-0"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
