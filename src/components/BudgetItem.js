import { calculateSpentByBudget, formatCurrency } from "../helpers";

const BudgetItem = ({ budget }) => {
    // const spent = calculateSpentByBudget(budget.name.amount);
    // console.log(spent);
   
        

    return (
        <div className="budget">
            <div className="progress-text">
                <h3>{budget.name.name}</h3>
                <p>{formatCurrency(parseInt(budget.name.amount))} Budgeted</p>
            </div>
            <progress max={budget.name.amount} value="100">
                {/* percentage */}
            </progress>
            <div className="progress-text">
                <small>... spent</small>
                <small>... remaining</small>
            </div>
        </div>
    );
}

export default BudgetItem;