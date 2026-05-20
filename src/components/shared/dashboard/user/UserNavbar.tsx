import Link from "next/link";
import Image from "next/image";
import { useGetUserProfileQuery } from "@/store/api/userApi";
import logo from "@/assets/footer/sayarahub.svg";

const UserNavbar = () => {
  const { data: profileData } = useGetUserProfileQuery();
  const user = profileData?.data;

  return (
    <div className="w-full">
      <div className="w-full">
        {/* Top Navbar Row */}
        <div className="py-4 border-b border-gray-100 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center hover:opacity-90 transition-opacity"
          >
            <Image
              src={logo}
              alt="SayaraHub Logo"
              width={140}
              height={36}
              className="h-7 sm:h-8 w-auto object-contain"
            />
          </Link>

          {/* Header Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors shrink-0">
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-[10px] font-bold text-white rounded-full flex items-center justify-center">
                3
              </span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            <button className="p-2 text-gray-500 hover:text-gray-900 transition-colors shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>

            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 shrink-0">
              {user?.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt={user.fullName || "User Avatar"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-blue-600 text-white text-xs font-semibold flex items-center justify-center">
                  {user?.fullName ? user.fullName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "YS"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
