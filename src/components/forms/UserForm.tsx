
import { useForm } from "react-hook-form";
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export type UserFormData = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
};

interface UserFormProps {
  onSubmit?: (data: UserFormData) => void;
  defaultValues?: Partial<UserFormData>;
}

export function UserForm({ onSubmit, defaultValues }: UserFormProps) {
  const form = useForm<UserFormData>({
    defaultValues: defaultValues || {
      firstName: "",
      lastName: "",
      email: "",
      role: "user",
      status: "active"
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
          <FormLabel>First Name</FormLabel>
          <FormControl>
            <Input {...form.register("firstName", { required: "First name is required" })} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Last Name</FormLabel>
          <FormControl>
            <Input {...form.register("lastName", { required: "Last name is required" })} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input 
              type="email" 
              {...form.register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Role</FormLabel>
          <FormControl>
            <Select 
              onValueChange={(value) => form.setValue("role", value)}
              defaultValue={form.getValues().role}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Status</FormLabel>
          <FormControl>
            <Select 
              onValueChange={(value) => form.setValue("status", value)}
              defaultValue={form.getValues().status}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
        <Button type="submit" className="sake-button-primary w-full">Save User</Button>
      </form>
    </Form>
  );
}
