function Navbar() {
  return (
    <div className="w-full h-16 bg-primary border-b border-gray-800 flex items-center justify-between px-6">

      <h1 className="text-xl font-bold text-accent">
        Omni-Gen
      </h1>

      <div className="flex gap-6 text-sm text-gray-300">
        <span>Plant: Alpha Line</span>
        <span>Batch: B-204</span>
        <span className="text-success">System Stable</span>
      </div>

    </div>
  )
}

export default Navbar