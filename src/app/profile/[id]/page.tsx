// [id] is a dynamic route parameter that will be passed to the UserProfile component as a prop
// This component will be rendered for each user profile page
// The UserProfile component will display the user's profile information

export default function UserProfile({params}: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">Welcome to your profile page 
                <span className="p-2 ml-2 rounded bg-orange-500 text-black">{params.id}</span>
            </p>
        </div>
    );
}