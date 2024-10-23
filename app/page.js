import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-black min-h-screen p-4">
      <h1 className="text-2xl font-bold text-white mb-4">
        CPRG 306: Web Development 2 - Assignments
      </h1>
      <ul className="list-none p-0">
        <li className="mb-2">
          <Link
            href="/week-2"
            className="text-white font-semibold hover:text-red-500 transition-colors"
          >
            Week 2
          </Link>
        </li>
        <li className="mb-2">
          <Link
            href="/week-3"
            className="text-white font-semibold hover:text-red-500 transition-colors"
          >
            Week 3
          </Link>
        </li>
        <li className="mb-2">
          <Link
            href="/week-4"
            className="text-white font-semibold hover:text-red-500 transition-colors"
          >
            Week 4
          </Link>
        </li>
        <li className="mb-2">
          <Link
            href="/week-5"
            className="text-white font-semibold hover:text-red-500 transition-colors"
          >
            Week 5
          </Link>
        </li>
        <li className="mb-2">
          <Link
            href="/week-6"
            className="text-white font-semibold hover:text-red-500 transition-colors"
          >
            Week 6
          </Link>
        </li>
      </ul>
    </div>
  );
}
