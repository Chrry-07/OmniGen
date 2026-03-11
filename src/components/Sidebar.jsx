function Sidebar() {
  return (
    <div className="w-64 bg-primary min-h-[calc(100vh-64px)] border-r border-gray-800 p-6">

      <h2 className="text-gold font-semibold mb-6">
        Control Panel
      </h2>

      <ul className="space-y-4 text-gray-300">

        <li className="hover:text-accent cursor-pointer">
          Dashboard
        </li>

        <li className="hover:text-accent cursor-pointer">
          Optimization Engine
        </li>

        <li className="hover:text-accent cursor-pointer">
          Golden Signature
        </li>

        <li className="hover:text-accent cursor-pointer">
          Batch History
        </li>

        <li className="hover:text-accent cursor-pointer">
          Carbon Analytics
        </li>

      </ul>

    </div>
  )
}

export default Sidebar