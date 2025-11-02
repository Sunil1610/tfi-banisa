'use client';

import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { cn } from '@/lib/utils';

interface AutocompleteProps {
  id: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function Autocomplete({
  id,
  options,
  selected,
  onChange,
  placeholder,
  disabled,
  className,
}: AutocompleteProps) {
  return (
    <div className={cn("relative", className)}>
      <Typeahead
        id={id}
        options={options}
        selected={selected}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="[&_.rbt-input-main]:flex [&_.rbt-input-main]:h-10 [&_.rbt-input-main]:w-full [&_.rbt-input-main]:rounded-md [&_.rbt-input-main]:border [&_.rbt-input-main]:border-input [&_.rbt-input-main]:bg-background [&_.rbt-input-main]:px-3 [&_.rbt-input-main]:py-2 [&_.rbt-input-main]:text-base [&_.rbt-input-main]:ring-offset-background [&_.rbt-input-main]:placeholder:text-muted-foreground [&_.rbt-input-main]:focus-visible:outline-none [&_.rbt-input-main]:focus-visible:ring-2 [&_.rbt-input-main]:focus-visible:ring-ring [&_.rbt-input-main]:focus-visible:ring-offset-2 [&_.rbt-input-main]:disabled:cursor-not-allowed [&_.rbt-input-main]:disabled:opacity-50 [&_.rbt-menu]:mt-1 [&_.rbt-menu]:rounded-md [&_.rbt-menu]:border [&_.rbt-menu]:border-border [&_.rbt-menu]:bg-popover [&_.rbt-menu]:text-popover-foreground [&_.rbt-menu]:shadow-md [&_.dropdown-item]:cursor-pointer [&_.dropdown-item]:px-3 [&_.dropdown-item]:py-2 [&_.dropdown-item]:text-sm [&_.dropdown-item.active]:bg-accent [&_.dropdown-item.active]:text-accent-foreground"
      />
    </div>
  );
}
