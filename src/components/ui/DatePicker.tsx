"use client";

import * as React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/shadcn/button";
import { Calendar } from "@/components/ui/shadcn/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";

interface DatePickerProps {
  date?: Date;
  onChange?: (date: Date | undefined) => void;
  label?: string;
  error?: string;
  className?: string;
  placeholder?: string;
}

export function DatePicker({
  date,
  onChange,
  label,
  error,
  className,
  placeholder = "Seleccionar fecha",
}: DatePickerProps) {
  return (
    <div className={cn("w-full space-y-1", className)}>
      {label && (
        <label className="block text-base font-bold text-white ml-1">
          {label}
        </label>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full h-11 px-5 justify-between text-left font-medium rounded-2xl border-none",
              "bg-brand-pale text-brand-dark hover:bg-brand-pale/90 hover:text-brand-dark",
              "focus:ring-2 focus:ring-brand-light focus:brightness-105",
              !date && "text-brand-dark/60",
              error ? "ring-2 ring-red-500" : ""
            )}
          >
            {date ? (
              format(date, "PPP", { locale: es })
            ) : (
              <span>{placeholder}</span>
            )}
            <CalendarIcon className="h-5 w-5 text-brand-dark" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 rounded-2xl border-brand-dark/10 bg-brand-pale" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onChange}
            initialFocus
            locale={es}
            className="rounded-2xl border-none bg-brand-pale"
            classNames={{
              day_selected: "bg-brand-primary text-white hover:bg-brand-primary hover:text-white focus:bg-brand-primary focus:text-white",
              today: "bg-brand-light/50 text-brand-dark rounded-md",
              day: cn(
                "relative w-full h-full p-0 text-center aspect-square select-none text-brand-dark hover:bg-brand-light/30 rounded-md transition-colors"
              ),
            }}
          />
        </PopoverContent>
      </Popover>
      {error && (
        <p className="text-xs text-red-300 ml-2 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
