const UserProfile = ({ user }) => {
    if (!user) {
        return <p className="text-red-500 text-center mt-10">User not found.</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4 flex flex-col items-center">
                    <img 
                        className="w-24 h-24 rounded-full border-2 border-gray-300" 
                        src={user.profilePicture || "https://via.placeholder.com/150"} 
                        alt="Profile"
                    />
                    <h2 className="text-xl font-semibold mt-2">{user.name}</h2>
                    <p className="text-gray-600">{user.email}</p>
                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
