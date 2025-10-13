import React, { useState, createContext } from 'react';
import { INITIAL_MOCK_DATA } from '../lib/mockData';
import { useNotification } from '../hooks/useNotification';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(INITIAL_MOCK_DATA);
    const { addNotification } = useNotification();

    const addUser = (userData) => {
        setData(prev => {
            const newUsers = [...prev.users, userData];
            let newStudentData = prev.studentData;
            if (userData.role === 'student') {
                newStudentData = {
                    ...prev.studentData,
                    [userData.id]: { enrolledCourseId: null, grades: {}, attendance: {}, gpa: 0, fees: { total: 5000, paid: 0, due: 5000, history: [] } }
                };
            }
            return { ...prev, users: newUsers, studentData: newStudentData };
        });
        addNotification(`${userData.role.charAt(0).toUpperCase() + userData.role.slice(1)} added successfully!`, 'success');
    };

    const assignFacultyToCourse = (courseId, facultyId, dept) => {
        setData(prev => {
            const newCourses = { ...prev.courses };
            const courseIndex = newCourses[dept].findIndex(c => c.id === courseId);
            if (courseIndex > -1) {
                newCourses[dept][courseIndex].facultyId = facultyId;
            }
            return { ...prev, courses: newCourses };
        });
        addNotification('Faculty assigned successfully!', 'success');
    };

    const addAnnouncement = (announcementData) => {
        setData(prev => ({ ...prev, announcements: [announcementData, ...prev.announcements] }));
        addNotification('Announcement posted successfully!', 'success');
    };

    const addAssignment = (assignmentData) => {
        setData(prev => ({ ...prev, assignments: [...prev.assignments, assignmentData] }));
        addNotification('Assignment created successfully!', 'success');
    };

    const submitAttendance = (courseId, attendanceData) => {
        setData(prevData => {
            const newStudentData = { ...prevData.studentData };
            const today = new Date().toISOString().split('T')[0];

            Object.entries(attendanceData).forEach(([studentId, status]) => {
                if (newStudentData[studentId] && newStudentData[studentId].attendance[courseId]) {
                    const todayEntryIndex = newStudentData[studentId].attendance[courseId].findIndex(entry => entry.date === today);
                    if (todayEntryIndex === -1) {
                        newStudentData[studentId].attendance[courseId].push({ date: today, status });
                    }
                }
            });
            return { ...prevData, studentData: newStudentData };
        });
        addNotification('Attendance submitted successfully!', 'success');
    };

    const value = {
        ...data,
        addUser,
        assignFacultyToCourse,
        addAnnouncement,
        addAssignment,
        submitAttendance,
        allCourses: Object.values(data.courses).flat()
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};
