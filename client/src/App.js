import './App.css';
import { UserProvider } from './components/Context';
import RouteComponent from './components/RouteComponent';
import MyOrders from './components/MyOrders';

function App() {
  return (
    <div>
      <UserProvider>
        <RouteComponent/>
      </UserProvider>
      {/* <MyOrders/> */}
    </div>
  );
}

export default App;
