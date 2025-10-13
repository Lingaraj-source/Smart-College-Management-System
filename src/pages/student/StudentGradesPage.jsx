import React from 'react';
// FIX: Correctly importing default exports without curly braces
import AppLayout from '../../components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';

const StudentGradesPage = () => {
    const { user } = useAuth();
    const { studentData, allCourses } = useData();
    const myData = studentData[user.id];
    const myCourse = myData ? allCourses.find(c => c.id === myData.enrolledCourseId) : null;
    const myGrade = myCourse ? myData.grades[myCourse.id] : null;

     return (
        <AppLayout>
            <h1 className="text-3xl font-bold mb-6">My Grades</h1>
            <Card>
                <CardHeader><CardTitle>Overall GPA: {myData.gpa}</CardTitle></CardHeader>
                <CardContent>
                    {myCourse ? (
                        <div>
                            <p><strong>{myCourse.name}:</strong> <span className="font-bold text-lg text-primary">{myGrade || 'Not Graded'}</span></p>
                        </div>
                    ) : <p>No grades to show.</p>}
                </CardContent>
            </Card>
        </AppLayout>
    );
};

export default StudentGradesPage;