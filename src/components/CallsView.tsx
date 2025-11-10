import React, { useState } from 'react';
import { Video, Phone, Mic, MicOff, VideoOff, PhoneOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CallsView: React.FC = () => {
  const {
    members,
    currentCall,
    incomingCall,
    startCall,
    endCall,
    answerCall,
    declineCall,
    toggleMute,
    toggleVideo,
    isMuted,
    isVideoOff,
  } = useApp();
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [showMemberSelect, setShowMemberSelect] = useState(false);

  const handleStartCall = (type: 'voice' | 'video') => {
    const participants = members.filter((m) => selectedMembers.includes(m.id));
    if (participants.length > 0) {
      startCall(type, participants);
      setSelectedMembers([]);
      setShowMemberSelect(false);
    }
  };

  const toggleMemberSelection = (memberId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]
    );
  };

  if (currentCall) {
    return (
      <div className="h-full bg-gray-900 flex flex-col">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl">
            {currentCall.participants.map((participant) => (
              <div
                key={participant.id}
                className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden"
              >
                {currentCall.type === 'video' && !isVideoOff ? (
                  <div className="w-full h-full bg-gradient-to-br from-blue-900 to-gray-800 flex items-center justify-center">
                    <Video className="w-12 h-12 text-gray-400" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-2xl mb-3">
                      {participant.name.charAt(0).toUpperCase()}
                    </div>
                    <p className="text-white font-medium">{participant.name}</p>
                  </div>
                )}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-white text-sm font-medium bg-black bg-opacity-50 px-2 py-1 rounded">
                    {participant.name}
                  </span>
                  {isMuted && participant.id === members[0].id && (
                    <MicOff className="w-4 h-4 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 p-6 flex items-center justify-center gap-4">
          <button
            onClick={toggleMute}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
              isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {isMuted ? (
              <MicOff className="w-6 h-6 text-white" />
            ) : (
              <Mic className="w-6 h-6 text-white" />
            )}
          </button>

          {currentCall.type === 'video' && (
            <button
              onClick={toggleVideo}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                isVideoOff ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {isVideoOff ? (
                <VideoOff className="w-6 h-6 text-white" />
              ) : (
                <Video className="w-6 h-6 text-white" />
              )}
            </button>
          )}

          <button
            onClick={endCall}
            className="w-14 h-14 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors"
          >
            <PhoneOff className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    );
  }

  if (incomingCall) {
    return (
      <div className="h-full bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-3xl mx-auto mb-4 animate-pulse">
            {incomingCall.participants[0].name.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {incomingCall.participants[0].name}
          </h2>
          <p className="text-gray-600 mb-8">Incoming {incomingCall.type} call...</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={declineCall}
              className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors"
            >
              <PhoneOff className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={answerCall}
              className="w-16 h-16 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors"
            >
              <Phone className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white">
      <div className="border-b border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900">Calls</h2>
        <p className="text-gray-600 mt-1">Start a voice or video call with team members</p>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-8 text-center mb-8">
            <Phone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Start a Call</h3>
            <p className="text-gray-600 mb-6">
              Select team members and choose a call type to get started
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowMemberSelect(true)}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                Voice Call
              </button>
              <button
                onClick={() => setShowMemberSelect(true)}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Video className="w-5 h-5 mr-2" />
                Video Call
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Calls</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    T
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Team Meeting</p>
                    <p className="text-sm text-gray-600">Video call • 45 minutes</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showMemberSelect && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Participants</h2>
            <div className="mb-6 max-h-96 overflow-auto">
              {members.map((member) => (
                <label
                  key={member.id}
                  className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(member.id)}
                    onChange={() => toggleMemberSelection(member.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-600 mr-3"
                  />
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.email}</p>
                  </div>
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowMemberSelect(false);
                  setSelectedMembers([]);
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleStartCall('voice')}
                disabled={selectedMembers.length === 0}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
              >
                <Phone className="w-4 h-4 mr-2" />
                Voice
              </button>
              <button
                onClick={() => handleStartCall('video')}
                disabled={selectedMembers.length === 0}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
              >
                <Video className="w-4 h-4 mr-2" />
                Video
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
