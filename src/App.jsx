import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import MetricCard from "./components/MetricCard"
import EnergyChart from "./components/EnergyChart"
import CarbonChart from "./components/CarbonChart"
import GoldenSignatureChart from "./components/GoldenSignatureChart"

function App() {

  return (
    <div className="bg-background min-h-screen">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 p-10 text-white">

          {/* PAGE TITLE */}

          <h1 className="text-3xl font-bold mb-4">
            Optimization Dashboard
          </h1>

          <p className="text-gray-400 mb-10">
            Real-time manufacturing optimization across Energy,
            Yield, Quality, and Carbon targets using the Omni-Gen
            Golden Signature Optimization Engine.
          </p>


          {/* METRIC CARDS */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <MetricCard
              title="Energy Consumption"
              value="512"
              unit="kWh"
              color="text-accent"
            />

            <MetricCard
              title="Batch Yield"
              value="92"
              unit="%"
              color="text-success"
            />

            <MetricCard
              title="Carbon Emissions"
              value="1.7"
              unit="tCO₂"
              color="text-alert"
            />

            <MetricCard
              title="Quality Score"
              value="95"
              unit="%"
              color="text-gold"
            />

          </div>


          {/* CHART SECTION */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">

            <div className="bg-primary p-6 rounded-xl border border-gray-800">
              <h2 className="text-lg font-semibold mb-3">
                Energy Trend
              </h2>

              <div className="h-60 flex items-center justify-center">
                <EnergyChart />
              </div>
            </div>


            <div className="bg-primary p-6 rounded-xl border border-gray-800">
              <h2 className="text-lg font-semibold mb-3">
                Carbon Analytics
              </h2>

              <div className="h-60 flex items-center justify-center">
                <CarbonChart />
              </div>
            </div>

          </div>


          {/* BATCH TABLE */}

          <div className="bg-primary p-6 rounded-xl border border-gray-800 mt-12">

            <h2 className="text-lg font-semibold mb-6">
              Recent Batch Performance
            </h2>

            <table className="w-full text-left">

              <thead className="text-gray-400 text-sm">
                <tr>
                  <th className="pb-3">Batch</th>
                  <th className="pb-3">Energy</th>
                  <th className="pb-3">Yield</th>
                  <th className="pb-3">Carbon</th>
                  <th className="pb-3">Quality</th>
                </tr>
              </thead>

              <tbody className="text-sm">

                <tr className="border-t border-gray-800">
                  <td className="py-3">B-204</td>
                  <td>512 kWh</td>
                  <td className="text-success">92%</td>
                  <td className="text-alert">1.7 tCO₂</td>
                  <td className="text-gold">95%</td>
                </tr>

                <tr className="border-t border-gray-800">
                  <td className="py-3">B-203</td>
                  <td>520 kWh</td>
                  <td className="text-success">91%</td>
                  <td className="text-alert">1.9 tCO₂</td>
                  <td className="text-gold">94%</td>
                </tr>

              </tbody>

            </table>

          </div>


          {/* GOLDEN SIGNATURE */}

          <div className="bg-primary p-8 rounded-xl border border-gray-800 mt-12">

            <h2 className="text-lg font-semibold mb-6">
              Golden Signature Optimization
            </h2>

            <div className="flex justify-center items-center">
              <div className="w-[650px] h-[420px]">
                <GoldenSignatureChart />
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default App