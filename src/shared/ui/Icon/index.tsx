import { SVGProps } from 'react';

import { IconName } from './types';

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
	name: IconName;
}

export const Icon = ({ name, className, ...props }: IconProps) => {
	return (
		<svg aria-hidden className={className} focusable="false" {...props}>
			<use xlinkHref={`/sprite.svg#${name}`} />
		</svg>
	);
};
