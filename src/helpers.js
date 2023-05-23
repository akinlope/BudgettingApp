export const waait = () => new Promise(res => setTimeout(
    res, Math.random() * 200
))
// colors
const generateRandomColor = () => {
    const existingBudgetLength = fetchData("budgets")?.length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`
}

// local storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

export const getAllMatchingItems = ({category, key, value
}) => {
    // console.log({
    //     category: category,
    //     key: key,
    //     value: value
    // });
    const data = fetchData(category) ?? [];
    return data.filter((item) => item[key] === value)
};

// create budget 
export const createBudget = (name, amount) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        amount: +amount,
        createdAt: Date.now(),
        color: generateRandomColor()
    };

    const existingBudgets = fetchData("budgets") ?? [];
    return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]))
}

// create Expense
export const createExpense = (name, amount, budgetId) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        amount: +amount,
        createdAt: Date.now(),
        budgetId: budgetId
    };

    const existingBudgets = fetchData("expenses") ?? [];
    return localStorage.setItem("expenses", JSON.stringify([...existingBudgets, newItem]))
}

// delete items 
export const deleteItem = ({key, id}) => {
    
    const existingData = fetchData(key);
    if(id){
        const newData = existingData.filter((item) => item.id !== id)
        return localStorage.setItem(key, JSON.stringify(newData))
    }
    return localStorage.removeItem(key); 
}




// FORMATTING


// Format currency
export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency: "USD"
    })
}

// format Percentage 
export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "percent", 
        minimumFractionDigits: 0
    })
}


// format Date
export const formatDateToLocaleString = (epoch) => {
    return new Date(epoch).toLocaleDateString();
}
// total spent by budget
export const calculateSpentByBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
// return console.log(expense);
        if (expense.name.bugetId !== budgetId) return acc;
        return acc += parseInt(expense.name.amount)
    }, 0);
    return budgetSpent;
}



