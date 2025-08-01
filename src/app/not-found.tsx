import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
	return (
		<div className="font-sans h-dvh items-center justify-center flex">
			<main className="flex flex-col gap-6 items-center ">
				<p className="text-4xl font-medium">Page not found</p>
				<Button asChild>
					<Link href="/">
						<p>Go back</p>
					</Link>
				</Button>
			</main>
		</div>
	);
}
