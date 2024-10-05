import { useState } from "react";
import { cn } from "@/lib/utils";
// import { buttonVariants } from "@/components/ui/button"; 
import { Icons } from "@/components/shared/icons";

import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


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
      setSuccessMessage("Thank you! You've been added to the waitlist.");
      setEmail("");
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
                            Wanna look like a superstar? Let&apos;s do this!
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="mx-auto mb-6 max-w-3xl text-muted-foreground">
                            Sick of your same old selfies? Our AI photo booth is here to spice things up! We&apos;ve got you!<br />No fancy gear needed – just a few clicks and boom! You&apos;re ready to wow the world!
                        </p>
                       <form onSubmit={handleEmailSubmit} className="transition-all hover:rotate-2 hover:scale-110">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-full p-3 w-full mb-4 text-center"
              placeholder="Enter your email"
              required
            />
                        <Button size="lg" variant="default" className="transition-all hover:rotate-2 hover:scale-110">
                            Make Me Look Awesome!
                        </Button>
                         {emailError && <p className="transition-all hover:rotate-2 hover:scale-110">{emailError}</p>}
            {successMessage && (
              <p className="transition-all hover:rotate-2 hover:scale-110">{successMessage}</p>
            )}
                         </form>
                    </CardContent>
                </Card>
            </MaxWidthWrapper>
        </section>
    );
}
