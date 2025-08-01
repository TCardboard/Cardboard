import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Home() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="flex flex-1 flex-col p-4">
				<div className="relative aspect-square size-[250px]"></div>
			</main>
		</SidebarProvider>
	);
}
