import { useState } from "react"

function AIPanel() {
  const [status, setStatus] = useState(null)

  const message = "⚠️ Deviation Detected in Batch B-204. Energy trending +5%."
  const recommendation =
    "Omni-Gen Suggests: Decrease reactor temperature by 2°C. Impact: -12 kWh Energy, -0.5% Yield."

  return (
    <div className="bg-primary p-6 rounded-xl border border-gray-800 shadow-lg mt-8">

      <div className="flex items-start justify-between gap-6">

        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-2">AI Insights & Actions</h3>
          <p className="text-gray-300 mb-4">AI is actively monitoring batches and proposing human-reviewable recommendations.</p>

          <div className="bg-[#071126] p-4 rounded-md mb-4">
            <p className="text-sm text-gray-200 italic">{message}</p>
            <p className="text-sm text-gray-400 mt-2">{recommendation}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStatus('approved')}
              className="bg-accent text-primary px-4 py-2 rounded-md font-semibold hover:opacity-90"
            >
              Approve AI Adjustment
            </button>

            <button
              onClick={() => setStatus('rejected')}
              className="bg-transparent border border-gray-700 text-gray-300 px-4 py-2 rounded-md hover:border-accent hover:text-accent"
            >
              Reject
            </button>
          </div>

          {status === 'approved' && (
            <p className="mt-4 text-success">Adjustment approved — queued for operator review.</p>
          )}

          {status === 'rejected' && (
            <p className="mt-4 text-alert">Adjustment rejected — no changes made.</p>
          )}

        </div>

        <div className="w-64 hidden lg:block text-gray-400">
          <h4 className="font-semibold mb-2">Why this matters</h4>
          <p className="text-sm">Human approval keeps the operator in control while letting the AI surface high-value adjustments.</p>
        </div>

      </div>

    </div>
  )
}

export default AIPanel
