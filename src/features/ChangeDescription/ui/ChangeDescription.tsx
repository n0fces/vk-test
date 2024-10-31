import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import { Icon } from '@/shared/ui/Icon';

import styles from './styles.module.css';

interface ChangeDescriptionProps {
	id: number;
	description: string;
	changeDescriptionMovie: (id: number, description: string) => void;
}

export const ChangeDescription = observer(
	({ id, description, changeDescriptionMovie }: ChangeDescriptionProps) => {
		const [text, setText] = useState(description);

		const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			setText(event.target.value);
		};

		const handleSave = () => {
			changeDescriptionMovie(id, text);
		};

		return (
			<Dialog.Root>
				<Dialog.Trigger>
					<Button
						className={styles.btn}
						aria-label="Предложите свое описание для фильма">
						<Icon name="change" className={styles.icon} />
					</Button>
				</Dialog.Trigger>

				<Dialog.Content maxWidth="450px">
					<Dialog.Title>Новое описание фильма</Dialog.Title>
					<Dialog.Description size="2" mb="4">
						Измените описание для текущего фильма.
					</Dialog.Description>

					{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
					<label>
						<Text as="div" size="2" mb="1" weight="bold">
							Описание
						</Text>
						<TextField.Root
							value={text}
							placeholder="Введите новое описание"
							onChange={(event) => {
								handleTextChange(event);
							}}
						/>
					</label>

					<Flex gap="3" mt="4" justify="end">
						<Dialog.Close>
							<Button variant="soft" color="gray">
								Cancel
							</Button>
						</Dialog.Close>
						<Dialog.Close>
							<Button onClick={handleSave} disabled={!text}>
								Save
							</Button>
						</Dialog.Close>
					</Flex>
				</Dialog.Content>
			</Dialog.Root>
		);
	},
);
