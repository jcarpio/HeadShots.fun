"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { styles, domainPath } from '@/components/shared/styles';
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { HeaderSection } from "@/components/shared/header-section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import WaitListButton from "@/components/ui/WaitListButton";

// Function to shuffle an array randomly
function shuffleArray(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
}

export default function HeadshotStylePage() {
  // Shuffle the styles for the "all" category on component mount
  const shuffledStyles = shuffleArray(styles);

  return (
    <MaxWidthWrapper className="py-12">
      <HeaderSection
        label="DreamBez"
        title="Hyper Realistic Photos to Dream"
        subtitle="Discover our diverse collection of AI-generated photos. Quick, easy, and personalized to visualize your dreams."
      />
      {/* styles */}
      <div className="mt-12">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {shuffledStyles.map((style, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative aspect-square">
                  <img
                    src={`${domainPath}/${style.img}`}
                    alt={`AI Headshot: ${style.prompt}`}
                    className="size-full object-cover"
                  />
                  {style.hot && (
                    <Badge variant="secondary" className="absolute right-2 top-2">HOT</Badge>
                  )}
                  {style.isNew && (
                    <Badge variant="destructive" className="absolute left-2 top-2">NEW</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-center text-sm font-medium">{style.name}</CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <WaitListButton />
    </MaxWidthWrapper>
  );
}
