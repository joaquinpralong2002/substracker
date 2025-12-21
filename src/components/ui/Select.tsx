import { forwardRef, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: readonly string[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        <label className="block text-base font-bold text-white ml-1">
          {label}
        </label>

        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "w-full h-11 pl-5 pr-12 appearance-none", // appearance-none quita la flecha nativa fea
              "rounded-2xl",
              "bg-brand-pale text-brand-dark font-medium",
              "outline-none transition-all duration-200",
              "focus:ring-2 focus:ring-brand-light focus:brightness-105",
              error ? "ring-2 ring-red-500" : "",
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          {/* Flecha personalizada */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-dark">
            <ChevronDown size={20} />
          </div>
        </div>

        {error && (
          <p className="text-xs text-red-500 ml-2 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
