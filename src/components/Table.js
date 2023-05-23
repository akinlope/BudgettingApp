import ExpenseItem from "./ExpenseItem";

const Table = ({ expenses }) => {
    // console.log(expenses);
    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        {
                            ["Name", "Amount", "Date", "Budget", " "].map((elem, i) => (
                                <th key={i}>{elem}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        expenses.map((expense) => (
                            <tr key={expense.id}>
                                <ExpenseItem expense={expense} />
                            </tr>
                        )).slice(0, 8)
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Table;