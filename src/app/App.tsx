import { Container, Flex } from '@radix-ui/themes';

import { Filters } from '@/widgets/Filters';
import { ListItems } from '@/widgets/ListItems';

import { moviesStore } from './providers/store';
import './styles/reset.css';

function App() {
	return (
		<Container size="4">
			<Flex gap={'5'} align={'start'}>
				<Filters store={moviesStore} />
				<ListItems store={moviesStore} />
			</Flex>
		</Container>
	);
}

export default App;
