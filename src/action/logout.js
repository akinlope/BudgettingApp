import { redirect } from "react-router-dom";
// toast
import { toast } from "react-toastify";
// helper function
import { deleteItem } from "../helpers";

export async function logoutAction(){
    // delete user
    deleteItem({
        key: "userName", 
    })
    deleteItem({
        key: "budgets"
    })
    deleteItem({
        key: "expenses"
    })
    
    toast.success("You've been deleted!")
    // return redirect
    return redirect("/")
}