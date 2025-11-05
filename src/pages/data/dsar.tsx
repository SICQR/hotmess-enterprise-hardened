export default function DSAR() {
  return (
    <main className="p-8 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Data Request</h1>
      <form action="mailto:privacy@hotmess.london" className="space-y-3">
        <input
          className="w-full p-2 bg-black border border-white"
          placeholder="Your email"
          required
        />
        <select className="w-full p-2 bg-black border border-white">
          <option value="export">Export Data</option>
          <option value="delete">Delete Data</option>
        </select>
        <button className="p-2 bg-white text-black font-bold">Submit</button>
      </form>
      <p className="text-xs opacity-70">GDPR 30 days.</p>
    </main>
  );
}
