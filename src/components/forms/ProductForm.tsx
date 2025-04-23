
import { useForm } from "react-hook-form";
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ProductFormData = {
  name: string;
  originalPrice: number;
  salePrice?: number;
  stockQuantity: number;
  description?: string;
};

export function ProductForm({ onSubmit }: { onSubmit?: (data: ProductFormData) => void }) {
  const form = useForm<ProductFormData>();

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
        <FormItem>
          <FormLabel>Stock Quantity</FormLabel>
          <FormControl>
            <Input type="number" {...form.register("stockQuantity", { required: true })} />
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
        <Button type="submit" className="sake-button-primary w-full">Save Product</Button>
      </form>
    </Form>
  );
}
