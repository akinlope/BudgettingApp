import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Main from "./layouts/Main";
// actions
import { logoutAction } from "./action/logout";
// Routes
import  { mainLoader } from "./layouts/Main";
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import ViewAllExpense, {expenseDeleteAction, expensesLoader} from "./pages/ViewAllExpenses";
// library
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        // errorElement: <Error />
      },
      {
        path: "viewallexpenses",
        element: <ViewAllExpense />,
        loader: expensesLoader,
        action: expenseDeleteAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ]
  },
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
