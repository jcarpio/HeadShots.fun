"use client"; 

import { useState } from "react";
import { cn } from "@/lib/utils"; 
import { Button } from "@/components/ui/button"; 
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WaitListButton() {
  // State to store email input
  const [email, setEmail] = useState("");
  
  // State to store error messages for email validation
  const [emailError, setEmailError] = useState("");
  
  // State to store success message after form submission
  const [successMessage, setSuccessMessage] = useState("");

  // Function to handle email submission to the waitlist
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  // Prevent default form submission
    setEmailError("");  // Clear any previous error
    setSuccessMessage("");  // Clear previous success message

    if (!email.includes("@")) {
      setEmailError("Please enter a valid email.");  // Validate email format
      return;
    }

    try {
      // Call the waitlist API to submit the email
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),  // Send email in the request body
      });

      if (res.ok) {
        // Show success message if the request is successful
        setSuccessMessage("Thank you! You&apos;ve been added to the waitlist.");
        setEmail("");  // Clear the email input
      } else {
        // Handle errors if the API returns an error response
        const data = await res.json();
        setEmailError(data.error || "Something went wrong.");
      }
    } catch (error) {
      // Handle unexpected errors (network issues, etc.)
      setEmailError("An unexpected error occurred.");
    }
  };

  return (
    <section className="py-16 text-muted-foreground">
      <MaxWidthWrapper>
        <Card className="rounded-xl border border-secondary bg-secondary">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-semibold text-secondary-foreground">
              Access is currently limited, but you can join our waitlist!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mx-auto mb-6 max-w-3xl text-muted-foreground">
              Right now, access is restricted. However, you can be first in line by leaving your email, and we&apos;ll notify you once access is available!
            </p>
            <form onSubmit={handleEmailSubmit} className="transition-all hover:rotate-2 hover:scale-110">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}  // Update the state with the email input
                className="border rounded-full p-3 w-full mb-4 text-center"
                placeholder="Enter your email"
                required  // Mark the input as required
              />
              <Button size="lg" variant="default" className="transition-all hover:rotate-2 hover:scale-110">
                Leave us your email
              </Button>
              {emailError && <p className="text-red-500 mt-2">{emailError}</p>}
              {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
            </form>
          </CardContent>
        </Card>
      </MaxWidthWrapper>
    </section>
  );
}
