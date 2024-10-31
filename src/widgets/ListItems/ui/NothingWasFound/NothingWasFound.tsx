import { Callout } from '@radix-ui/themes';

import { Icon } from '@/shared/ui/Icon';

import styles from './styles.module.css';

export const NothingWasFound = () => {
	return (
		<Callout.Root>
			<Callout.Icon>
				<Icon name="attention" className={styles.icon} />
			</Callout.Icon>
			<Callout.Text>По таким параметрам ничего не найдено :-(</Callout.Text>
		</Callout.Root>
	);
};
