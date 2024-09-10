import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { store } from './app/store';

import reportWebVitals from './reportWebVitals';
import './index.css';
import { paths } from './paths';
import { Login } from './pages/login/Login';
import { Registration } from './pages/registration/Registration';
import { ConfigProvider, theme } from 'antd';
import { Loading } from './features/auth/Loading';
import { Employees } from './pages/employees/Employees';
import { AddEmployee } from './pages/addEmployee/AddEmployee';
import { Status } from './pages/status/Status';

const router = createBrowserRouter([
  {
    path: paths.home,
    element: <Employees/>
  },
  {
    path: paths.login,
    element: <Login/>
  },
  {
    path: paths.registration,
    element: <Registration/>
  },
  {
    path: paths.employeeAdd,
    element: <AddEmployee/>
  },
  {
    path: `${paths.status}/:status`,
    element: <Status/>
  }
])


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{
        algorithm: theme.darkAlgorithm
      }}>
        <Loading>
          <RouterProvider router={router} />
        </Loading>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
