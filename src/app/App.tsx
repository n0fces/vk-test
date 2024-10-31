import { Container, Flex } from '@radix-ui/themes';

import { Filters } from '@/widgets/Filters';
import { ListItems } from '@/widgets/ListItems';

import { moviesStore } from './providers/store';
import styles from './styles.module.css';
import './styles/reset.css';

function App() {
	return (
		<Container size="4" className={styles.general}>
			<Flex
				direction={'column'}
				gap={'5'}
				align={'start'}
				className={styles.cnt}>
				<Filters store={moviesStore} />
				<ListItems store={moviesStore} />
			</Flex>
		</Container>
	);
}

export default App;
