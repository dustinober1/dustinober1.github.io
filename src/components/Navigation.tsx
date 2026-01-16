"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/research", label: "Research" },
    { href: "/competitions", label: "Competitions" },
    { href: "/education", label: "Education" },
    { href: "/about", label: "About Me" },
    { href: "/contact", label: "Contact" },
];

export default function Navigation() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header>
            <div className="container">
                <nav>
                    <Link href="/" className="logo">
                        Dustin J. Ober
                    </Link>
                    <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={pathname === link.href ? "active" : ""}
                                    onClick={closeMenu}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <button
                        className="menu-toggle"
                        onClick={toggleMenu}
                        aria-label="Toggle navigation menu"
                        aria-expanded={isMenuOpen}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </nav>
            </div>
        </header>
    );
}
