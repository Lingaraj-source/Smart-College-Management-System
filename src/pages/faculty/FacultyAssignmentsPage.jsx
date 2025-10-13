import React, { useState } from 'react';
// FIX: Correctly importing default exports
import AppLayout from '../../components/layout/AppLayout';
import Button from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import Icon from '../../components/ui/Icon';
import Input from '../../components/ui/Input';
import Label from '../../components/ui/Label';
import Modal from '../../components/ui/Modal';
import Select from '../../components/ui/Select';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';

const FacultyAssignmentsPage = () => {
    const { user } = useAuth();
    const { allCourses, assignments, addAssignment } = useData();
    const myCourses = allCourses.filter(c => c.facultyId === user.id);
    const myAssignments = assignments.filter(a => myCourses.some(c => c.id === a.courseId));
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newAssignment = { 
            id: `assign${Math.floor(Math.random() * 900) + 100}`, 
            courseId: formData.get('courseId'), 
            title: formData.get('title'), 
            dueDate: formData.get('dueDate'), 
            submissions: 0, 
        };
        addAssignment(newAssignment);
        setIsModalOpen(false);
    };

    return (
        <AppLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Assignments</h1>
                <Button onClick={()=>setIsModalOpen(true)}>
                    <Icon name="plus" className="w-4 h-4 mr-2"/>Create Assignment
                </Button>
            </div>
            <Card>
                <CardContent className="!p-0">
                    <table className="w-full text-sm">
                        <thead className="bg-muted">
                            <tr>
                                <th className="p-4 text-left">Title</th>
                                <th className="p-4 text-left">Course</th>
                                <th className="p-4 text-left">Due Date</th>
                                <th className="p-4 text-left">Submissions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myAssignments.map(a => (
                                <tr key={a.id} className="border-b table-row-hover">
                                    <td className="p-4">{a.title}</td>
                                    <td className="p-4">{a.courseId}</td>
                                    <td className="p-4">{a.dueDate}</td>
                                    <td className="p-4">{a.submissions}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Assignment">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div><Label htmlFor="title">Title</Label><Input id="title" name="title" required/></div>
                    <div>
                        <Label htmlFor="courseId">Course</Label>
                        <Select id="courseId" name="courseId" required>
                            {myCourses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </Select>
                    </div>
                     <div><Label htmlFor="dueDate">Due Date</Label><Input id="dueDate" name="dueDate" type="date" required/></div>
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Create</Button>
                    </div>
                </form>
            </Modal>
        </AppLayout>
    );
};

export default FacultyAssignmentsPage;

