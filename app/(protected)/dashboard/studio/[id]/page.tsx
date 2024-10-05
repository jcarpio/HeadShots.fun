"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { ShootModal } from "@/components/modals/shoot";
import { ShootingResults } from "@/components/dashboard/shooting-results"; // Asegúrate de importar ShootingResults

interface Studio {
  id: string;
  name: string;
  type: string;
  status: string; // Studio status
  predictions: Prediction[];
}

interface Prediction {
  id: string;
  createdAt: string;
  imageUrl: string | null;
  status: string;
  style: string | null;
  pId: string | null;
}

interface StudioPageProps {
  params: {
    id: string;
  };
}

export default function StudioPage({ params }: StudioPageProps) {
  const [studio, setStudio] = useState<Studio | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const router = useRouter();

  const fetchStudio = useCallback(async () => {
    try {
      const response = await fetch(`/api/studio/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setStudio(data);
        setPredictions(data.predictions || []);
      } else {
        throw new Error("Failed to fetch studio");
      }
    } catch (error) {
      console.error("Error fetching studio:", error);
      router.push("/dashboard");
    }
  }, [params.id, router]);

  useEffect(() => {
    fetchStudio();
  }, [fetchStudio]);

  if (!studio) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="mb-4 flex justify-between space-x-4">
        <DashboardHeader heading={studio.name} />
        <Badge variant="outline">{studio.type}</Badge>
        {studio.status === "Completed" ? (
          <ShootModal studioId={params.id} onShootComplete={fetchStudio} />
        ) : (
          <div className="text-red-500">
            <p>This studio is currently being processed. It will be available within 24 hours!</p>
          </div>
        )}
      </div>

      <div className="grid gap-6">
        {/* Use ShootingResults as a component */}
        <ShootingResults
          predictions={predictions}
          studioId={studio.id}
          studioStatus={studio.status} // Pass studio status to ShootingResults
          onShootComplete={fetchStudio}
        />
      </div>
    </div>
  );
}


