import { Loader2Icon } from "lucide-react";

export default function Loader() {
	return (
		<div className="flex min-h-[60vh] items-center justify-center">
			<Loader2Icon className="h-8 w-8 animate-spin text-primary" />
		</div>
	);
}
