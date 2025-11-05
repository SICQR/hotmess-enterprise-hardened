import { useRouter } from "next/router";
export default function AgeCheck() {
  const r = useRouter();
  return (
    <div className="p-8 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">18+ Age Verification</h1>
      <button
        onClick={() => {
          document.cookie = "hotmess_age_ok=1; path=/; max-age=31536000";
          r.push("/");
        }}
        className="px-4 py-2 bg-white text-black font-bold rounded"
      >
        I confirm I am 18+
      </button>
    </div>
  );
}
