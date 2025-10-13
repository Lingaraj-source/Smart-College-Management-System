import React, { useState } from 'react';
// FIX: Correctly importing default exports without curly braces
import AppLayout from '../../components/layout/AppLayout';
import Button from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Icon from '../../components/ui/Icon';
import Label from '../../components/ui/Label';
import Modal from '../../components/ui/Modal';
import Select from '../../components/ui/Select';
import Textarea from '../../components/ui/Textarea';
import Input from '../../components/ui/Input'; // Added missing Input import
import { useData } from '../../hooks/useData';

const AdminDashboard = () => {
    const { users, allCourses, addAnnouncement } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const departmentNames = { 'CSE': 'Computer Science', 'CSE_DS': 'Data Science (CSE)', 'CSE_AI': 'AI/ML (CSE)', 'CE': 'Civil Engineering', 'ME': 'Mechanical Engineering' };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const announcement = { 
            id: Date.now(), 
            title: formData.get('title'), 
            content: formData.get('content'), 
            target: formData.get('target'), 
            date: new Date().toISOString().split('T')[0] 
        };
        addAnnouncement(announcement);
        setIsModalOpen(false);
    };

    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card><CardHeader><CardTitle>Total Students</CardTitle></CardHeader><CardContent><p className="text-4xl font-bold">{users.filter(u=>u.role==='student').length}</p></CardContent></Card>
                    <Card><CardHeader><CardTitle>Total Faculty</CardTitle></CardHeader><CardContent><p className="text-4xl font-bold">{users.filter(u=>u.role==='faculty').length}</p></CardContent></Card>
                    <Card><CardHeader><CardTitle>Total Courses</CardTitle></CardHeader><CardContent><p className="text-4xl font-bold">{allCourses.length}</p></CardContent></Card>
                    <Card><CardHeader><CardTitle>Actions</CardTitle></CardHeader><CardContent><Button onClick={()=> setIsModalOpen(true)} className="w-full"><Icon name="announcement" className="w-4 h-4 mr-2" /> Post Announcement</Button></CardContent></Card>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Post a New Announcement">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div><Label htmlFor="title">Title</Label><Input id="title" name="title" required /></div>
                    <div><Label htmlFor="content">Content</Label><Textarea id="content" name="content" required /></div>
                    <div>
                        <Label htmlFor="target">Target Audience</Label>
                        <Select id="target" name="target">
                            <option value="All">All (Students & Faculty)</option>
                            <option value="Faculty">All Faculty Only</option>
                            {Object.entries(departmentNames).map(([code, name]) => <option key={code} value={code}>Students - {name}</option>)}
                        </Select>
                    </div>
                    <div className="flex justify-end gap-2"><Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button><Button type="submit">Post</Button></div>
                </form>
            </Modal>
        </AppLayout>
    );
};

export default AdminDashboard;
