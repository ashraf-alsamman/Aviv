import Header from '@components/Header/Header';
import Listings from '@containers/Listings/Listings';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { store } from './redux/store';

const App = () => (
  <Provider store={store}>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Listings />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;
