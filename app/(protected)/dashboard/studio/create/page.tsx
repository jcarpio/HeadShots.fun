"use client";

import { useState, useCallback, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/shared/icons";
import { toast } from "sonner";
import { useDropzone } from 'react-dropzone';
import { X, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { resizeImage } from '@/lib/imageUtils';

const CREDITS_PER_STUDIO = 25; // Global constant for studio credit cost

export default function CreateStudioPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [images, setImages] = useState<Array<{ file: File; preview: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userCredits, setUserCredits] = useState(0); // State for user credits

  // Fetch user credits
  const fetchUserCredits = async () => {
    try {
      const response = await fetch('/api/user/credits');
      const data = await response.json();
      setUserCredits(data.credits);
    } catch (error) {
      console.error('Failed to fetch user credits', error);
    }
  };

  // Fetch user credits when the component mounts
  useEffect(() => {
    fetchUserCredits();
  }, []);

  // Handle image uploads
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...newImages].slice(0, 20));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 20,
  });

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    setImages(prev => {
      const newImages = [...prev];
      const [removed] = newImages.splice(index, 1);
      newImages.splice(direction === 'up' ? index - 1 : index + 1, 0, removed);
      return newImages;
    });
  };
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return; // Prevent submission if already loading
    
    if (!name.trim()) {
      toast.error("Please enter a studio name.");
      return;
    }
    if (!type) {
      toast.error("Please select a studio type.");
      return;
    }
    if (images.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }
    if (images.length > 20) {
      toast.error("You can upload a maximum of 20 images.");
      return;
    }

    // Check if the user has enough credits
    if (userCredits < CREDITS_PER_STUDIO) {
      toast.error("You don't have enough credits. Please buy more credits to create a new studio.");
      return;
    }

    setIsLoading(true);
    try {
      const uploadedImages = await Promise.all(images.map(async (img) => {
        const resizedImage = await resizeImage(img.file, 1024, 1024);
        const formData = new FormData();
        formData.append('file', resizedImage);

        const uploadResponse = await fetch('/api/studio/upload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image');
        }

        const { url } = await uploadResponse.json();
        return url;
      }));

      // Fetch user data (assumed to be from session or API)
      const user = await (await fetch('/api/user')).json(); 

      // Deduct credits after successful studio creation
      await fetch('/api/user/deduct-credits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id, credits: CREDITS_PER_STUDIO }), // Deduct 25 credits
      });

      const response = await fetch('/api/studio/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          type,
          modelUser: "joselapasion",
          modelVersion: "613a21a57e8545532d2f4016a7c3cfa3c7c63fded03001c2e69183d557a929db",
          hf_lora: "enkire/replicate-joselapasion-lora-face",
          defaultHairStyle: "short",
          defaultUserHeight: "168",
          extraInfo: "x",
          images: uploadedImages,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create studio');
      }

      const studio = await response.json();
      toast.success("Studio created successfully!");
      router.push(`/dashboard/studio/${studio.id}`);
    } catch (error) {
      toast.error(`Failed to create studio. Please try again. ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TooltipProvider>
      <div className="flex-1 space-y-4">
        <div className="mb-4 flex justify-start space-x-4">
          <Link href="/dashboard">
            <Button variant="outline" size="icon" className="mt-1 size-7">
              <ArrowLeft className="size-4" />
              <span className="sr-only">Back to Dashboard</span>
            </Button>
          </Link>
          <DashboardHeader
            heading="Create Your Studio"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-5">
            <CardHeader>
              <CardDescription>Enter the basic information for your studio</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Rest of the form fields for studio creation */}
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Icons.spinner className="mr-2 size-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Studio'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}
