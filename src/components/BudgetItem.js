import { calculateSpentByBudget, formatCurrency, formatPercentage } from "../helpers";

const BudgetItem = ({ budget }) => {
    console.log(budget.color);
    // const spent = calculateSpentByBudget(budget);
    // console.log(spent);
    // const key = { ...localStorage }
    // console.log(key);
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
                {formatPercentage(spent/budget.name.amount)}
            </progress>
            <div className="progress-text">
                <small>{formatCurrency(spent)} spent</small>
                <small>{formatCurrency(budget.name.amount - spent)} remaining</small>
            </div>
        </div>
    );
}

export default BudgetItem;