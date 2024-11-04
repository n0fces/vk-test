import { ImgHTMLAttributes } from 'react';

type ImgAttrs = ImgHTMLAttributes<HTMLImageElement>;

interface ImageProps
	extends Omit<ImgAttrs, 'src' | 'alt' | 'width' | 'height'> {
	src?: string | null;
	alt?: string | null;
	width: number | string;
	height: number | string;
}

export const Image = ({ src, alt, width, height, ...props }: ImageProps) => {
	return src ? (
		<img
			src={src}
			alt={alt ?? 'Неизвестное фото'}
			width={width}
			height={height}
			loading="lazy"
			{...props}
		/>
	) : (
		<div style={{ width, height, backgroundColor: '#ccc' }}></div>
	);
};
