type ButtonProps = {
  text: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
};

export default function Button({ text, onClick, variant = "primary"}: ButtonProps){
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-semibold transition ${
        variant === "primary"
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {text}
    </button>
  )
}