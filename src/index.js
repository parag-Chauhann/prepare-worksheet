import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import App from './App';
import SignUp from './Components/SignUp Page/SignUp';
import Login from './Components/Login/Login2';
import Protected from './Components/Protected/Protected';
// import ObservationForm from './Components/Worksheet_generated_details/ObservationForm';
// import GeneratedDetails from './Components/Worksheet_generated_details/GeneratedDetails';
import Home from './Components/Worksheet_generated_details/Home';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Protected />}>
        <Route path="/" index element={<Home />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
