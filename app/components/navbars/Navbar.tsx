import React from 'react'
import { ModeToggle } from '../toggles/ThemeToggle'

const Navbar = () => {
    return (
        <nav className="bg-white py-4 border-gray-200 dark:bg-gray-900 w-full shadow-md">
            <div className="flex items-center px-4">
                <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">DigSiNet</span>
                </a>
                <ModeToggle />
                <div className="flex items-center ml-auto">
                    <a href="#" className="text-sm text-blue-600 dark:text-blue-500 hover:underline">Login</a>
                </div>
            </div>
        </nav>



    );
}

export default Navbar