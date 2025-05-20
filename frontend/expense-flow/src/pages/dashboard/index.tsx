import { useUser } from "@clerk/clerk-react"
import { FinancialRecordForm } from "./financial-record-form";
import { FinancialRecordList } from "./financial-record-list";
import { useFinancialRecoreds } from "../../context/financial-record-context";
import { useMemo } from "react";
import { Navigate } from "react-router-dom";
export const Dashboard = () => {
    const {user} = useUser();
    if(!user){
        return (
            <Navigate to={"/auth"} />
        )
    }
    const { records } = useFinancialRecoreds();
    const total = useMemo(() => {
        let totalAmount = 0;
        records.forEach((record) => {
            totalAmount += record.amount;
        });
        return totalAmount;
    },[records]);
    return <div className="dashboard-container">
        <h1>Welcome {user?.firstName}! To ExpenseFlow</h1>
        <FinancialRecordForm />
        <div>Total: {total}</div>
        <FinancialRecordList />
    </div>
}