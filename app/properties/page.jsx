import Link from "next/link";

const PropertiesPage = () => {
  return (
    <div>
      <h1 className="text-3xl">Properties</h1>
      <Link href="/">Go Home</Link>
      <div>
        <Link href="/properties/123?name=bill">
          Go to dynamic Client rendered page
        </Link>
      </div>
    </div>
  );
};
export default PropertiesPage;
