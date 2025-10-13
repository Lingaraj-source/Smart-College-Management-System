import React from 'react';
// FIX: Correctly importing default exports without curly braces
import AppLayout from '../../components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';

const FacultyDashboard = () => {
     const { user } = useAuth();
     const { allCourses, studentData, facultyData, announcements } = useData();
     const myCourses = allCourses.filter(c => c.facultyId === user.id);
     const mySchedule = facultyData[user.id]?.schedule || [];
     const myDepartments = [...new Set(myCourses.map(c => c.department))];
     const myAnnouncements = announcements.filter(a => a.target === 'All' || a.target === 'Faculty' || myDepartments.includes(a.target));
     const totalStudents = Object.values(studentData).filter(s => myCourses.some(c => c.id === s.enrolledCourseId)).length;

     return (
        <AppLayout>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Faculty Dashboard</h1>
                <div className="grid gap-6 md:grid-cols-3">
                    <Card><CardHeader><CardTitle>Courses Teaching</CardTitle></CardHeader><CardContent><p className="text-4xl font-bold">{myCourses.length}</p></CardContent></Card>
                    <Card><CardHeader><CardTitle>Total Students</CardTitle></CardHeader><CardContent><p className="text-4xl font-bold">{totalStudents}</p></CardContent></Card>
                    <Card><CardHeader><CardTitle>Pending Assignments</CardTitle></CardHeader><CardContent><p className="text-4xl font-bold">2</p></CardContent></Card>
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader><CardTitle>My Schedule</CardTitle></CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {mySchedule.length > 0 ? mySchedule.map(s => (
                                    <li key={s.courseId} className="flex justify-between p-2 rounded hover:bg-accent">
                                        <span><strong>{s.courseId}:</strong> {allCourses.find(c=>c.id === s.courseId)?.name}</span>
                                        <span>{s.time} @ {s.room}</span>
                                    </li>
                                )) : <p>No classes scheduled.</p>}
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Recent Announcements</CardTitle></CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {myAnnouncements.length > 0 ? myAnnouncements.slice(0, 3).map(a => (
                                    <li key={a.id}>
                                        <p className="font-semibold">{a.title}</p>
                                        <p className="text-sm text-muted-foreground">{a.content}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{a.date}</p>
                                    </li>
                                )) : <p>No recent announcements.</p>}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
};

export default FacultyDashboard;

