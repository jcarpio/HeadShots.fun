"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [emailError, setEmailError] = useState("");
  const [inviteError, setInviteError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  // Handle email submission for the waitlist
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(""); // Clear previous errors
    setSuccessMessage("");

    if (!email.includes("@")) {
      setEmailError("Please enter a valid email.");
      return;
    }

    // Send email to the waitlist API
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setSuccessMessage("Thank you! You've been added to the waitlist.");
      setEmail(""); // Clear email field
    } else {
      const data = await res.json();
      setEmailError(data.error || "Something went wrong.");
    }
  };

  // Handle invitation code submission
  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviteError(""); // Clear previous errors

    // Validate the invitation code with the backend
    const res = await fetch("/api/invite/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: inviteCode }),
    });

    if (res.ok) {
      // Redirect to the main app if invite is valid
      router.push("/dashboard"); // Ajusta la URL según la página a la que quieras redirigir
    } else {
      const data = await res.json();
      setInviteError(data.error || "Invalid or used invitation code.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6">Welcome to DreamBez</h1>
      <div className="flex flex-col space-y-6">
        {/* Waitlist Form */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Join the Waitlist</h2>
          <form onSubmit={handleEmailSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded p-2 w-full mb-2"
              placeholder="Enter your email"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Join Waitlist
            </button>
            {emailError && <p className="text-red-500 mt-2">{emailError}</p>}
            {successMessage && (
              <p className="text-green-500 mt-2">{successMessage}</p>
            )}
          </form>
        </div>

        {/* Invitation Code Form */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Have an Invitation Code?</h2>
          <form onSubmit={handleInviteSubmit}>
            <input
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              className="border rounded p-2 w-full mb-2"
              placeholder="Enter your invitation code"
              required
            />
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded w-full"
            >
              Access DreamBez
            </button>
            {inviteError && <p className="text-red-500 mt-2">{inviteError}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
