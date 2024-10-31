import { Container } from '@radix-ui/themes';

import { ListItems } from '@/widgets/ListItems';

import { moviesStore } from './providers/store';
import './styles/reset.css';

function App() {
	return (
		<Container size="4">
			<ListItems store={moviesStore} />
		</Container>
	);
}

export default App;
