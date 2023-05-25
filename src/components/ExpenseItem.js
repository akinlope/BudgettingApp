import { Link, useFetcher } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid"
import { formatCurrency, formatDateToLocaleString, getAllMatchingItems } from "../helpers";

const ExpenseItem = ({ expense, showBudget = true }) => {

    const fetcher = useFetcher()
    const budget = getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: expense.name.bugetId
    })[0];

    // console.log(budget);

    return (
        <>
            <td>{expense.name.name}</td>
            <td>{formatCurrency(parseInt(expense.name.amount))}</td>
            <td>{formatDateToLocaleString(expense.createdAt)}</td>
            {
                showBudget ? (
                    <td><Link to={`budget/${budget.id}`} style={{
                        "--accent": budget.color
                    }}>
                        {budget.name.name}
                    </Link></td>)
                    :
                    ""
            }
            <td>

                <fetcher.Form method="POST">
                    <input type="hidden" name="_action" value="deleteExpense" />
                    <input type="hidden" name="expenseId" value={expense.id} />
                    <button className=" btn btn--warning"
                        aria-label={`Delete ${budget.name.name}`}
                        type="submit"
                    >
                        <TrashIcon width={20} />
                    </button>

                </fetcher.Form>
            </td>
        </>
    );
}

export default ExpenseItem;