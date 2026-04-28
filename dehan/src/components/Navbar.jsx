import React, { useState, useEffect } from "react";
import { Menu, X, Home, User, Briefcase, Mail } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("Home");
    
    const navItems = [
        { href: "#Home", label: "Home", icon: Home },
        { href: "#About", label: "About", icon: User },
        { href: "#Portofolio", label: "Portofolio", icon: Briefcase },
        { href: "#Contact", label: "Contact", icon: Mail },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            const sections = navItems.map(item => {
                const section = document.querySelector(item.href);
                if (section) {
                    return {
                        id: item.href.replace("#", ""),
                        offset: section.offsetTop - 550,
                        height: section.offsetHeight
                    };
                }
                return null;
            }).filter(Boolean);

            const currentPosition = window.scrollY;
            const active = sections.find(section => 
                currentPosition >= section.offset && 
                currentPosition < section.offset + section.height
            );

            if (active) {
                setActiveSection(active.id);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const section = document.querySelector(href);
        if (section) {
            const top = section.offsetTop - 100;
            window.scrollTo({
                top: top,
                behavior: "smooth"
            });
        }
        setIsOpen(false);
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <aside
                className={`hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-50 transition-all duration-500 ${
                    scrolled ? "opacity-100" : "opacity-95"
                }`}
            >
                <div className="w-20 rounded-2xl bg-[#030014]/70 backdrop-blur-xl border border-white/10 py-4">
                    <div className="flex flex-col items-center gap-4">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeSection === item.href.substring(1);
                            return (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => scrollToSection(e, item.href)}
                                    className={`group flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all duration-300 ${
                                        isActive ? "text-white" : "text-[#b8a9d9] hover:text-white"
                                    }`}
                                >
                                    <div
                                        className={`p-2 rounded-lg transition-all duration-300 ${
                                            isActive
                                                ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
                                                : "bg-white/5 group-hover:bg-white/10"
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <span className="text-[11px]">{item.label}</span>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </aside>

            {/* Mobile top bar */}
            <nav className="md:hidden fixed w-full top-0 z-50 bg-[#030014]/80 backdrop-blur-xl border-b border-white/10">
                <div className="px-4">
                    <div className="flex items-center justify-between h-16">
                        <a
                            href="#Home"
                            onClick={(e) => scrollToSection(e, "#Home")}
                            className="text-lg font-bold bg-gradient-to-r from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent"
                        >
                            Portfolio
                        </a>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`relative p-2 text-[#e2d3fd] hover:text-white transition-transform duration-300 ${
                                isOpen ? "rotate-90 scale-125" : "rotate-0 scale-100"
                            }`}
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 z-30 bg-black/60 mt-16"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Mobile sidebar drawer */}
            <aside
                className={`md:hidden fixed top-16 left-0 h-[calc(100vh-64px)] w-64 z-40 bg-[#030014]/95 backdrop-blur-xl border-r border-white/10 transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="px-4 py-6 space-y-3 overflow-y-auto h-full">
                    {navItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => scrollToSection(e, item.href)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300 ${
                                    activeSection === item.href.substring(1)
                                        ? "bg-white/10 text-white"
                                        : "text-[#e2d3fd] hover:text-white hover:bg-white/5"
                                }`}
                                style={{
                                    transitionDelay: `${index * 80}ms`,
                                }}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </a>
                        );
                    })}
                </div>
            </aside>
        </>
    );
};

export default Navbar;