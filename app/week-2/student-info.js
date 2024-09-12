import Link from "next/link";
export default function StudentInfo() {
  return (
    <header>
      <p>Prince Martinez</p>
      <Link href="https://github.com/Haztky?tab=repositories" target="_blank">
        GitHub repository
      </Link>
    </header>
  );
}
