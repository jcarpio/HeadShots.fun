"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { categories, styles, domainPath } from '@/components/shared/styles';
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { HeaderSection } from "@/components/shared/header-section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import WaitListButtonSimple from "@/components/ui/WaitListButtonSimple";

// Define the type for categories and styles
interface Category {
  id: string;
  name: string;
}

interface Style {
  category: string;
  img: string;
  prompt: string;
  name: string;
  hot?: boolean;
  isNew?: boolean;
}

// Function to shuffle an array randomly
function shuffleArray(array: Style[]) {
  return array.sort(() => Math.random() - 0.5);
}

// Function to pick a random category (excluding "all")
function pickRandomCategory(array: Category[]): Category {
  const filteredArray = array.filter(category => category.id !== 'all');
  return filteredArray[Math.floor(Math.random() * filteredArray.length)];
}

export default function HeadshotStylePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    // Select a random category when the component mounts
    const randomCategory = pickRandomCategory(categories);
    setSelectedCategory(randomCategory);
  }, []);

  const filteredStyles = selectedCategory?.id === 'all'
    ? shuffleArray(styles) // Shuffle styles for the "all" category
    : styles.filter((style: Style) => style.category === selectedCategory?.id);

  return (
    <MaxWidthWrapper className="py-12">
      <HeaderSection
        label="DreamBez"
        title="Hyper Realistic Photos to Dream"
        subtitle="Discover our diverse collection of AI-generated photos. Quick, easy, and personalized to visualize your dreams."
      />
      {/* categories */}
      <div className="mt-12">
        <div className="mx-auto flex w-full  flex-wrap items-center justify-center gap-2">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant="outline"
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium",
                selectedCategory?.id === category.id ? "bg-primary text-primary-foreground" : "bg-transparent text-muted-foreground"
              )}
              onClick={() => setSelectedCategory(category)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
      {/* styles */}
      <div className="mt-12">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {filteredStyles.length > 0 ? (
            filteredStyles.map((style, index) => (
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
            ))
          ) : (
            <p className="text-center col-span-full">No styles available for this category.</p>
          )}
        </div>
      </div>
      <WaitListButton />
    
    </MaxWidthWrapper>
  );
}
