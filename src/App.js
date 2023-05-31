import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Main from "./layouts/Main";
// actions
import { logoutAction } from "./action/logout";
// Routes
import { mainLoader } from "./layouts/Main";
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import ExpensesPage, { expenseDeleteAction, expensesLoader } from "./pages/ExpensesPage";
// library
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BudgetPage, { budgetDeleteAction, budgetLoader } from "./pages/BudgetPage";
import { deleteBudget } from "./action/deleteBudget";



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
        errorElement: <Error />
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetDeleteAction,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: deleteBudget
          }
        ],
      },
      {
        path: "budget",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expenseDeleteAction,
        errorElement: <Error />
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
