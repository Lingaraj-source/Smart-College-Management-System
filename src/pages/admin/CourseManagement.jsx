import React from 'react';
// FIX: Correctly importing default exports
import AppLayout from '../../components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import Label from '../../components/ui/Label';
import Select from '../../components/ui/Select';
import { useData } from '../../hooks/useData';

const CourseManagement = () => {
    const { courses, users, assignFacultyToCourse } = useData();
    const faculty = users.filter(u => u.role === 'faculty');
    const departmentNames = { 'CSE': 'Computer Science', 'CSE_DS': 'Data Science (CSE)', 'CSE_AI': 'AI/ML (CSE)', 'CE': 'Civil Engineering', 'ME': 'Mechanical Engineering' };

    return (
        <AppLayout>
            <h1 className="text-3xl font-bold mb-6">Course Management</h1>
            <div className="space-y-8">
                {Object.entries(courses).map(([dept, courseList]) => (
                    <div key={dept}>
                        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">{departmentNames[dept]}</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courseList.map(course => {
                                return (
                                    <Card key={course.id} className="hover:!shadow-lg">
                                        <CardHeader>
                                            <CardTitle className="text-xl">{course.name}</CardTitle>
                                            <CardDescription>{course.id} | {course.credits} Credits</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm mb-4">{course.description}</p>
                                            <Label htmlFor={`faculty-${course.id}`}>Assign Faculty</Label>
                                            <Select
                                                id={`faculty-${course.id}`}
                                                value={course.facultyId || ''}
                                                onChange={(e) => assignFacultyToCourse(course.id, e.target.value, dept)}
                                            >
                                                <option value="">Unassigned</option>
                                                {faculty.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                                            </Select>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
};

export default CourseManagement;