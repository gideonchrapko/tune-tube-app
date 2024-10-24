"use client";

import { CalendarIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  date: z
    .date({
      required_error: "A date of birth is required.",
    })
    .nullable(),
});

export function CalendarForm({
  dob,
  setDob,
  existingDob,
}: {
  dob: any;
  setDob: any;
  existingDob: any;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !dob && "text-muted-foreground",
                      )}
                      variant="outline"
                    >
                      {dob ? (
                        format(dob, "PPP")
                      ) : (
                        <span>{existingDob ? existingDob : "Pick a date"}</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-2">
                  <CalendarComponent
                    initialFocus
                    mode="single"
                    selected={field.value ?? undefined}
                    translate="en"
                    onSelect={setDob}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
