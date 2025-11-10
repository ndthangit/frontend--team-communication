// Header.tsx
import { Grid3x3, Gift, Search, MoreVertical } from 'lucide-react';
import AccountButton from "./AccountButton.tsx";

export default function Header() {
    return (
        <header className="w-full bg-[#f8f9fa] border-b border-gray-200 px-4 py-2 fixed top-0 left-0 right-0 z-10"
                style={{ height: '64px' }}>
            <div className="w-full h-full flex items-center justify-between gap-4">
                {/* Left Section - Apps Grid and Gift Icon */}
                <div className="flex items-center gap-3">
                    <button
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                        aria-label="Apps"
                    >
                        <Grid3x3 className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                        aria-label="Gift"
                    >
                        <Gift className="w-5 h-5 text-blue-600" />
                    </button>
                </div>

                {/* Center Section - Search Bar */}
                <div className="flex-1 max-w-3xl">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Nhấn Ctrl+Alt+G để chuyển ngay đến cuộc trò chuyện hoặc kênh"
                            className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                    </div>
                </div>

                {/* Right Section - More Options and User Avatar */}
                <div className="flex items-center gap-2">
                    <button
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                        aria-label="More options"
                    >
                        <MoreVertical className="w-5 h-5 text-gray-700" />
                    </button>
                    <AccountButton />
                </div>
            </div>
        </header>
    );
}