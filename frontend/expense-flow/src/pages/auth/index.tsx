import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
    const { isSignedIn } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSignedIn) {
            navigate("/");
        }
    }, [isSignedIn, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
            <div className="bg-white p-10 rounded-2xl shadow-lg max-w-md w-full text-center space-y-6">
                <h1 className="text-3xl font-bold text-gray-800">Welcome to ExpenseFlow</h1>
                <p className="text-gray-600">Please sign in or sign up to continue</p>

                <SignedOut>
                    <div className="flex justify-center gap-4">
                        <SignInButton mode="modal">
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                                Sign In
                            </button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
                                Sign Up
                            </button>
                        </SignUpButton>
                    </div>
                </SignedOut>

                <SignedIn>
                    <p className="text-green-600">You are already signed in. Redirecting...</p>
                </SignedIn>
            </div>
        </div>
    );
};
