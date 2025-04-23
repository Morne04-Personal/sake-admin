
import { useForm } from "react-hook-form";
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export type ProductFormData = {
  name: string;
  originalPrice: number;
  salePrice?: number;
  stockQuantity: number;
  description?: string;
};

interface ProductFormProps {
  onSubmit?: (data: ProductFormData) => void;
  defaultValues?: Partial<ProductFormData>;
}

export function ProductForm({ onSubmit, defaultValues }: ProductFormProps) {
  const form = useForm<ProductFormData>({
    defaultValues: defaultValues || {
      name: "",
      originalPrice: 0,
      salePrice: undefined,
      stockQuantity: 0,
      description: ""
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
          <FormLabel>Original Price</FormLabel>
          <FormControl>
            <Input type="number" step="0.01" {...form.register("originalPrice", { 
              required: "Original price is required",
              valueAsNumber: true 
            })} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Sale Price</FormLabel>
          <FormControl>
            <Input type="number" step="0.01" {...form.register("salePrice", { 
              valueAsNumber: true 
            })} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Stock Quantity</FormLabel>
          <FormControl>
            <Input type="number" {...form.register("stockQuantity", { 
              required: "Stock quantity is required",
              valueAsNumber: true 
            })} />
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
