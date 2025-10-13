import React from 'react';
// FIX: Correctly importing default exports without curly braces
import AppLayout from '../../components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';

const StudentCoursePage = () => {
    const { user } = useAuth();
    const { studentData, allCourses, users } = useData();
    const myData = studentData[user.id];
    const myCourse = myData ? allCourses.find(c => c.id === myData.enrolledCourseId) : null;
    const myFaculty = myCourse ? users.find(u => u.id === myCourse.facultyId) : null;
    const attendanceLog = (myCourse && myData.attendance[myCourse.id]) ? myData.attendance[myCourse.id] : [];
    
    return (
        <AppLayout>
            <h1 className="text-3xl font-bold mb-6">My Course Details</h1>
            {myCourse ? (
                <div className="grid lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">{myCourse.name} ({myCourse.id})</CardTitle>
                            <CardDescription>Department of {myCourse.department}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p><strong>Professor:</strong> {myFaculty?.name || 'TBD'}</p>
                            <p><strong>Credits:</strong> {myCourse.credits}</p>
                            <p><strong>Description:</strong> {myCourse.description}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Attendance Log</CardTitle></CardHeader>
                        <CardContent>
                            <div className="max-h-60 overflow-y-auto">
                                <ul className="divide-y">
                                    {attendanceLog.map(log => (
                                        <li key={log.date} className="py-2 flex justify-between">
                                            <span>{log.date}</span>
                                            <span className={`px-2 py-0.5 text-xs rounded-full ${log.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{log.status}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ) : <p>You are not enrolled in any course.</p>}
        </AppLayout>
    );
};

export default StudentCoursePage;

