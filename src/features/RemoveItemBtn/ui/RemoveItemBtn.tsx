import { Button } from '@radix-ui/themes';

import { Icon } from '@/shared/ui/Icon';

import styles from './styles.module.css';

interface RemoveItemBtnProps {
	id: number;
	removeMovie: (id: number) => void;
}

export const RemoveItemBtn = ({ id, removeMovie }: RemoveItemBtnProps) => {
	const handleRemoveClick = () => {
		removeMovie(id);
	};

	return (
		<Button
			size={'2'}
			radius="full"
			aria-label="Удалить фильм из ленты"
			onClick={handleRemoveClick}
			className={styles.btn}>
			<Icon name="remove" className={styles.icon} />
		</Button>
	);
};
