import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex h-dvh items-center justify-center font-sans">
      <main className="flex flex-col items-center gap-6 ">
        <p className="font-medium text-4xl">Page not found</p>
        <Button asChild>
          <Link href="/">
            <p>Go back</p>
          </Link>
        </Button>
      </main>
    </div>
  );
}
