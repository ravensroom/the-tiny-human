import Link from "next/link";

export function Navbar() {
	return (
		<div className="fixed top-0 inset-x-0 h-fit z-[10] py-10 px-[150px] flex items-center backdrop-blur-sm">
			<Link
				href="/"
				className="bg-black text-white px-5 font-bold hover:cursor-pointer"
			>
				TTH
			</Link>

			<div className="h-full w-full flex items-center justify-end gap-4 text-[#555555] text-sm font-medium">
				<Link href="/">Home</Link>
				<Link href="/collections">Collections</Link>
			</div>
		</div>
	);
}
