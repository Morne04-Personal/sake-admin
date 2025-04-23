
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { ColorfulDivider } from "@/components/ui/colorful-divider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { UserForm, UserFormData } from "@/components/forms/UserForm";
import { Plus, Edit, Trash2, Search, Users as UsersIcon } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type UserData = UserFormData & { id: number };

const initialUsers: UserData[] = [
  {
    id: 1,
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: 2,
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    role: "user",
    status: "inactive",
  },
];

const Users = () => {
  const [users, setUsers] = useState<UserData[]>(initialUsers);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Filtered users
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Handlers for CRUD
  const handleAddUser = (data: UserFormData) => {
    const maxId = users.length ? Math.max(...users.map((u) => u.id)) : 0;
    setUsers([
      ...users,
      {
        ...data,
        id: maxId + 1,
      },
    ]);
    toast({
      title: "User added",
      description: "The user has been successfully added.",
    });
    setAddUserOpen(false);
  };

  const handleEditUser = (data: UserFormData) => {
    if (editUserId == null) return;
    setUsers(users.map((u) => (u.id === editUserId ? { ...u, ...data } : u)));
    toast({
      title: "User updated",
      description: "The user has been successfully updated.",
    });
    setEditUserId(null);
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter((u) => u.id !== userId));
    toast({
      title: "User deleted",
      description: "The user has been successfully deleted.",
    });
    setDeleteUserId(null);
  };

  const editingUser = users.find((u) => u.id === editUserId);
  const deletingUser = users.find((u) => u.id === deleteUserId);

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
          <Plus className="mr-1" /> Add User
        </Button>
      </PageHeader>
      <ColorfulDivider className="mb-8" />

      {/* Search & summary */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search users..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <UsersIcon className="mr-1" />
          <span>
            Showing <span className="font-medium">{filteredUsers.length}</span> of{" "}
            <span className="font-medium">{users.length}</span> users
          </span>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No users found. Try adjusting your search.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.firstName} {user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="capitalize">{user.role}</TableCell>
                  <TableCell>
                    {user.status === "active" ? (
                      <span className="text-green-600">Active</span>
                    ) : user.status === "inactive" ? (
                      <span className="text-sake-red">Inactive</span>
                    ) : (
                      <span className="text-yellow-600 capitalize">{user.status}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => setEditUserId(user.id)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="text-sake-red hover:text-sake-red hover:bg-red-50"
                        onClick={() => setDeleteUserId(user.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
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
          {editingUser && (
            <UserForm 
              onSubmit={handleEditUser} 
              defaultValues={{
                firstName: editingUser.firstName,
                lastName: editingUser.lastName,
                email: editingUser.email,
                role: editingUser.role,
                status: editingUser.status,
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={deleteUserId !== null} onOpenChange={(open) => !open && setDeleteUserId(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sake-deep-navy">Delete User</DialogTitle>
          </DialogHeader>
          {deletingUser && (
            <div>
              <p className="mb-4">
                Are you sure you want to delete <span className="font-semibold">{deletingUser.firstName} {deletingUser.lastName}</span>?
              </p>
              <p className="text-sm text-gray-500 mb-4">
                User ID: {deletingUser.id}<br />
                Email: {deletingUser.email}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteUserId(null)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => handleDeleteUser(deleteUserId!)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Users;
