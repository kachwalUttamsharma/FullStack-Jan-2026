import "./App.css";
import Counter from "./components/Counter";
import { Provider } from "react-redux";
import store from "./redux/store";
import CounterRedux from "./components/counterRedux";
import ToDoList from "./components/ToDoList";
import User from "./components/User";
import UserRedux from "./components/UserRedux";

function App() {
  return (
    <>
      <Provider store={store}>
        <CounterRedux />
        <ToDoList />
        <User />
        <UserRedux />
      </Provider>
    </>
  );
}

export default App;
