import { mockProjects } from "@/lib/data";
import type { Milestone, Project } from "@/types";

function statusColor(status: string) {
  switch (status) {
    case "active":
      return "bg-indigo-600/20 text-indigo-400 border-indigo-500/30";
    case "completed":
      return "bg-emerald-600/20 text-emerald-400 border-emerald-500/30";
    case "paused":
    case "on-hold":
      return "bg-amber-600/20 text-amber-400 border-amber-500/30";
    default:
      return "bg-gray-700/50 text-gray-400 border-gray-600/30";
  }
}

function milestoneStatusIcon(status: Milestone["status"]) {
  switch (status) {
    case "completed":
      return (
        <span className="w-5 h-5 rounded-full bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
          <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      );
    case "in-progress":
      return (
        <span className="w-5 h-5 rounded-full bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center shrink-0">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
        </span>
      );
    default:
      return (
        <span className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center shrink-0" />
      );
  }
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-800">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-white font-semibold text-base">{project.name}</h3>
            <p className="text-gray-400 text-sm mt-1">{project.description}</p>
          </div>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border shrink-0 ${statusColor(project.status)}`}>
            {project.status}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-indigo-500 h-2 rounded-full transition-all"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        <p className="text-gray-500 text-xs mt-3">
          Due:{" "}
          <span className="text-gray-400">
            {new Date(project.dueDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </p>
      </div>

      {/* Milestones */}
      <div className="px-6 py-4">
        <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-3">Milestones</p>
        <div className="space-y-2.5">
          {project.milestones.map((ms) => (
            <div key={ms.id} className="flex items-center gap-3">
              {milestoneStatusIcon(ms.status)}
              <div className="flex-1 flex items-center justify-between gap-2 min-w-0">
                <span
                  className={`text-sm truncate ${
                    ms.status === "completed" ? "text-gray-500 line-through" : "text-gray-300"
                  }`}
                >
                  {ms.title}
                </span>
                <span className="text-gray-600 text-xs shrink-0">{ms.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const active = mockProjects.filter((p) => p.status === "active");
  const completed = mockProjects.filter((p) => p.status === "completed");

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <p className="text-gray-400 text-sm">
          {active.length} active · {completed.length} completed
        </p>
      </div>

      {active.length > 0 && (
        <section>
          <h2 className="text-white font-semibold text-base mb-4">Active Projects</h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {active.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}

      {completed.length > 0 && (
        <section>
          <h2 className="text-white font-semibold text-base mb-4">Completed</h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {completed.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
