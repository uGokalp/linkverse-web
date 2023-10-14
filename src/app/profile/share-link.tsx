"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import "./style.css";
import { toast } from "@/components/ui/use-toast";

type Props = {
  link: string;
};

export function ShareLink({ link }: Props) {
  const onClick = () => {
    navigator.clipboard.writeText(link);
    toast({
      description: "Link copied to clipboard"
    })
  };


  return (
    <div className="space-y-2">
      <p className="text-sm">Share your site</p>
      <div className="flex space-x-2">
        <Input value={link} readOnly />
        <Button variant="secondary" className="shrink-0" onClick={onClick}>
          Copy Link
        </Button>
      </div>
    </div>
  );
}
