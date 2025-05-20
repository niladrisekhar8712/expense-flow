import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";
const apiEndpoint = "http://localhost:3001/financial-records";
export interface FinancialRecord {
    _id?: string;
    userId: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    paymentMethod: string;
}

interface FinancialRecordContextType {
    records: FinancialRecord[],
    addRecord: (record: FinancialRecord) => void;
    updateRecord: (id: string, newRecord: FinancialRecord) => void;
    deleteRecord: (id: string) => void;
}

export const FinancialRecordContext = createContext<FinancialRecordContextType | undefined>(undefined);

export const FinancialRecordProvider = ({ children }: { children: React.ReactNode }) => {
    const [records, setRecords] = useState<FinancialRecord[]>([]);
    const {user} = useUser();
    const addRecord = async (record: FinancialRecord) => {
        const response = await fetch(apiEndpoint, {
            method: "POST",
            body: JSON.stringify(record),
            headers: {
                'Content-Type': "application/json"
            }
        });
        try {
            if (response.ok) {
                const newRecord = await response.json();
                setRecords((prev) => [...prev, newRecord]);
            }
        } catch(err) {

        }
        
    }

    const updateRecord = async (id: string, newRecord: FinancialRecord) => {
        // if(!user) return;
        const response = await fetch(apiEndpoint+"/"+id, {
            method: "PUT",
            body: JSON.stringify(newRecord),
            headers: {
                'Content-Type': "application/json"
            }
        });
        try {
            if (response.ok) {
                const newRecord = await response.json();
                setRecords((prev) => prev.map((record)=> {
                    if(record._id === id) {
                        return newRecord;
                    }
                    else{
                        return record;
                    }
                }));
            }
        } catch(err) {

        }
        
    }
    const deleteRecord = async (id: string) => {
        const response = await fetch(apiEndpoint+"/"+id, {
            method: "DELETE",
        });
        try {
            if (response.ok) {
                const deletedRecord = await response.json();
                setRecords((prev) => prev.filter((record) => record._id !== deletedRecord._id));
            }
        } catch(err) {

        }
        
    }

    const fetchRecords = async () => {
        if(!user){
            return;
        }
        const response = await fetch(apiEndpoint+"/getAllByUserId/"+(user?.id ?? ""));
        if(response.ok){
            const records = await response.json();
            setRecords(records);
            console.log(records);
        }
    }
    useEffect(() => {
        fetchRecords();
    }, [user]);
    return (
        <FinancialRecordContext.Provider value={{ records, addRecord,updateRecord, deleteRecord }}>
            {" "}
            {children}
        </FinancialRecordContext.Provider>
    );
}

export const useFinancialRecoreds = () => {
    const context = useContext<FinancialRecordContextType | undefined>(
        FinancialRecordContext
    );
    if (!context) {
        throw new Error("useFinancialRecords must be used within a FinancialRecordProvider");
    }
    return context;
}