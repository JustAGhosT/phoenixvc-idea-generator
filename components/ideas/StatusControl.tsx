"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IdeaStatus } from "@/lib/types";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

interface StatusControlProps {
  ideaId: string | number;
  currentStatus: IdeaStatus;
  onStatusChange: (status: IdeaStatus) => Promise<void>;
  disabled?: boolean;
}

export function StatusControl({ 
  ideaId, 
  currentStatus, 
  onStatusChange,
  disabled = false
}: StatusControlProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  
  const statusOptions: { value: IdeaStatus; label: string; variant: string }[] = [
    { value: "created", label: "Created", variant: "default" },
    { value: "updated", label: "Updated", variant: "secondary" },
    { value: "reviewed", label: "Reviewed", variant: "outline" },
    { value: "approved", label: "Approved", variant: "success" },
    { value: "rejected", label: "Rejected", variant: "destructive" },
  ];
  
  const currentStatusOption = statusOptions.find(
    option => option.value === currentStatus
  ) || statusOptions[0];
  
  const handleStatusChange = async (status: IdeaStatus) => {
    if (status === currentStatus || disabled) return;
    
    setIsUpdating(true);
    try {
      await onStatusChange(status);
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isUpdating || disabled}>
        <Button variant="outline" className="flex items-center gap-2">
          <Badge variant={currentStatusOption.variant as any}>
            {currentStatusOption.label}
          </Badge>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {statusOptions.map(option => (
          <DropdownMenuItem
            key={option.value}
            className="flex items-center justify-between"
            onClick={() => handleStatusChange(option.value)}
          >
            <span>{option.label}</span>
            {option.value === currentStatus && (
              <Check className="h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}