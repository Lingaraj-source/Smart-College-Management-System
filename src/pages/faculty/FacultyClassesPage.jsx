import React, { useState, useEffect } from 'react';
// FIX: Correctly importing default exports without curly braces
import AppLayout from '../../components/layout/AppLayout';
import Button from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import Icon from '../../components/ui/Icon';
import Select from '../../components/ui/Select';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';

// This is the interactive attendance sheet component
const AttendanceSheet = ({ students, courseId }) => {
    const { studentData, submitAttendance } = useData();
    const [attendance, setAttendance] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        const initialAttendance = {};
        let alreadySubmitted = false;
        if (students) {
            students.forEach(student => {
                if (student) {
                    initialAttendance[student.id] = 'Present'; // Default to present
                    const courseAttendance = studentData[student.id]?.attendance[courseId];
                    if (courseAttendance && courseAttendance.some(entry => entry.date === today)) {
                        alreadySubmitted = true;
                    }
                }
            });
        }
        setAttendance(initialAttendance);
        setSubmitted(alreadySubmitted);
    }, [students, courseId, studentData, today]);

    const handleStatusChange = (studentId, status) => {
        setAttendance(prev => ({ ...prev, [studentId]: status }));
    };

    const handleSubmit = () => {
        submitAttendance(courseId, attendance);
        setSubmitted(true);
    };

    return (
        <div className="mt-4">
            <h4 className="font-semibold mb-2">Take Attendance for {today}</h4>
            {submitted ? (
                <div className="p-4 rounded-md bg-green-100 text-green-800 flex items-center gap-2">
                    <Icon name="checkCircle" className="w-5 h-5"/>Attendance for today has already been submitted.
                </div>
            ) : (
                <>
                    <div className="max-h-60 overflow-y-auto border rounded-md">
                        <table className="w-full text-sm">
                            <thead className="bg-muted sticky top-0">
                                <tr>
                                    <th className="p-2 text-left">Student Name</th>
                                    <th className="p-2 text-center w-48">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students && students.map(student => student && (
                                    <tr key={student.id} className="border-b">
                                        <td className="p-2 flex items-center gap-3">
                                            <img src={student.avatar} className="w-8 h-8 rounded-full"/>{student.name}
                                        </td>
                                        <td className="p-2">
                                            <Select value={attendance[student.id] || 'Present'} onChange={(e) => handleStatusChange(student.id, e.target.value)} className="h-8">
                                                <option value="Present">Present</option>
                                                <option value="Absent">Absent</option>
                                                <option value="Late">Late</option>
                                            </Select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                     <Button onClick={handleSubmit} className="mt-4">Submit Attendance</Button>
                </>
            )}
        </div>
    );
};


const FacultyClassesPage = () => {
    const { user } = useAuth();
    const { allCourses, studentData, users } = useData();
    const myCourses = allCourses.filter(c => c.facultyId === user.id);
    
    return(
        <AppLayout>
            <h1 className="text-3xl font-bold mb-6">My Classes & Attendance</h1>
            <div className="space-y-6">
                {myCourses.map(course => {
                    const enrolledStudents = Object.entries(studentData)
                        .filter(([_, data]) => data.enrolledCourseId === course.id)
                        .map(([studentId, _]) => users.find(u => u.id === studentId));
                    return (
                        <Card key={course.id}>
                            <CardHeader>
                                <CardTitle>{course.name} ({course.id})</CardTitle>
                                <CardDescription>{enrolledStudents.length} student(s) enrolled</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <AttendanceSheet students={enrolledStudents} courseId={course.id} />
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </AppLayout>
    )
};

export default FacultyClassesPage;

