import Image from "next/image";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
} from "@/components/ui/sidebar";

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarHeader />
			<SidebarContent>
				<SidebarGroup className="flex justify-center text-center">
					<p className="font-bold">
						Cardboard
						<br /> incorporated
					</p>
				</SidebarGroup>
				<SidebarGroup className="aspect-square scale-80">
					<Image
						fill
						src="/cardboard.png"
						className="object-cover"
						alt="cardboard"
					/>
				</SidebarGroup>
				<SidebarGroup />
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
}
