export default function BestSellingStoreSection() {
	return (
		<div className="mt-4">
			<h2 className="mb-6 font-bold text-2xl tracking-tight">
				Best Selling Stores
			</h2>
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				<div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-muted shadow-sm lg:aspect-auto lg:h-full">
					<div className="flex h-full w-full items-center justify-center bg-linear-to-br from-muted to-muted/50">
						<span className="font-medium text-muted-foreground">
							Promotion Image
						</span>
					</div>
				</div>
				<div className="lg:col-span-2">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
		<div className="group flex flex-col gap-5 rounded-2xl border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:ring-1 hover:ring-primary/10">
			{/* Upper */}
			<div className="flex items-center gap-4">
				<div className="h-14 w-14 shrink-0 rounded-full bg-muted ring-1 ring-border transition-transform duration-300 group-hover:scale-105" />
				<div className="min-w-0 flex-1">
					<div className="truncate font-bold text-foreground text-lg transition-colors group-hover:text-primary">
						Shop Name
					</div>
					<div className="truncate text-muted-foreground text-sm italic">
						"some catchy bio here"
					</div>
				</div>
			</div>
			{/* Lower */}
			<div className="grid grid-cols-3 gap-3">
				{[1, 2, 3].map((i) => (
					<div key={i} className="flex flex-col items-center gap-2">
						<div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted transition-transform duration-300 group-hover:scale-[1.03]">
							<div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground uppercase tracking-widest">
								Product
							</div>
						</div>
						<div className="font-semibold text-primary text-sm">$99.00</div>
					</div>
				))}
			</div>
		</div>
	);
}
