import React from 'react'

const SubNavbar = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-700 py-1 w-full">
            <nav className="bg-gray-50 dark:bg-gray-700">
                <div className="max-w-screen-xl py-3 mx-16">
                    <div className="flex items-center">
                        <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                            <li>
                                <a href="#" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Dashboard</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>

    )
}

export default SubNavbar