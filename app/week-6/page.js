import ItemList from "./item-list";

export default function Page() {
  return (
    <main className="p-4 bg-zinc-950">
      <h1 className="text-4xl p-4 font-bold text-center text-transparent bg-clip-text bg-gray-200 rounded-lg">
        Shopping List
      </h1>
      <ItemList />
    </main>
  );
}