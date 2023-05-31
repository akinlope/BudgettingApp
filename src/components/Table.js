import ExpenseItem from "./ExpenseItem";

const 
Table = ({ expenses, showBudget = true }) => {
    // console.log(expenses);
    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        {
                            ["Name", "Amount", "Date", showBudget ? "Budget" : "", " "].map((elem, i) => (
                                <th key={i}>{elem}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        expenses.map((expense) => (
                            <tr key={expense.id}>
                                <ExpenseItem expense={expense} showBudget={showBudget} />
                            </tr>
                        )).slice(0, 8)
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Table;