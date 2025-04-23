
import { useForm } from "react-hook-form";
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type EventFormData = {
  name: string;
  startDate: string;
  endDate: string;
  city: string;
  venue: string;
  description?: string;
  originalPrice: number;
  salePrice?: number;
};

export function EventForm({ onSubmit }: { onSubmit?: (data: EventFormData) => void }) {
  const form = useForm<EventFormData>();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => onSubmit && onSubmit(data))} className="space-y-4">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input {...form.register("name", { required: true })} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Start Date</FormLabel>
          <FormControl>
            <Input type="date" {...form.register("startDate", { required: true })} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>End Date</FormLabel>
          <FormControl>
            <Input type="date" {...form.register("endDate", { required: true })} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>City</FormLabel>
          <FormControl>
            <Input {...form.register("city", { required: true })} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Venue</FormLabel>
          <FormControl>
            <Input {...form.register("venue", { required: true })} />
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
            <Input type="number" step="0.01" {...form.register("originalPrice", { required: true })} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Sale Price</FormLabel>
          <FormControl>
            <Input type="number" step="0.01" {...form.register("salePrice")} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <Button type="submit" className="sake-button-primary w-full">Save Event</Button>
      </form>
    </Form>
  );
}
