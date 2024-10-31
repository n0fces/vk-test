import { SVGProps } from 'react';

import { stringWithDelimiter } from '../../helpers/stringWithDelimiter/stringWithDelimiter';
import styles from './styles.module.css';
import { IconName } from './types';

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
	name: IconName;
}

export const Icon = ({ name, className, ...props }: IconProps) => {
	return (
		<svg
			aria-hidden
			className={
				stringWithDelimiter(' ', [styles.icon, className]) ?? undefined
			}
			focusable="false"
			{...props}>
			<use xlinkHref={`/sprite.svg#${name}`} />
		</svg>
	);
};
