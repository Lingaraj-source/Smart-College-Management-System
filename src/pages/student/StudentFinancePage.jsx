import React from 'react';
// FIX: Correctly importing default exports without curly braces
import AppLayout from '../../components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';

const StudentFinancePage = () => {
     const { user } = useAuth();
     const { studentData } = useData();
     const myData = studentData[user.id].fees;

     return (
        <AppLayout>
            <h1 className="text-3xl font-bold mb-6">Financials</h1>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
                <Card><CardHeader><CardTitle>Total Fees</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">${myData.total}</p></CardContent></Card>
                <Card><CardHeader><CardTitle>Paid</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold text-green-600">${myData.paid}</p></CardContent></Card>
                <Card><CardHeader><CardTitle>Amount Due</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold text-red-600">${myData.due}</p></CardContent></Card>
            </div>
            <Card>
                <CardHeader><CardTitle>Transaction History</CardTitle></CardHeader>
                <CardContent>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2 text-left">Date</th>
                                <th className="p-2 text-left">Amount</th>
                                <th className="p-2 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myData.history.map((t, index) => (
                                <tr key={index} className="table-row-hover">
                                    <td className="p-2">{t.date}</td>
                                    <td className="p-2">${t.amount}</td>
                                    <td className="p-2">{t.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </AppLayout>
    );
};

export default StudentFinancePage;

