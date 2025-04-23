
import { useForm } from "react-hook-form";
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export type EventFormData = {
  name: string;
  startDate: string;
  endDate: string;
  city: string;
  venue: string;
  description?: string;
  originalPrice: number;
  salePrice?: number;
};

interface EventFormProps {
  onSubmit?: (data: EventFormData) => void;
  defaultValues?: Partial<EventFormData>;
}

export function EventForm({ onSubmit, defaultValues }: EventFormProps) {
  const form = useForm<EventFormData>({
    defaultValues: defaultValues || {
      name: "",
      startDate: "",
      endDate: "",
      city: "",
      venue: "",
      description: "",
      originalPrice: 0,
      salePrice: undefined
    }
  });

  // Update form when defaultValues change (when editing)
  useEffect(() => {
    if (defaultValues) {
      Object.entries(defaultValues).forEach(([key, value]) => {
        form.setValue(key as any, value);
      });
    }
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => onSubmit && onSubmit(data))} className="space-y-4">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input {...form.register("name", { required: "Name is required" })} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Start Date</FormLabel>
          <FormControl>
            <Input type="date" {...form.register("startDate", { required: "Start date is required" })} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>End Date</FormLabel>
          <FormControl>
            <Input type="date" {...form.register("endDate", { required: "End date is required" })} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>City</FormLabel>
          <FormControl>
            <Input {...form.register("city", { required: "City is required" })} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Venue</FormLabel>
          <FormControl>
            <Input {...form.register("venue", { required: "Venue is required" })} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Input {...form.register("description")} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Original Price</FormLabel>
          <FormControl>
            <Input 
              type="number" 
              step="0.01" 
              {...form.register("originalPrice", { 
                required: "Original price is required",
                valueAsNumber: true 
              })} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Sale Price</FormLabel>
          <FormControl>
            <Input 
              type="number" 
              step="0.01" 
              {...form.register("salePrice", { 
                valueAsNumber: true 
              })} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <Button type="submit" className="sake-button-primary w-full">Save Event</Button>
      </form>
    </Form>
  );
}
