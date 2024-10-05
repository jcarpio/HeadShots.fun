import { useState } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";

export default function WaitListButton() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setSuccessMessage("");

    if (!email.includes("@")) {
      setEmailError("Please enter a valid email.");
      return;
    }

    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setSuccessMessage("Thank you! You&apos;ve been added to the waitlist.");
      setEmail("");
    } else {
      const data = await res.json();
      setEmailError(data.error || "Something went wrong.");
    }
  };

  return (
    <section className="space-y-6 py-12 sm:py-20 lg:py-20">
      <div className="container flex max-w-5xl flex-col items-center gap-5 text-center">
        <h2 className="text-balance font-urban text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[66px]">
          Join the <span className="text-gradient_indigo-purple">Waitlist</span>
        </h2>
        <p
          className="max-w-3xl text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
          Sign up for our waitlist and we&apos;ll get back to you soon!
        </p>
        <div
          className="flex justify-center space-x-2 md:space-x-4"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          <form onSubmit={handleEmailSubmit} className="w-full max-w-md">
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
              className={cn(
                buttonVariants({ size: "lg", rounded: "full" }),
                "gap-2 w-full bg-blue-600 text-white px-4 py-2 rounded",
              )}
            >
              <span>Join Waitlist</span>
              <Icons.arrowRight className="size-4" />
            </button>
            {emailError && <p className="text-red-500 mt-2">{emailError}</p>}
            {successMessage && (
              <p className="text-green-500 mt-2">{successMessage}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

