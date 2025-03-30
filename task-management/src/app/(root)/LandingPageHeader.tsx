"use client"
import {Button} from "@/components/ui/button";
import Link from "next/link";
import "@/styles/landingPage.css"

export default function LandingPageHeader() {
    return (
        <>
            <header className="landing-page-bar">
                <div className="logo">
                    <img
                        className="light-mode-text"
                        src="https://c.animaapp.com/m8uiljkus1uQ04/img/light-mode-text-1-4.png"
                        alt="Syncora logo"
                    />
                </div>
                <nav className="navigation-menu">
                    <ul>
                        <li className="navigation-menu-item">
                            <button className="nav-button">
                                <span>Getting started</span>
                                <img
                                    className="icon"
                                    src="https://c.animaapp.com/m8uiljkus1uQ04/img/icon-chevron-up.svg"
                                    alt="Expand menu"
                                />
                            </button>
                        </li>
                        <li className="navigation-menu-item">
                            <button className="nav-button">
                                <span>Components</span>
                                <img
                                    className="icon"
                                    src="https://c.animaapp.com/m8uiljkus1uQ04/img/icon-chevron-down.svg"
                                    alt="Expand menu"
                                />
                            </button>
                        </li>
                        <li className="navigation-menu-item">
                            <button className="nav-button">
                                <span>Documentation</span>
                                <img
                                    className="icon"
                                    src="https://c.animaapp.com/m8uiljkus1uQ04/img/icon-chevron-down.svg"
                                    alt="Expand menu"
                                />
                            </button>
                        </li>
                    </ul>
                </nav>
                <div className="button-group-2">
                    <Button><span><Link href="/sign-in" >Sign in</Link></span></Button>
                </div>
            </header>
        </>
    );
}
