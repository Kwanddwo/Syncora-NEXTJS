import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type PopoverOption = {
    value: string;
    label: string;
    style: string;
};

type PopoverComponentProps = {
    currentValue: string;
    options: PopoverOption[];
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect: (value: string) => void;
    getStyle: (value: string) => string;
};

const PopoverComponent = ({
                              currentValue,
                              options,
                              isOpen,
                              onOpenChange,
                              onSelect,
                              getStyle
                          }: PopoverComponentProps) => {
    return (
        <Popover open={isOpen} onOpenChange={onOpenChange}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent">
                    <Badge
                        className={cn(
                            getStyle(currentValue),
                            "transition-opacity duration-200 flex items-center gap-1",
                        )}
                    >
                        {currentValue}
                        <ChevronDown className="h-3 w-3 opacity-70" />
                    </Badge>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={() => onSelect(option.value)}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <Badge className={option.style}>{option.label}</Badge>
                                    <span className="ml-auto">
                    {currentValue === option.value && <Check className="h-4 w-4" />}
                  </span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default PopoverComponent;