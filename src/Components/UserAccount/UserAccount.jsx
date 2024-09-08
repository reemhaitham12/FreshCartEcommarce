import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../Context/UserContext';
import person2 from "../../assets/icon-1633250_1280.png";
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Animation from '../Animation/Animation';

export default function UserAccount() {
    const { getAllUser, UserId, UserData } = useContext(userContext);
    const [loading, setLoading] = useState(true);
    const [dropdownVisible, setDropdownVisible] = useState(false); 

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible); 
    };
    useEffect(() => {
        const fetchData = async () => {
            if (UserId) {
                setLoading(true);
                try {
                    await getAllUser(UserId);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [UserId, getAllUser]);

    return (
        <Animation>
            <div className="flex justify-center items-center h-screen">
            {
                UserData && (
                    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex justify-end px-4 pt-4">
                            <button   onClick={toggleDropdown} id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                                <span className="sr-only">Open dropdown</span>
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                </svg>
                            </button>
                            {/* <!-- Dropdown menu --> */}
                            <div
                        id="dropdown"
                        className={`z-10 ${dropdownVisible ? 'block' : 'hidden'} text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`} 
                    >
                        <ul className="py-2" aria-labelledby="dropdownButton">
                            <li>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                            </li>
                            
                        </ul>
                    </div>

                        </div>
                        <div className="flex flex-col items-center pb-10">
                            <img
                                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                                src={person2}
                                alt="User Avatar"
                            />
                            <h5 className="mb-1 text-3xl font-medium text-gray-900 dark:text-white">
                                {UserData.name}
                            </h5>
                            <span className="text-xl text-green-700 dark:text-gray-400">
                                {UserData.email}
                            </span>
                            <span className="text-sm text-green-500 dark:text-gray-400">
                                {UserData.phone}
                            </span>
                        </div>
                    </div>

                )
            }
        </div>
        </Animation>
    );
}
