import { Callout } from '@radix-ui/themes';

import { Icon } from '@/shared/ui/Icon';

import styles from './styles.module.css';

interface ErrorMessage {
	error: string;
}

export const ErrorMessage = ({ error }: ErrorMessage) => {
	return (
		<Callout.Root color="red" data-testid="ErrorMessage">
			<Callout.Icon>
				<Icon name="attention" className={styles.icon} />
			</Callout.Icon>
			<Callout.Text>{error}. Попробуйте обновить страницу</Callout.Text>
		</Callout.Root>
	);
};
