"use client";

import { useState } from "react";

const generateId = () => Math.random().toString(36).substring(2, 9);

export function NameComponent({ name, setName }) {
  return (
    <div className="mb-4 mr-2">
      <label htmlFor="name" className="block text-white mb-2">
        Name:
      </label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item name"
        className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
        required
      />
    </div>
  );
}

export function CategoryComponent({ category, setCategory }) {
  return (
    <div className="mb-4 mr-2">
      <label htmlFor="category" className="block text-white mb-2">
        Category:
      </label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 text-white"
      >
        <option value="produce">Produce</option>
        <option value="dairy">Dairy</option>
        <option value="bakery">Bakery</option>
        <option value="meat">Meat</option>
        <option value="frozen foods">Frozen foods</option>
        <option value="canned goods">Canned goods</option>
        <option value="dry foods">Dry foods</option>
        <option value="beverages">Beverages</option>
        <option value="snacks">Snacks</option>
        <option value="household">Household</option>
        <option value="other">Other</option>
      </select>
    </div>
  );
}

export default function NewItem({ onAddItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("produce");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const item = {
      id: generateId(),
      name,
      quantity,
      category,
    };

    onAddItem(item);

    setName("");
    setQuantity(1);
    setCategory("produce");
  };

  const increment = () => setQuantity((prev) => Math.min(prev + 1, 20));
  const decrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

  return (
    <div className="flex items-center justify-center mb-4">
      <form
        onSubmit={handleSubmit}
        className="flex space-x-4 bg-gray-900 bg-opacity-80 p-4 rounded-lg shadow-lg"
      >
        <NameComponent name={name} setName={setName} />
        <CategoryComponent category={category} setCategory={setCategory} />
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-white mb-2">
            Quantity:
          </label>
          <div className="flex items-center">
            <button
              type="button"
              onClick={decrement}
              disabled={quantity === 1}
              className={`bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded ${
                quantity === 1 ? "bg-gray-400 hover:bg-gray-400" : ""
              }`}
            >
              -
            </button>
            <input
              id="quantity"
              type="number"
              value={quantity}
              readOnly
              className="w-20 text-center bg-gray-700 text-white p-2 rounded mx-2"
            />
            <button
              type="button"
              onClick={increment}
              disabled={quantity === 20}
              className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded ${
                quantity === 20 ? "bg-gray-400 hover:bg-gray-400" : ""
              }`}
            >
              +
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-2 px-9 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105"
        >
          Add Item(s)
        </button>
      </form>
    </div>
  );
}
