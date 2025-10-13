import React from 'react';

// ======== MOCK DATA GENERATION SCRIPT ======== //
// This function generates a large, realistic dataset on the fly.
const generateMockData = () => {
    const departments = {
        'CSE': 'Computer Science',
        'CSE_DS': 'Data Science (CSE)',
        'CSE_AI': 'AI/ML (CSE)',
        'CE': 'Civil Engineering',
        'ME': 'Mechanical Engineering',
    };

    const firstNames = ['John', 'Jane', 'Peter', 'Mary', 'David', 'Susan', 'Michael', 'Linda', 'James', 'Patricia', 'Robert', 'Jennifer', 'William', 'Elizabeth', 'Richard', 'Maria', 'Joseph', 'Nancy', 'Thomas', 'Margaret'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];

    const generated = {
        users: [],
        courses: {},
        studentData: {},
        facultyData: {},
        announcements: [
            { id: 1, title: 'Mid-term Exams Schedule', date: '2025-10-15', content: 'Mid-term exams will be held from Nov 5th to Nov 12th.', target: 'All'},
            { id: 2, title: 'Guest Lecture for CS Students', date: '2025-10-12', content: 'A guest lecture on AI by a renowned expert is scheduled for Oct 20th.', target: 'CSE'},
        ],
        assignments: []
    };

    // Add Admin
    generated.users.push({ id: 'admin01', name: 'Dr. Evelyn Reed', email: 'admin@college.edu', password: 'password', role: 'admin', avatar: 'https://placehold.co/100x100/6366f1/FFFFFF?text=ER', status: 'active' });
    
    // Generate Faculty (18)
    for (let i = 1; i <= 18; i++) {
        const fname = firstNames[i % firstNames.length];
        const lname = lastNames[i % lastNames.length];
        generated.users.push({
            id: `fac${String(i).padStart(2, '0')}`,
            name: `Prof. ${fname} ${lname}`,
            email: `${fname.toLowerCase()}.${lname.toLowerCase()}@college.edu`,
            password: 'password',
            role: 'faculty',
            avatar: `https://placehold.co/100x100/22c55e/FFFFFF?text=${fname[0]}${lname[0]}`,
            status: 'active'
        });
        generated.facultyData[`fac${String(i).padStart(2, '0')}`] = { schedule: [] };
    }

    // Generate Courses and Assignments
    const courseTemplates = [
        { dept: 'CSE', idPrefix: 'CS', name: 'Intro to Programming', credits: 3 },
        { dept: 'CSE', idPrefix: 'CS', name: 'Data Structures', credits: 4 },
        { dept: 'CSE', idPrefix: 'CS', name: 'Operating Systems', credits: 4 },
        { dept: 'CSE_DS', idPrefix: 'DS', name: 'Database Management', credits: 3 },
        { dept: 'CSE_DS', idPrefix: 'DS', name: 'Machine Learning Foundations', credits: 4 },
        { dept: 'CSE_AI', idPrefix: 'AI', name: 'Intro to Artificial Intelligence', credits: 4 },
        { dept: 'CSE_AI', idPrefix: 'AI', name: 'Neural Networks', credits: 4 },
        { dept: 'CE', idPrefix: 'CE', name: 'Structural Analysis', credits: 3 },
        { dept: 'CE', idPrefix: 'CE', name: 'Fluid Mechanics', credits: 4 },
        { dept: 'ME', idPrefix: 'ME', name: 'Thermodynamics', credits: 3 },
        { dept: 'ME', idPrefix: 'ME', name: 'Engineering Mechanics', credits: 4 },
    ];

    let courseCounter = 101;
    let facultyIndex = 0;
    courseTemplates.forEach(template => {
        const courseId = `${template.idPrefix}${courseCounter++}`;
        const facultyId = `fac${String((facultyIndex % 18) + 1).padStart(2, '0')}`;
        
        if (!generated.courses[template.dept]) {
            generated.courses[template.dept] = [];
        }

        generated.courses[template.dept].push({
            id: courseId,
            name: template.name,
            credits: template.credits,
            facultyId: facultyId,
            department: template.dept,
            description: `An introductory course on ${template.name}.`,
            semester: 'Fall 2025'
        });
        
        generated.assignments.push({
            id: `assign${courseId}`,
            courseId: courseId,
            title: `${template.name} Project`,
            dueDate: `2025-11-${String(10 + facultyIndex).padStart(2,'0')}`,
            submissions: 0
        });

        facultyIndex++;
    });
    
    // Generate Students (660 students, ~60 per course)
    const allCourses = Object.values(generated.courses).flat();
    let studentCounter = 1;
    for (const course of allCourses) {
        for (let i = 0; i < 60; i++) {
            const fname = firstNames[studentCounter % firstNames.length];
            const lname = lastNames[(studentCounter + i) % lastNames.length];
            const studentId = `stu${String(studentCounter).padStart(3, '0')}`;

            generated.users.push({
                id: studentId,
                name: `${fname} ${lname}`,
                email: `${fname.toLowerCase()}${studentCounter}@college.edu`,
                password: 'password',
                role: 'student',
                avatar: `https://placehold.co/100x100/ec4899/FFFFFF?text=${fname[0]}${lname[0]}`,
                status: 'active'
            });
            
            const attendanceLog = [];
            for(let day = 1; day <= 10; day++) {
                attendanceLog.push({ date: `2025-09-${String(day).padStart(2, '0')}`, status: Math.random() > 0.1 ? 'Present' : 'Absent' });
            }

            generated.studentData[studentId] = {
                enrolledCourseId: course.id,
                grades: { [course.id]: ['A', 'A-', 'B+', 'B', 'B-', 'C+'][studentCounter % 6] },
                attendance: { [course.id]: attendanceLog },
                gpa: (3.0 + (studentCounter % 10) / 10).toFixed(1),
                fees: { total: 5000, paid: i % 2 === 0 ? 5000 : 2500, due: i % 2 === 0 ? 0 : 2500, history: [{ date: '2025-08-01', amount: i % 2 === 0 ? 5000 : 2500, status: 'Paid' }] }
            };
            studentCounter++;
        }
    }
    
    const allGeneratedCourses = Object.values(generated.courses).flat();
    const scheduleTimes = ['MWF 9-10 AM', 'TTh 10-11:30 AM', 'MWF 1-2 PM', 'TTh 2-3:30 PM', 'W 6-9 PM'];
    const roomPrefixes = ['A', 'B', 'C', 'D'];

    allGeneratedCourses.forEach((course, index) => {
        if (course.facultyId) {
            const scheduleEntry = {
                time: scheduleTimes[index % scheduleTimes.length],
                courseId: course.id,
                room: `${roomPrefixes[index % roomPrefixes.length]}${101 + (index % 10)}`
            };
            if (generated.facultyData[course.facultyId]) {
                generated.facultyData[course.facultyId].schedule.push(scheduleEntry);
            }
        }
    });

    return generated;
};

export const INITIAL_MOCK_DATA = generateMockData();

