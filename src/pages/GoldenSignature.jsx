import GoldenSignatureChart from "../components/GoldenSignatureChart"

function GoldenSignature() {

  return (
    <div className="p-10 text-white">

      <h1 className="text-3xl font-bold mb-6">
        Golden Signature Optimization
      </h1>

      <p className="text-gray-400 mb-10">
        The Golden Signature represents the optimal multi-objective
        operating envelope balancing energy efficiency, yield,
        product quality, carbon emissions, and throughput.
      </p>

      <div className="bg-primary p-6 rounded-xl border border-gray-800">

        <GoldenSignatureChart />

      </div>

    </div>
  )
}

export default GoldenSignature