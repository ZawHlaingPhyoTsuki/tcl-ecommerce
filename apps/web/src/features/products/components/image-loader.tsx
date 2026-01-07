import Image from "next/image";

interface ProgressiveImageProps {
	src: string;
	alt: string;
	fill: boolean;
	width?: number;
	height?: number;
	className?: string;
	sizes?: string;
}

export function ProgressiveImage({
	src,
	alt,
	fill = true,
	sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw",
	className,
}: ProgressiveImageProps) {
	return (
		<Image
			src={src}
			alt={alt}
			fill={fill}
			sizes={sizes}
			className={className}
			placeholder="blur"
			blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
		/>
	);
}
