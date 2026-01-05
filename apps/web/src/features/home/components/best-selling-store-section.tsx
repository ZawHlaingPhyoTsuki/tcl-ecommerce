export default function BestSellingStoreSection() {
	return (
		<div className="mt-4">
			<h2 className="mb-3 font-semibold text-xl">Best Selling Store</h2>
			<div className="grid grid-cols-3 gap-3">
				<div className="col-span-1 w-full rounded-xl bg-muted">Image</div>
				<div className="col-span-2">
					<div className="grid w-full grid-cols-2 gap-2 rounded-xl">
						<BestSellingStoreCard />
						<BestSellingStoreCard />
						<BestSellingStoreCard />
						<BestSellingStoreCard />
					</div>
				</div>
			</div>
		</div>
	);
}

function BestSellingStoreCard() {
	return (
		<div className="flex flex-col gap-4 rounded-xl border-2 border-accent p-4">
			{/* Upper */}
			<div className="flex items-center gap-4">
				<div className="h-16 w-16 rounded-full bg-muted" />
				<div>
					<div className="font-semibold">Shope Name</div>
					<div>"some bio"</div>
				</div>
			</div>
			{/* Lower */}
			<div className="grid grid-cols-3 gap-2">
				<div className="flex flex-col items-center">
					<div className="h-24 w-full rounded-lg bg-muted text-center">
						Image
					</div>
					<div>Price</div>
				</div>
				<div className="flex flex-col items-center">
					<div className="h-24 w-full rounded-lg bg-muted text-center">
						Image
					</div>
					<div>Price</div>
				</div>
				<div className="flex flex-col items-center">
					<div className="h-24 w-full rounded-lg bg-muted text-center">
						Image
					</div>
					<div>Price</div>
				</div>
			</div>
		</div>
	);
}
