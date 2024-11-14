import RunPageSpeedTest from "@/app/analysis/collect-data/RunPageSpeedTest";


export default async function TbtPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Collect Data</h1>
      <RunPageSpeedTest />
    </div>
  )
};