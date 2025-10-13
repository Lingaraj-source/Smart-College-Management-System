import React, { useState } from 'react';
// FIX: Correctly importing default exports without curly braces
import AppLayout from '../../components/layout/AppLayout';
import Button from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import Icon from '../../components/ui/Icon';
import Input from '../../components/ui/Input';
import Label from '../../components/ui/Label';
import Modal from '../../components/ui/Modal';
import Select from '../../components/ui/Select';
import { useData } from '../../hooks/useData';

const UserManagement = () => {
    const { users, addUser } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const role = formData.get('role');
        const newUser = { 
            id: `${role.slice(0, 3)}${Math.floor(Math.random() * 900) + 100}`, 
            name: formData.get('name'), 
            email: formData.get('email'), 
            password: 'password', 
            role: role, 
            avatar: `https://placehold.co/100x100/eeeeee/333333?text=${formData.get('name').charAt(0)}`, 
            status: 'active' 
        };
        addUser(newUser);
        setIsModalOpen(false);
    };

    return (
        <AppLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">User Management</h1>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Icon name="plus" className="w-4 h-4 mr-2" /> Add User
                </Button>
            </div>
            <Card>
                <CardContent className="!p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Role</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id} className="border-b table-row-hover">
                                        <td className="p-4 flex items-center gap-3">
                                            <img src={user.avatar} className="w-8 h-8 rounded-full" />
                                            {user.name}
                                        </td>
                                        <td className="p-4">{user.email}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${user.role === 'admin' ? 'bg-red-200 text-red-800' : user.role === 'faculty' ? 'bg-blue-200 text-blue-800' : 'bg-green-200 text-green-800'}`}>{user.role}</span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${user.status === 'active' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>{user.status}</span>
                                        </td>
                                        <td className="p-4 flex gap-2">
                                            <Button variant="ghost" size="sm" className="p-1 h-auto"><Icon name="edit" className="w-4 h-4"/></Button>
                                            <Button variant="ghost" size="sm" className="p-1 h-auto text-red-500"><Icon name="delete" className="w-4 h-4"/></Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add a New User">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div><Label htmlFor="name">Full Name</Label><Input id="name" name="name" required /></div>
                    <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required /></div>
                    <div><Label htmlFor="role">Role</Label><Select id="role" name="role"><option value="student">Student</option><option value="faculty">Faculty</option></Select></div>
                    <div className="flex justify-end gap-2"><Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button><Button type="submit">Add User</Button></div>
                </form>
            </Modal>
        </AppLayout>
    );
};

export default UserManagement;

