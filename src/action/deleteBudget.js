import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems } from "../helpers";
import Error from "../pages/Error";
import { redirect } from "react-router-dom";

export function deleteBudget({params}) {
    try{
        deleteItem({
            key: "budgets",
            id: params.id
        });

        const associatedExpenses = getAllMatchingItems({
            category: "expenses",
            key: "bugetId",
            value: params.id
        });

        associatedExpenses.forEach((expense)=> {
            deleteItem({
                key: "expenses",
                id: params.id
            });
        });

        toast.success("Budget deleted successfully!")
    } catch (e){
throw new Error("There was a problem deleting your budget.")
    }

    return redirect("/")
}