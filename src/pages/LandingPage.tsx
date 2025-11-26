import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, UserCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import "./LandingPage.css";
import type {Team} from "../types/team.ts";

export const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const { teams, addTeam, setCurrentTeam } = useApp();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [teamName, setTeamName] = useState('');
    const [teamDescription, setTeamDescription] = useState('');

    const handleCreateTeam = () => {
        if (teamName.trim()) {
            const newTeam: Team = {
                hidden: false,
                name: teamName
            };
            addTeam(newTeam);
            setCurrentTeam(newTeam);
            setTeamName('');
            setTeamDescription('');
            setShowCreateModal(false);
            navigate(`/team/${newTeam.id}`);
        }
    };

    const handleTeamClick = (team: Team) => {
        setCurrentTeam(team);
        navigate(`/team/${team.id}`);
    };

    return (
        <div className={`w-screen h-screen min-h-0 min-w-0 bg-gradient-to-br from-blue-50 via-white to-purple-100 flex flex-col ${showCreateModal ? 'overflow-hidden' : ''}`}>
            {/* Header with Profile Button */}
            <div className="absolute top-4 right-4 z-10">
                <button
                    onClick={() => navigate('/profile')}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-white text-gray-700 hover:bg-gray-100 transition-colors shadow-md"
                    title="Cập nhật thông tin cá nhân"
                >
                    <UserCircle className="w-5 h-5" />
                    Profile
                </button>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center px-4 py-0">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <Users className="w-16 h-16 text-blue-600 drop-shadow-lg" />
                    </div>
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-2 tracking-tight">Welcome to Teams</h1>
                    <p className="text-lg text-gray-700 font-medium">
                        Collaborate seamlessly with your team
                    </p>
                </div>

                {teams.length > 0 && (
                    <div className="mb-8 w-full max-w-6xl">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Teams</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {teams.map((team) => (
                                <div
                                    key={team.id}
                                    onClick={() => handleTeamClick(team)}
                                    className="card cursor-pointer border border-blue-100 hover:shadow-2xl hover:-translate-y-1"
                                >
                                    <div className="flex items-center mb-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-400 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow">
                                            {team.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm line-clamp-2">{team.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex justify-center">
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center gap-2 px-8 py-3 text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg hover:from-blue-600 hover:to-pink-600 hover:shadow-xl active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    >
                        <Plus className="w-5 h-5" />
                        Create New Team
                    </button>
                </div>
            </div>

            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop chỉ làm mờ, không làm tối */}
                    <div className="absolute inset-0 backdrop-blur-sm bg-white/30"></div>

                    {/* Dialog content */}
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative z-10 border border-gray-200 animate-scale-in">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                            <Plus className="w-6 h-6 text-blue-600" />
                            Create a New Team
                        </h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Team Name
                            </label>
                            <input
                                type="text"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter team name"
                                autoFocus
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                value={teamDescription}
                                onChange={(e) => setTeamDescription(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                rows={3}
                                placeholder="Enter team description"
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setShowCreateModal(false);
                                    setTeamName('');
                                    setTeamDescription('');
                                }}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateTeam}
                                disabled={!teamName.trim()}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};