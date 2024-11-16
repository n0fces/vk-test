import { Callout } from '@radix-ui/themes';

import { Icon } from '@/shared/ui/Icon';

import styles from './styles.module.css';

interface ErrorMessage {
	error: string;
	className?: string;
}

export const ErrorMessage = ({ error, className }: ErrorMessage) => {
	return (
		<Callout.Root color="red" data-testid="ErrorMessage" className={className}>
			<Callout.Icon>
				<Icon name="attention" className={styles.icon} />
			</Callout.Icon>
			<Callout.Text>{error}. Попробуйте обновить страницу</Callout.Text>
		</Callout.Root>
	);
};
