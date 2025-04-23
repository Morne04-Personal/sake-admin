
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { ColorfulDivider } from "@/components/ui/colorful-divider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { UserForm, UserFormData } from "@/components/forms/UserForm";
import { Plus } from "lucide-react";

const Users = () => {
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  
  const { toast } = useToast();

  const handleAddUser = (data: UserFormData) => {
    // In a real application, this would be an API call
    toast({
      title: "User added",
      description: "The user has been successfully added.",
    });
    setAddUserOpen(false);
  };

  const handleEditUser = (data: UserFormData) => {
    // In a real application, this would be an API call
    toast({
      title: "User updated",
      description: "The user has been successfully updated.",
    });
    setEditUserId(null);
  };

  return (
    <DashboardLayout>
      <PageHeader 
        title="User Management" 
        description="Manage system users and permissions"
      >
        <Button 
          className="sake-button-primary flex items-center"
          onClick={() => setAddUserOpen(true)}
        >
          <Plus size={16} className="mr-1" /> Add User
        </Button>
      </PageHeader>
      <ColorfulDivider className="mb-8" />

      <div className="text-center p-16 bg-white rounded-lg border">
        <h3 className="text-lg font-medium">User management placeholder</h3>
        <p className="text-gray-500 mt-2">
          This is a placeholder for the user management interface.
          <br />Click the "Add User" button to test the form.
        </p>
      </div>

      {/* Add User Dialog */}
      <Dialog open={addUserOpen} onOpenChange={setAddUserOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <UserForm onSubmit={handleAddUser} />
        </DialogContent>
      </Dialog>
      
      {/* Edit User Dialog */}
      <Dialog open={editUserId !== null} onOpenChange={(open) => !open && setEditUserId(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <UserForm 
            onSubmit={handleEditUser} 
            defaultValues={{
              firstName: "John",
              lastName: "Doe",
              email: "john.doe@example.com",
              role: "user",
              status: "active"
            }}
          />
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Users;
