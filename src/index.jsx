import ReactDOM from 'react-dom';
import { GlobalContextProvider } from 'context/GlobalContext';
import { StrictMode } from 'react';
import { GlobalStyles } from 'styles/global';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <StrictMode>
    <GlobalContextProvider>
      <GlobalStyles />
      <App />
    </GlobalContextProvider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
