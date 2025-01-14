import React from 'react';
import { StaticDataProvider } from './static-data/StaticDataContext';
import CreateGroupForm from './components/CreateGroupForm';

function App() {
  return (
    <StaticDataProvider>
      <div className="app">
        <header>
          <h1>Raid Manager</h1>
        </header>
        <main>
          <CreateGroupForm />
        </main>
      </div>
    </StaticDataProvider>
  );
}

export default App;