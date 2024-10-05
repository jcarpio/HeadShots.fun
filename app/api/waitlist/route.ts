import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/db"; // Assuming you're using Prisma

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email } = req.body;

    // Validate the email
    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Invalid email." });
    }

    // Add the email to the waitlist in your database (with processed set to false by default)
    try {
      await prisma.waitlist.create({
        data: {
          email,
          processed: false, // New users will have this field set to false by default
        },
      });

      res.status(200).json({ message: "Email added to the waitlist." });
    } catch (error) {
      res.status(500).json({ error: "Failed to add email to the waitlist." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
