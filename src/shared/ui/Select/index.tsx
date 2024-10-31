import { Select as SelectUI } from '@radix-ui/themes';
import { useState } from 'react';

import { stringWithDelimiter } from '@/shared/helpers/stringWithDelimiter/stringWithDelimiter';

import styles from './styles.module.css';

interface SelectProps {
	className?: string;
	options: { value: string; label: string }[];
	defaultValue: string;
	callback: (value: string) => void;
}

export const Select = ({
	options,
	className,
	callback,
	defaultValue,
}: SelectProps) => {
	const [value, setValue] = useState(defaultValue);
	const handleSelectChange = (value: string) => {
		setValue(value);
		callback(value);
	};

	const triggerLabel = () => {
		const goal = options.find((country) => country.value === value);
		return goal?.label;
	};

	return (
		<SelectUI.Root size="3" value={value} onValueChange={handleSelectChange}>
			<SelectUI.Trigger
				className={
					stringWithDelimiter(' ', [styles.trigger, className]) ?? undefined
				}>
				{triggerLabel()}
			</SelectUI.Trigger>
			<SelectUI.Content position="popper" className={styles.options}>
				{options.map((option, idx) => (
					<SelectUI.Item key={idx} value={option.value} className={styles.option}>
						{option.label}
					</SelectUI.Item>
				))}
			</SelectUI.Content>
		</SelectUI.Root>
	);
};
