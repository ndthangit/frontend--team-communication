import { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, UserPlus } from 'lucide-react';
import {useNavigate} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";

export default function AccountButton() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    const { keycloak } = useKeycloak();

    const userName = "User Name";
    const userEmail = "user@example.com";
    const userInitial = "U";

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                buttonRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleProfile = () => {
        navigate('/profile');
        setIsOpen(false);
    };

    const handleSettings = () => {
        console.log('Open settings');
        setIsOpen(false);
    };

    const handleAddAccount = () => {
        console.log('Add account');
        setIsOpen(false);
    };

    const handleLogout = () => {
        keycloak.logout({ redirectUri: window.location.origin });
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center hover:opacity-90 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="User profile"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <span className="text-white font-semibold text-sm">{userInitial}</span>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
            </button>

            {isOpen && (
                <div
                    ref={menuRef}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                    role="menu"
                    aria-orientation="vertical"
                >
                    <div className="absolute -top-2 right-3 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>

                    <div className="px-4 py-3 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-semibold">{userInitial}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-gray-900 text-sm truncate">
                                    {userName}
                                </div>
                                <div className="text-xs text-gray-500 truncate">
                                    {userEmail}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="py-1">
                        <button
                            onClick={handleProfile}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors"
                            role="menuitem"
                        >
                            <User className="w-4 h-4 text-gray-500" />
                            Profile
                        </button>

                        <button
                            onClick={handleSettings}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors"
                            role="menuitem"
                        >
                            <Settings className="w-4 h-4 text-gray-500" />
                            Settings
                        </button>

                        <button
                            onClick={handleAddAccount}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors"
                            role="menuitem"
                        >
                            <UserPlus className="w-4 h-4 text-gray-500" />
                            Add another account
                        </button>

                        <div className="my-1 border-t border-gray-200"></div>

                        <button
                            onClick={handleLogout}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors"
                            role="menuitem"
                        >
                            <LogOut className="w-4 h-4 text-gray-500" />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
