"use client";

import { useState } from "react";
import { cn } from "@/lib/utils"; 
import { Button } from "@/components/ui/button"; 
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WaitListButtonSimple() {
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
       <section className="py-16 text-muted-foreground">
      <MaxWidthWrapper>
        <Card className="rounded-xl border border-secondary bg-secondary">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-semibold text-secondary-foreground">
              Dreamer, join our waitlist!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mx-auto mb-6 max-w-3xl text-muted-foreground">
              Be the first to know by leaving your email, and we&apos;ll notify you as soon as access becomes available!
            </p>
            <form onSubmit={handleEmailSubmit} className="transition-all hover:rotate-2 hover:scale-110">
              <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded p-2 w-full mb-2"
          placeholder="Enter your email"
          required
        />
              <Button size="lg" variant="default" className="transition-all hover:rotate-2 hover:scale-110">
                Leave us your email
              </Button>
        {emailError && <p className="text-red-500 mt-2">{emailError}</p>}
        {successMessage && (
          <p className="text-green-500 mt-2">{successMessage}</p>
        )}
     </form>
          </CardContent>
        </Card>
      </MaxWidthWrapper>
    </section>
  );
}
