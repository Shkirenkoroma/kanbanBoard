import { FC } from 'react';

import KanbanBoard from './components/kanbanBoard';
import './App.css';

const App: FC = (): JSX.Element => {
  return (
    <div className="App">
     <KanbanBoard />
    </div>
  );
}

export default App;
