
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { ColorfulDivider } from "@/components/ui/colorful-divider";
import { 
  Search, Plus, Filter, FileDown, Edit, Eye, Trash2, X, Copy, Clock, ShieldCheck, Lock
} from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { users, suppliers } from "@/lib/mock-data";
import { formatDate, getRoleBadgeColor } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedSupplierId, setSelectedSupplierId] = useState("");
  const [activeOnly, setActiveOnly] = useState(true);
  const [viewUserId, setViewUserId] = useState<number | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  
  const { toast } = useToast();
  
  const filteredUsers = users.filter((user) => {
    // Search term filter
    const searchMatch = searchTerm === "" || 
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    
    // Role filter
    const roleMatch = selectedRoles.length === 0 || 
      selectedRoles.includes(user.roleId.toString());
    
    // Supplier filter
    const supplierMatch = selectedSupplierId === "" || 
      user.supplierId?.toString() === selectedSupplierId;
    
    // Status filter
    const statusMatch = !activeOnly || user.status === "active";
    
    return searchMatch && roleMatch && supplierMatch && statusMatch;
  });
  
  const resetFilters = () => {
    setSelectedRoles([]);
    setSelectedSupplierId("");
    setActiveOnly(true);
  };
  
  const handleDeleteUser = (id: number) => {
    toast({
      title: "User deleted",
      description: "The user has been successfully deleted.",
    });
    setDeleteUserId(null);
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${text} has been copied to your clipboard.`,
    });
  };
  
  const getRoleName = (roleId: number) => {
    switch (roleId) {
      case 1: return "Super Admin";
      case 2:
      case 3: return "Admin";
      case 4: return "Supplier Admin";
      case 5: return "Supplier User";
      case 6: return "Client";
      case 7: return "Regular User";
      default: return "Unknown Role";
    }
  };
  
  const viewingUser = viewUserId !== null 
    ? users.find(u => u.id === viewUserId) 
    : null;
    
  const deletingUser = deleteUserId !== null
    ? users.find(u => u.id === deleteUserId)
    : null;

  return (
    <DashboardLayout>
      <PageHeader 
        title="Users Management" 
        description="View, add, edit, and manage users"
      >
        <Button className="sake-button-primary flex items-center">
          <Plus size={16} className="mr-1" /> Add User
        </Button>
      </PageHeader>
      <ColorfulDivider className="mb-8" />
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search users..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter size={16} className="mr-1" /> 
            Filters {filterOpen ? <X size={16} className="ml-1" /> : null}
          </Button>
          
          <Select onValueChange={(value) => setSelectedRoles(value ? [value] : [])}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Roles</SelectItem>
              <SelectItem value="1">Super Admin</SelectItem>
              <SelectItem value="2">Admin</SelectItem>
              <SelectItem value="4">Supplier Admin</SelectItem>
              <SelectItem value="5">Supplier User</SelectItem>
              <SelectItem value="6">Client</SelectItem>
              <SelectItem value="7">Regular User</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="flex items-center">
            <FileDown size={16} className="mr-1" /> Export
          </Button>
        </div>
      </div>
      
      {filterOpen && (
        <Card className="p-4 mb-6">
          <h3 className="text-lg font-medium mb-4">Filter Users</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label>User Roles</Label>
              <div className="mt-2 space-y-2">
                {[
                  { id: "1", name: "Super Admin" },
                  { id: "2", name: "Admin" },
                  { id: "4", name: "Supplier Admin" },
                  { id: "5", name: "Supplier User" },
                  { id: "6", name: "Client" },
                  { id: "7", name: "Regular User" }
                ].map((role) => (
                  <div key={role.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`role-${role.id}`}
                      checked={selectedRoles.includes(role.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRoles([...selectedRoles, role.id]);
                        } else {
                          setSelectedRoles(selectedRoles.filter(id => id !== role.id));
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor={`role-${role.id}`} className="cursor-pointer">
                      {role.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="supplier-filter">Supplier</Label>
              <Select value={selectedSupplierId} onValueChange={setSelectedSupplierId}>
                <SelectTrigger id="supplier-filter" className="mt-2">
                  <SelectValue placeholder="All Suppliers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Suppliers</SelectItem>
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.id.toString()}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Status</Label>
              <div className="flex items-center space-x-2 mt-6">
                <Switch 
                  id="active-only" 
                  checked={activeOnly}
                  onCheckedChange={setActiveOnly}
                />
                <Label htmlFor="active-only" className="cursor-pointer">
                  Active users only
                </Label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={resetFilters}
            >
              Reset Filters
            </Button>
            <Button onClick={() => setFilterOpen(false)}>
              Apply Filters
            </Button>
          </div>
        </Card>
      )}
      
      <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Registration</TableHead>
              <TableHead className="w-24">Status</TableHead>
              <TableHead className="w-32 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  No users found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => {
                const roleColor = getRoleBadgeColor(user.roleId);
                const userSupplier = user.supplierId 
                  ? suppliers.find(s => s.id === user.supplierId) 
                  : null;
                
                return (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell className="font-medium">
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="mr-1">{user.email}</span>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-5 w-5"
                          onClick={() => copyToClipboard(user.email)}
                        >
                          <Copy size={12} />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <Badge className={`${roleColor.bg} ${roleColor.text}`}>
                        {getRoleName(user.roleId)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {userSupplier ? (
                        <span className="text-sm truncate max-w-[150px] inline-block">
                          {userSupplier.name}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {formatDate(user.registrationDate)}
                    </TableCell>
                    <TableCell>
                      <Switch 
                        checked={user.status === "active"} 
                        className="data-[state=checked]:bg-green-500"
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => setViewUserId(user.id)}
                        >
                          <Eye size={16} />
                        </Button>
                        <Button size="sm" variant="ghost">
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
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">{filteredUsers.length}</span> of{" "}
          <span className="font-medium">{users.length}</span> users
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-sake-deep-navy text-white">
            1
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
      
      {/* User Details Dialog */}
      <Dialog open={viewUserId !== null} onOpenChange={(open) => !open && setViewUserId(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-sake-deep-navy">User Details</DialogTitle>
          </DialogHeader>
          {viewingUser && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-sake-deep-navy text-white flex items-center justify-center text-xl font-bold">
                  {viewingUser.firstName.charAt(0)}{viewingUser.lastName.charAt(0)}
                </div>
                
                <div>
                  <h2 className="text-xl font-medium text-sake-deep-navy">
                    {viewingUser.firstName} {viewingUser.lastName}
                  </h2>
                  <div className="flex items-center mt-1">
                    <Badge className={`${getRoleBadgeColor(viewingUser.roleId).bg} ${getRoleBadgeColor(viewingUser.roleId).text}`}>
                      {getRoleName(viewingUser.roleId)}
                    </Badge>
                    <span className="text-sm text-gray-500 ml-2">
                      {viewingUser.status === "active" ? (
                        <span className="flex items-center text-green-600">
                          <ShieldCheck size={14} className="mr-1" /> Active
                        </span>
                      ) : (
                        <span className="flex items-center text-gray-500">
                          <Lock size={14} className="mr-1" /> Inactive
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="basic">
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="address">Address Details</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  <TabsTrigger value="activity">Activity Log</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-3">Personal Information</h3>
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <span className="text-sm text-gray-500">First Name:</span>
                          <span className="text-sm">{viewingUser.firstName}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <span className="text-sm text-gray-500">Last Name:</span>
                          <span className="text-sm">{viewingUser.lastName}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <span className="text-sm text-gray-500">Email:</span>
                          <div className="flex items-center">
                            <span className="text-sm">{viewingUser.email}</span>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-5 w-5 ml-1"
                              onClick={() => copyToClipboard(viewingUser.email)}
                            >
                              <Copy size={12} />
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <span className="text-sm text-gray-500">Phone:</span>
                          <span className="text-sm">{viewingUser.phone}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Account Information</h3>
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <span className="text-sm text-gray-500">User ID:</span>
                          <span className="text-sm">{viewingUser.id}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <span className="text-sm text-gray-500">Role:</span>
                          <span className="text-sm">{getRoleName(viewingUser.roleId)}</span>
                        </div>
                        {viewingUser.supplierId && (
                          <div className="grid grid-cols-2 gap-2">
                            <span className="text-sm text-gray-500">Associated Supplier:</span>
                            <span className="text-sm">
                              {suppliers.find(s => s.id === viewingUser.supplierId)?.name}
                            </span>
                          </div>
                        )}
                        <div className="grid grid-cols-2 gap-2">
                          <span className="text-sm text-gray-500">Status:</span>
                          <span className="text-sm">
                            {viewingUser.status === "active" ? (
                              <span className="text-green-600">Active</span>
                            ) : (
                              <span className="text-red-600">Inactive</span>
                            )}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <span className="text-sm text-gray-500">Registered On:</span>
                          <span className="text-sm">{formatDate(viewingUser.registrationDate)}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <span className="text-sm text-gray-500">Last Login:</span>
                          <span className="text-sm flex items-center">
                            <Clock size={14} className="mr-1" />
                            {formatDate(viewingUser.lastLogin)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="address">
                  <div className="space-y-4">
                    <h3 className="font-medium mb-3">Address Information</h3>
                    {viewingUser.address ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                              <span className="text-sm text-gray-500">Street Address:</span>
                              <span className="text-sm">{viewingUser.address.street}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <span className="text-sm text-gray-500">City/Town:</span>
                              <span className="text-sm">{viewingUser.address.city}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <span className="text-sm text-gray-500">Province:</span>
                              <span className="text-sm">{viewingUser.address.province}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <span className="text-sm text-gray-500">Postal Code:</span>
                              <span className="text-sm">{viewingUser.address.postalCode}</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-md">
                          <h4 className="font-medium mb-2">Map View</h4>
                          <p className="text-sm text-gray-500">
                            Map view will be available in a future update.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">
                        No address information available for this user.
                      </p>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="advanced">
                  <div className="space-y-4">
                    <h3 className="font-medium mb-3">Advanced User Details</h3>
                    
                    {viewingUser.roleId === 6 && (
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <span className="text-sm text-gray-500">ID Number:</span>
                          <span className="text-sm">{viewingUser.idNumber || "N/A"}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <span className="text-sm text-gray-500">Entity Reference:</span>
                          <span className="text-sm">{viewingUser.entityReference || "N/A"}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <span className="text-sm text-gray-500">Entity Account ID:</span>
                          <span className="text-sm">{viewingUser.entityAccountId || "N/A"}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <span className="text-sm text-gray-500">Entity ID:</span>
                          <span className="text-sm">{viewingUser.entityId || "N/A"}</span>
                        </div>
                      </div>
                    )}
                    
                    {viewingUser.roleId !== 6 && (
                      <p className="text-sm text-gray-500">
                        No additional details available for this user role.
                      </p>
                    )}
                    
                    <div className="mt-4 p-4 bg-amber-50 rounded-md">
                      <h4 className="font-medium mb-2 flex items-center">
                        <ShieldCheck size={16} className="mr-2 text-amber-500" />
                        Security Information
                      </h4>
                      <p className="text-sm text-gray-700">
                        For security reasons, password information is not visible.
                        Use the "Reset Password" button to initiate a password reset if needed.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="activity">
                  <div className="space-y-4">
                    <h3 className="font-medium mb-3">Activity Log</h3>
                    <div className="bg-gray-50 p-4 rounded-md text-center">
                      <p className="text-sm text-gray-500">
                        Activity log will be available in a future update.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" className="mr-auto" onClick={() => setViewUserId(null)}>
              Close
            </Button>
            <Button variant="outline">Reset Password</Button>
            <Button>Edit User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteUserId !== null} onOpenChange={(open) => !open && setDeleteUserId(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sake-deep-navy">Confirm Deletion</DialogTitle>
          </DialogHeader>
          {deletingUser && (
            <div>
              <p className="mb-4">
                Are you sure you want to delete the user "{deletingUser.firstName} {deletingUser.lastName}"?
                This action cannot be undone.
              </p>
              <p className="text-sm text-gray-500 mb-4">
                User ID: {deletingUser.id}
              </p>
              
              <div className="flex items-center space-x-2 p-3 bg-amber-50 rounded-md mb-4">
                <div className="bg-amber-400 rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <span className="text-sm">
                  You can deactivate the user instead of deleting them.
                </span>
              </div>
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
