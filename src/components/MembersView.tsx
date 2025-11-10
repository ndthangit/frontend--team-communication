import React, { useState } from 'react';
import { UserPlus, Mail, Crown, User, Shield, MoreVertical, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type {Member} from '../types';

export const MembersView: React.FC = () => {
  const { members, addMember, removeMember, updateMemberRole, currentTeam, currentUser } =
    useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'Owner' | 'Member' | 'Guest'>('Member');
  const [showContextMenu, setShowContextMenu] = useState<string | null>(null);

  const handleAddMember = () => {
    if (email.trim() && name.trim() && currentTeam) {
      const newMember: Member = {
        id: `member-${Date.now()}`,
        teamId: currentTeam.id,
        name,
        email,
        role,
        status: 'offline',
      };
      addMember(newMember);
      setEmail('');
      setName('');
      setRole('Member');
      setShowAddModal(false);
    }
  };

  const getRoleIcon = (memberRole: string) => {
    switch (memberRole) {
      case 'Owner':
        return <Crown className="w-4 h-4 text-yellow-600" />;
      case 'Member':
        return <User className="w-4 h-4 text-blue-600" />;
      case 'Guest':
        return <Shield className="w-4 h-4 text-gray-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'busy':
        return 'bg-red-500';
      case 'away':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="h-full bg-white">
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
            <p className="text-gray-600 mt-1">{members.length} members</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add Member
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(
                      member.status
                    )} rounded-full border-2 border-white`}
                  />
                </div>

                {member.id !== currentUser.id && (
                  <div className="relative">
                    <button
                      onClick={() =>
                        setShowContextMenu(showContextMenu === member.id ? null : member.id)
                      }
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>

                    {showContextMenu === member.id && (
                      <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                        <div className="px-4 py-2 border-b border-gray-200">
                          <p className="text-xs font-medium text-gray-500 mb-1">Change Role</p>
                          {(['Owner', 'Member', 'Guest'] as const).map((r) => (
                            <button
                              key={r}
                              onClick={() => {
                                updateMemberRole(member.id, r);
                                setShowContextMenu(null);
                              }}
                              className={`w-full text-left px-2 py-1 text-sm rounded ${
                                member.role === r
                                  ? 'bg-blue-50 text-blue-700'
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => {
                            removeMember(member.id);
                            setShowContextMenu(null);
                          }}
                          className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-sm text-gray-600 mb-3 flex items-center">
                <Mail className="w-3 h-3 mr-1" />
                {member.email}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-700">
                  {getRoleIcon(member.role)}
                  <span className="ml-1 font-medium">{member.role}</span>
                </div>
                <span className="text-xs text-gray-500 capitalize">{member.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Add Team Member</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter member name"
                autoFocus
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="member@company.com"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'Owner' | 'Member' | 'Guest')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="Member">Member</option>
                <option value="Owner">Owner</option>
                <option value="Guest">Guest</option>
              </select>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEmail('');
                  setName('');
                  setRole('Member');
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMember}
                disabled={!email.trim() || !name.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
