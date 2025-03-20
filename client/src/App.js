import './App.css';
import { UserProvider } from './components/Context';
import RouteComponent from './components/RouteComponent';

function App() {
  return (
    <div>
      <UserProvider>
        <RouteComponent/>
      </UserProvider>
    </div>
  );
}

export default App;
