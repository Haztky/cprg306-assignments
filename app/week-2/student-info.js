import Link from "next/link";
export default function StudentInfo() {
  return (
    <header>
      <p className="text-white">Prince Martinez</p>
      <Link href="https://github.com/Haztky?tab=repositories" target="_blank" className="text-white">
        GitHub repository
      </Link>
    </header>
  );
}
