import logo from './logo.svg';
import './App.css';
import RootTwo from './RootTwo/RootTwo';
import {Provider} from 'react-redux'
import store from './Global/Store/store';
// import Verify from './ScreenComponent/SIgnUp/Verify/Verify';
// import Error from './Component/Success/Error'
import data from './data/data'

function App() {
  const idGenerator = (e, id) => {
    e.preventDefault();
    console.log(id);
  }
  return (
    <div className="">
      <Provider store = {store}>
            <RootTwo/>
        </Provider>
        {/* <Verify/> */}
    </div>
  );
}

export default App;
