import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { Save, User as UserIcon } from 'lucide-react';
import './ProfilePage.css';
import type { User } from "../types";
import UserInfo from '../components/UserInfo';
import {createUser, getUserInfoByEmail, updateUser} from "../service/UserService.ts";

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const { keycloak } = useKeycloak();
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [userInfo, setUserInfo] = useState<User>({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        dateOfBirth: undefined,
        occupation: undefined
    });

    useEffect(() => {
        const loadUserInfo = async () => {
            try {
                const savedUserInfo = localStorage.getItem('userInfo');

                if (savedUserInfo) {
                    // Có dữ liệu trong localStorage -> dùng dữ liệu đã lưu
                    const userData = JSON.parse(savedUserInfo);
                    setUserInfo(prev => ({
                        ...prev,
                        ...userData,
                        email: userData.email || keycloak.tokenParsed?.email || '',
                        firstName: userData.firstName || keycloak.tokenParsed?.given_name || '',
                        lastName: userData.lastName || keycloak.tokenParsed?.family_name || '',
                    }));
                } else {
                    // Không có dữ liệu trong localStorage -> gọi API lấy dữ liệu
                    const res = await getUserInfoByEmail();
                    if (res?.data) {
                        // Tìm thấy người dùng trong DB
                        const userData = res.data;
                        setUserInfo(userData);
                        localStorage.setItem('userInfo', JSON.stringify(userData));
                    } else {
                        // Không tìm thấy người dùng trong DB -> giữ nguyên form trống để tạo mới
                        setUserInfo(prev => ({
                            ...prev,
                            firstName: keycloak.tokenParsed?.given_name || '',
                            lastName: keycloak.tokenParsed?.family_name || '',
                            email: keycloak.tokenParsed?.email || '',
                        }));
                    }
                }
            } catch (err) {
                console.error('Error loading user info:', err);
                // Fallback: sử dụng thông tin từ keycloak
                setUserInfo(prev => ({
                    ...prev,
                    firstName: keycloak.tokenParsed?.given_name || '',
                    lastName: keycloak.tokenParsed?.family_name || '',
                    email: keycloak.tokenParsed?.email || '',
                }));
            } finally {
                setInitialLoading(false);
            }
        };

        loadUserInfo();
    }, [keycloak]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const savedUserInfo = localStorage.getItem('userInfo');
            let action;

            if (savedUserInfo) {
                // Có dữ liệu trong localStorage -> dùng API update
                action = updateUser;
            } else {
                // Không có dữ liệu trong localStorage -> dùng API create
                action = createUser;
            }

            await action(
                userInfo,
                () => {
                    setSuccess('Profile updated successfully!');
                    // Cập nhật localStorage sau khi thành công
                    localStorage.setItem('userInfo', JSON.stringify(userInfo));
                    setTimeout(() => {
                        navigate('/');
                    }, 1500);
                }
            );

        } catch (err) {
            console.error('Error updating profile:', err);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <div className="profile-container">
                <div className="profile-content">
                    <div className="profile-card">
                        <p>Loading information...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-content">
                <div className="profile-card">
                    <div className="profile-title">
                        <UserIcon className="w-8 h-8 text-blue-600" />
                        <h1>Update Personal Information</h1>
                    </div>

                    {error && (
                        <div className="alert alert-error">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="alert alert-success">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <UserInfo user={userInfo} onInputChange={handleInputChange} />
                        <div className="form-actions">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="btn-cancel"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn-save"
                                disabled={loading}
                            >
                                <Save className="w-5 h-5" />
                                {loading ? 'Saving...' : 'Save Information'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export { ProfilePage };