"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function WaitListButton() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  return (
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
        <Button type="submit" className="w-full">
          Join Waitlist
        </Button>
        {emailError && <p className="text-red-500 mt-2">{emailError}</p>}
        {successMessage && (
          <p className="text-green-500 mt-2">{successMessage}</p>
        )}
      </form>
    </div>
  );
}
