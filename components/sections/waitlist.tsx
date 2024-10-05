"use client";

import { useState } from "react";

export default function WaitListButton() {
  const [email, setEmail] = useState(""); // State to store email input
  const [emailError, setEmailError] = useState(""); // State for error messages
  const [successMessage, setSuccessMessage] = useState(""); // State for success messages

  // Function to handle email submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(""); // Clear previous errors
    setSuccessMessage(""); // Clear previous success message

    // Basic email validation
    if (!email.includes("@")) {
      setEmailError("Please enter a valid email.");
      return;
    }

    // Send the email to the waitlist API
    try {
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
    } catch (error) {
      setEmailError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Join the Waitlist</h2>
        <form onSubmit={handleEmailSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-2 w-full rounded border p-2"
            placeholder="Enter your email"
            required
          />
          <button
            type="submit"
            className="w-full rounded bg-blue-600 px-4 py-2 text-white"
          >
            Join Waitlist
          </button>
          {emailError && <p className="mt-2 text-red-500">{emailError}</p>}
          {successMessage && (
            <p className="mt-2 text-green-500">{successMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}

