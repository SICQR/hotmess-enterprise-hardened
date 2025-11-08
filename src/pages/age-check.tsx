export default function AgeCheck() {
  const handleConfirm = () => {
    document.cookie = "hotmess_age_ok=1; path=/; max-age=31536000";
    window.location.href = "/";
  };
  
  return (
    <div className="p-8 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">18+ Age Verification</h1>
      <button 
        onClick={handleConfirm}
        className="px-4 py-2 bg-white text-black font-bold rounded"
      >
        I confirm I am 18+
      </button>
    </div>
  );
}
