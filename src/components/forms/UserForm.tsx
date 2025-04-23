
import { useForm } from "react-hook-form";
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type UserFormData = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
};

export function UserForm({ onSubmit }: { onSubmit?: (data: UserFormData) => void }) {
  const form = useForm<UserFormData>();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => onSubmit && onSubmit(data))} className="space-y-4">
        <FormItem>
          <FormLabel>First Name</FormLabel>
          <FormControl>
            <Input {...form.register("firstName", { required: true })} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Last Name</FormLabel>
          <FormControl>
            <Input {...form.register("lastName", { required: true })} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" {...form.register("email", { required: true })} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Role</FormLabel>
          <FormControl>
            <Input {...form.register("role", { required: true })} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Status</FormLabel>
          <FormControl>
            <Input {...form.register("status", { required: true })} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <Button type="submit" className="sake-button-primary w-full">Save User</Button>
      </form>
    </Form>
  );
}
