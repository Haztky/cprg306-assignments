export default function Item({ name, quantity, category }) {
  return (
    <li className="p-4 mb-2 bg-gradient-to-r from-blue-500 to-indigo-900 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold text-white">{name}</h2>
      <p className="text-white">
        Buy <span className="font-bold underline">{quantity}</span> in{" "}
        <span className="italic">{category}</span>
      </p>
    </li>
  );
}
