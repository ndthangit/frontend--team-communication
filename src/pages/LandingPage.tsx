import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Plus, Grid3X3} from 'lucide-react';
import "./LandingPage.css";

export const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Workspace</h1>
                    <p className="text-lg text-gray-600">
                        Manage your teams and collaborate effectively
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <button
                        onClick={() => navigate('/teams')}
                        className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow text-left"
                    >
                        <Grid3X3 className="w-12 h-12 text-blue-600 mb-4" />
                        <h2 className="text-2xl font-semibold mb-2">View All Teams</h2>
                        <p className="text-gray-600">Browse and access your team spaces</p>
                    </button>

                    <button
                        onClick={() => navigate('/teams')}
                        className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow text-left text-white"
                    >
                        <Plus className="w-12 h-12 mb-4" />
                        <h2 className="text-2xl font-semibold mb-2">Create New Team</h2>
                        <p className="opacity-90">Start collaborating with a new team</p>
                    </button>
                </div>
            </div>
        </div>
    );
};
