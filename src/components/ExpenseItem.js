import { formatCurrency, formatDateToLocaleString } from "../helpers";

const ExpenseItem = ({expense}) => {
    
    console.log(formatDateToLocaleString(expense.createdAt));
    return ( 
        <>
            <td>{expense.name.name}</td>
            <td>{formatCurrency(parseInt(expense.name.amount))}</td>
            <td>{formatDateToLocaleString(expense.createdAt)}</td>
        </>
     );
}
 
export default ExpenseItem;