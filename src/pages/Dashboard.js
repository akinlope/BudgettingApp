//  rrd imports
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
// components
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import Intro from "../components/Intro";
// helper functions
import { createBudget, createExpense, fetchData, waait } from "../helpers";
import BudgetItem from "../components/BudgetItem";
// import Error from "./Error"
// loader
export function dashboardLoader() {
    const userName = fetchData("userName");
    const budgets = fetchData("budgets");
    return { userName, budgets }
}

// action 
export async function dashboardAction({ request }) {
    await waait();  
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    // new user submission
    if (_action === "newUser") {
        try {
            localStorage.setItem("userName", JSON.stringify(values.userName));
            return toast.success(`Welcome, ${values.userName}`)
        } catch (err) {
            throw new Error("There was a problem creating you account.")
        }
    }

    if (_action === "createBudget") {
        try {
            createBudget({
                name: values.newBudget,
                amount: values.newBudgetAmount
            })
            return toast.success("Budget created.")
        } catch (e) {
            throw new Error("Sorry, Could not create budget.")
        }
    }

    if (_action === "createExpense") {
        try {
            createExpense({
                name: values.newExpense,
                amount: values.newExpenseAmount,
                bugetId: values.newExpenseBudget
            })
            return toast.success(`Expense ${values.newExpense} created!`)
        } catch (e) {
            throw new Error("Oops there was a problem creating your expense.")
        }
    }

    // console.log(formData.userName);

}

// console.log("Showing");

const Dashboard = () => {
    const { userName, budgets } = useLoaderData()
    return (
        <>
            {userName ? <div className="dashboard">
                <h1>Welcome back, <span className="accent">{userName}</span></h1>
                <div className="grid-sm">
                    {
                        budgets && budgets.length > 0 ? (
                            <div className="grid-lg">
                                <div className="flex-lg">
                                    <AddBudgetForm />
                                    <AddExpenseForm budgets={budgets} />
                                </div>

                                {/* To show existing budget */}
                                <h2>Existing Budgets</h2>
                                <div className="budgets">
                                    {
                                        budgets.map((budget)=> {
                                            // console.log(budget);
                                            return(
                                                <BudgetItem key={budget.id} budget={budget} />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        ) 
                        : (
                            <div className="grid-sm">
                                <p>Personal budgeting is the secret to financial freedom.</p>
                                <p>Create a budget to get started!</p>
                                <AddBudgetForm />
                            </div>
                        )
                    }
                </div>
            </div> : <Intro />}
        </>
    );
}

export default Dashboard;