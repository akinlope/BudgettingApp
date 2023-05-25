import { Form, Link } from "react-router-dom";
import { calculateSpentByBudget, formatCurrency, formatPercentage } from "../helpers";
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/solid";

const BudgetItem = ({ budget, showDelete = false }) => {

    const spent = calculateSpentByBudget(budget.id);


    return (
        <div
            style={{
                "--accent": budget.color
            }}
            className="budget">
            <div className="progress-text">
                <h3>{budget.name.name}</h3>
                <p>{formatCurrency(parseInt(budget.name.amount))} Budgeted</p>
            </div>
            <progress max={budget.name.amount} value={spent}>
                {formatPercentage(spent / budget.name.amount)}
            </progress>
            <div className="progress-text">
                <small>{formatCurrency(spent)} spent</small>
                <small>{formatCurrency(budget.name.amount - spent)} remaining</small>
            </div>
            {
                showDelete ? (
                    <div className="flex-sm">
                        <Form method="post" action="delete"
                            onSubmit={(e) => {
                                if (
                                    !window.confirm(
                                        "Are you sure you want to permanently delete this budget?"
                                    )
                                ) {
                                    e.preventDefault();
                                }
                            }}
                        >
                            <button type="submit" className=" btn">
                                <span>Delete Budget</span>
                                <TrashIcon width={20} />
                            </button>
                        </Form>
                    </div>
                )
                    :
                    (
                        <div className="flex-sm">
                            <Link to={`/budget/${budget.id}`} className="btn">
                                <span>View Details</span>
                                <BanknotesIcon width={20} />
                            </Link>
                        </div>
                    )
            }
        </div>
    );
}

export default BudgetItem;