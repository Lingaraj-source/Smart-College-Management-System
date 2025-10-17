import React from 'react';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Icon from '../components/ui/Icon';

const LandingPage = () => {
    // This function handles smooth scrolling for on-page anchor links.
    const handleNavClick = (e, targetId) => {
        e.preventDefault(); // Prevents the URL hash from changing and confusing the router.
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full bg-background text-foreground">
            <header className="container mx-auto flex items-center justify-between p-4">
                <h1 className="text-2xl font-bold text-primary">CampusFlow</h1>
                <nav className="hidden md:flex items-center gap-6">
                    <a href="#features" onClick={(e) => handleNavClick(e, 'features')} className="hover:text-primary cursor-pointer">Features</a>
                    <a href="#testimonials" onClick={(e) => handleNavClick(e, 'testimonials')} className="hover:text-primary cursor-pointer">Testimonials</a>
                </nav>
                <a href="#/login"><Button>Login</Button></a>
            </header>
            
            <section className="container mx-auto text-center py-20 lg:py-32">
                <h2 className="text-4xl lg:text-6xl font-extrabold mb-4">The Future of College Management</h2>
                <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">An all-in-one platform to streamline operations, enhance learning, and connect your entire campus community.</p>
                <div className="flex justify-center gap-4">
                    <a href="#/register"><Button className="px-8 py-3 text-lg">Get Started</Button></a>
                    <a href="#features" onClick={(e) => handleNavClick(e, 'features')}><Button variant="outline" className="px-8 py-3 text-lg">Learn More</Button></a>
                </div>
            </section>
            
            <section id="features" className="py-20 bg-secondary">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-2">Powerful Features for Everyone</h2>
                    <p className="text-muted-foreground mb-12">Tailored tools for every role on campus.</p>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card>
                            {/* UPDATED ICON NAME */}
                            <CardHeader className="items-center"><Icon name="academicCap" className="w-12 h-12 text-primary mb-4" /><CardTitle>For Students</CardTitle></CardHeader>
                            <CardContent><ul className="text-left space-y-2 text-muted-foreground"><li>- Real-time grade tracking</li><li>- Attendance monitoring</li><li>- Course material access</li><li>- Fee payment portal</li></ul></CardContent>
                        </Card>
                        <Card>
                             {/* ICON NAME FROM CONTEXT */}
                             <CardHeader className="items-center"><Icon name="userGroup" className="w-12 h-12 text-primary mb-4" /><CardTitle>For Faculty</CardTitle></CardHeader>
                            <CardContent><ul className="text-left space-y-2 text-muted-foreground"><li>- Easy attendance marking</li><li>- Assignment creation</li><li>- Student roster management</li><li>- Post announcements</li></ul></CardContent>
                        </Card>
                        <Card>
                             {/* ICON NAME FROM CONTEXT */}
                             <CardHeader className="items-center"><Icon name="Admin" className="w-12 h-12 text-primary mb-4" /><CardTitle>For Admins</CardTitle></CardHeader>
                            <CardContent><ul className="text-left space-y-2 text-muted-foreground"><li>- Centralized user management</li><li>- Course & faculty assignment</li><li>- Campus-wide announcements</li><li>- Analytics & reporting</li></ul></CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <section id="testimonials" className="py-20">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-2">What Our Users Say</h2>
                    <p className="text-muted-foreground mb-12">Trusted by students and faculty alike.</p>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card>
                            <CardContent className="pt-6">
                                <p className="italic text-muted-foreground">"This portal makes it so easy to keep up with my coursework and track my progress. I love having everything in one place!"</p>
                                <div className="flex items-center gap-4 mt-4">
                                    <img src="https://placehold.co/100x100/ec4899/FFFFFF?text=JS" alt="Student testimonial" className="w-12 h-12 rounded-full" />
                                    <div>
                                        <p className="font-semibold">A. Bhaskar Rao</p>
                                        <p className="text-sm text-muted-foreground">CSE Student</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                             <CardContent className="pt-6">
                                <p className="italic text-muted-foreground">"Taking attendance is now a breeze. The system saves me so much time on administrative tasks, letting me focus more on teaching."</p>
                                <div className="flex items-center gap-4 mt-4">
                                    <img src="https://placehold.co/100x100/22c55e/FFFFFF?text=PD" alt="Faculty testimonial" className="w-12 h-12 rounded-full" />
                                    <div>
                                        <p className="font-semibold">Prof. Sanjay Swain</p>
                                        <p className="text-sm text-muted-foreground">Mechanical Engineering</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                             <CardContent className="pt-6">
                                <p className="italic text-muted-foreground">"The ability to manage users and courses from a single dashboard has streamlined our operations significantly. It's a powerful tool."</p>
                                <div className="flex items-center gap-4 mt-4">
                                    <img src="https://placehold.co/100x100/6366f1/FFFFFF?text=ER" alt="Admin testimonial" className="w-12 h-12 rounded-full" />
                                    <div>
                                        <p className="font-semibold">Dr. Sagar Swain</p>
                                        <p className="text-sm text-muted-foreground">System Administrator</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
            
            <footer id="contact" className="bg-secondary border-t py-8">
                <div className="container mx-auto text-center text-muted-foreground"><p>&copy; 2025 SmartCollege. All rights reserved.</p></div>
            </footer>
        </div>
    );
};

export default LandingPage;

