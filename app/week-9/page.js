"use client";

import React from "react";
import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function LandingPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleLogin = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <main className="p-6 bg-zinc-950 min-h-screen flex items-center justify-center">
      <div className="flex flex-col sm:flex-row items-center bg-white p-8 rounded-lg shadow-xl max-w-3xl w-full space-y-6 sm:space-y-0 sm:space-x-8">
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-black mb-4 sm:mb-0">
            Welcome to the Shopping List App
          </h1>
        </div>

        <div className="flex-1 space-y-4">
          {!user ? (
            <div className="w-full space-y-4">
              <p className="text-lg text-gray-700 text-center mb-4">
                Please sign in to continue
              </p>
              <button
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              >
                Login with GitHub
              </button>
            </div>
          ) : (
            <div className="w-full space-y-4">
              <p className="text-lg text-gray-800 text-center mb-4">
                Welcome, {user.displayName}!
              </p>
              <Link
                href="/week-9/shopping-list"
                className="block text-center text-blue-600 hover:text-blue-800 text-lg transition duration-200"
              >
                My Shopping List
              </Link>
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
