export default function ShopButton() {
  return (
    <a
      href="https://www.muckas-store.com"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-semibold text-base hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
    >
      <span className="text-xl">🛒</span>
      Ver mi tienda: Muckas Store
    </a>
  );
}