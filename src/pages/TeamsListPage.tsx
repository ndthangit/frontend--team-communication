import React, {useState, useEffect, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { Users, Plus, Search, RefreshCw, ChevronRight, UserCircle } from 'lucide-react';
import type { Team } from '../types';
import './LandingPage.css';
import {teamService} from "../service/ObjectService.ts";

export const TeamsListPage: React.FC = () => {
    const navigate = useNavigate();
    const { keycloak } = useKeycloak();
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const userEmail = keycloak.tokenParsed?.email || '';

    // Sửa useCallback với dependency array
    const fetchTeams = useCallback(async () => {
        if (userEmail) {
            setLoading(true);
            setError(null);
            try {
                const result = await teamService.getTeamsByUserEmail(userEmail);
                setTeams(result);
            } catch (err) {
                setError('Không thể tải danh sách teams. Vui lòng thử lại.');
                console.error('Error fetching teams:', err);
            } finally {
                setLoading(false);
            }
        }
    }, [userEmail]); // Thêm userEmail vào dependency array

    useEffect(() => {
        fetchTeams();
    }, [fetchTeams]); // Chỉ cần fetchTeams trong dependency array

    const handleTeamClick = (team: Team) => {
        navigate(`/team/${team.id}`);
    };

    const handleRefresh = () => {
        fetchTeams();
    };

    // Lọc teams theo search query
    const filteredTeams = teams.filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-screen h-screen min-h-0 min-w-0 bg-gradient-to-br from-blue-50 via-white to-purple-100 flex flex-col">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Users className="w-8 h-8 text-blue-600" />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Danh Sách Teams</h1>
                                <p className="text-sm text-gray-600">
                                    Đăng nhập với: <span className="font-medium">{userEmail}</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <button
                                onClick={() => navigate('/profile')}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                                title="Cập nhật thông tin cá nhân"
                            >
                                <UserCircle className="w-5 h-5" />
                                Profile
                            </button>
                            <button
                                onClick={() => navigate('/main')}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Tạo Team Mới
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm team theo tên hoặc mô tả..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                            <p className="text-gray-600 font-medium">Đang tải danh sách teams...</p>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                                <p className="text-red-800 font-medium mb-2">❌ Lỗi</p>
                                <p className="text-red-600">{error}</p>
                                <button
                                    onClick={handleRefresh}
                                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Thử lại
                                </button>
                            </div>
                        </div>
                    ) : filteredTeams.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Users className="w-16 h-16 text-gray-300 mb-4" />
                            <p className="text-gray-600 font-medium text-lg mb-2">
                                {searchQuery ? 'Không tìm thấy team nào' : 'Bạn chưa tham gia team nào'}
                            </p>
                            <p className="text-gray-500 mb-6">
                                {searchQuery ? 'Thử tìm kiếm với từ khóa khác' : 'Tạo team mới để bắt đầu cộng tác'}
                            </p>
                            {!searchQuery && (
                                <button
                                    onClick={() => navigate('/main')}
                                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Plus className="w-5 h-5" />
                                    Tạo Team Đầu Tiên
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="mb-4">
                                <p className="text-gray-600">
                                    Tìm thấy <span className="font-bold text-blue-600">{filteredTeams.length}</span> team(s)
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredTeams.map((team) => (
                                    <div
                                        key={team.id}
                                        onClick={() => handleTeamClick(team)}
                                        className="card cursor-pointer border border-blue-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 group"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-400 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-md">
                                                    {team.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                        {team.name}
                                                    </h3>
                                                    {team.createdAt && (
                                                        <p className="text-xs text-gray-500">
                                                            Tạo: {new Date(team.createdAt).toLocaleDateString('vi-VN')}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                        </div>
                                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                                            {team.description || 'Không có mô tả'}
                                        </p>
                                        {team.avatarUrl && (
                                            <img
                                                src={team.avatarUrl}
                                                alt={team.name}
                                                className="w-full h-32 object-cover rounded-lg mt-3"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeamsListPage;