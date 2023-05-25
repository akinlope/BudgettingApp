import { useLoaderData } from "react-router-dom";
import { createExpense, deleteItem, getAllMatchingItems, getAllMatchingItems2, waait } from "../helpers";
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";
import { toast } from "react-toastify";


export async function budgetLoader({ params, showDelete = true}) {
    // console.log(params);
    const budget = await getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: params.id
    })[0];

    const expenses = await getAllMatchingItems2({
        category: "expenses",
        key: "",
        value: params.id
    });
    // console.log(params.id);


    if (!budget) {
        throw new Error("The budget you're trying to find doesn't exist")
    }

    // console.log(expenses);
    return { budget, expenses };
}

export async function budgetDeleteAction({ request }) {
    await waait();
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

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

    if (_action === "deleteExpense") {
        try {
            deleteItem({
                key: "expenses",
                id: values.expenseId,
            })
            // console.log(values.expenseId);
            return toast.success(`Expense deleted!`)
        } catch (e) {
            throw new Error("Oops there was a problem deleting your expense.")
        }
    }
}


const BudgetPage = () => {

    const { budget, expenses } = useLoaderData();
    // console.log(expenses);
    return (
        <div className="grid-lg" style={{ "--accent": budget.color }}>
            <h1 className="h2">
                <span className="accent">{budget.name.name}</span> Overview
            </h1>
            <div className="flex-lg">
                <BudgetItem budget={budget} showDelete />
                <AddExpenseForm budgets={[budget]} />
            </div>
            {
                expenses && expenses.length > 0 && (
                    <div className="grid-md">
                        <h2>
                            <span className="accent">{budget.name.name}</span> Expenses
                        </h2>
                        <Table expenses={expenses} showBudget={false} />
                    </div>
                )
            }

        </div>
    );
}

export default BudgetPage;