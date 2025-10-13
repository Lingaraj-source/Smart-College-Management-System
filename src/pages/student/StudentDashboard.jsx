import React from 'react';
// FIX: Correctly importing default exports
import AppLayout from '../../components/layout/AppLayout';
import Button from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';

const StudentDashboard = () => {
    const { user } = useAuth();
    const { studentData, announcements, allCourses, users } = useData();
    const myData = studentData[user.id];
    const myCourse = myData ? allCourses.find(c => c.id === myData.enrolledCourseId) : null;
    const myAnnouncements = announcements.filter(a => a.target === 'All' || a.target === (myCourse?.department));
    
    const attendanceLog = (myCourse && myData.attendance[myCourse.id]) ? myData.attendance[myCourse.id] : [];
    const presentDays = attendanceLog.filter(day => day.status === 'Present').length;
    const attendancePercentage = attendanceLog.length > 0 ? (presentDays / attendanceLog.length) * 100 : 100;

    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="bg-primary text-primary-foreground primary-gradient hover:!shadow-2xl">
                            <CardHeader>
                                <CardTitle className="text-3xl">Welcome, {user.name.split(' ')[0]}!</CardTitle>
                                <CardDescription className="text-primary-foreground/80">Here's your academic snapshot.</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>My Announcements</CardTitle></CardHeader>
                            <CardContent>
                                <ul className="space-y-4">
                                    {myAnnouncements.slice(0,3).map(a => (
                                        <li key={a.id}>
                                            <p className="font-semibold">{a.title}</p>
                                            <p className="text-sm text-muted-foreground">{a.content}</p>
                                            <p className="text-xs text-muted-foreground mt-1">{a.date}</p>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader><CardTitle>My Course</CardTitle></CardHeader>
                            <CardContent>
                                {myCourse ? (
                                    <div>
                                        <p className="font-bold text-lg">{myCourse.name}</p>
                                        <p className="text-sm text-muted-foreground">{users.find(u=>u.id === myCourse.facultyId)?.name}</p>
                                        <a href="#/student/course"><Button variant="link" className="p-0 h-auto mt-2">View Details</Button></a>
                                    </div>
                                ) : <p>Not enrolled in any course.</p>}
                            </CardContent>
                        </Card>
                        <div className="grid grid-cols-2 gap-6">
                            <Card className="text-center">
                                <CardHeader><CardTitle>GPA</CardTitle></CardHeader>
                                <CardContent><p className="text-5xl font-bold text-primary">{myData.gpa}</p></CardContent>
                            </Card>
                             <Card className="text-center">
                                <CardHeader><CardTitle>Attendance</CardTitle></CardHeader>
                                <CardContent><p className="text-5xl font-bold text-primary">{attendancePercentage.toFixed(0)}%</p></CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default StudentDashboard;

