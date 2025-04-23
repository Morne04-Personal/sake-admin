import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { ColorfulDivider } from "@/components/ui/colorful-divider";
import { 
  Search, Plus, Filter, FileDown, Edit, Eye, Trash2, X, CheckCircle, XCircle, Phone, Mail, Briefcase 
} from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { suppliers } from "@/lib/mock-data";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Suppliers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [showActive, setShowActive] = useState(true);
  const [vatStatus, setVatStatus] = useState("");
  const [viewSupplierId, setViewSupplierId] = useState<number | null>(null);
  const [deleteSupplierId, setDeleteSupplierId] = useState<number | null>(null);
  
  const { toast } = useToast();
  
  const filteredSuppliers = suppliers.filter((supplier) => {
    // Search term filter
    const searchMatch = searchTerm === "" || 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.tradingAs.toLowerCase().includes(searchTerm.toLowerCase());
    
    // VAT status filter
    const vatMatch = vatStatus === "" ||
      (vatStatus === "registered" && supplier.vatRegistered) ||
      (vatStatus === "exempt" && !supplier.vatRegistered);
    
    return searchMatch && vatMatch;
  });
  
  const resetFilters = () => {
    setVatStatus("");
  };
  
  const handleDeleteSupplier = (id: number) => {
    toast({
      title: "Supplier deleted",
      description: "The supplier has been successfully deleted.",
    });
    setDeleteSupplierId(null);
  };
  
  const viewingSupplier = viewSupplierId !== null 
    ? suppliers.find(s => s.id === viewSupplierId) 
    : null;
    
  const deletingSupplier = deleteSupplierId !== null
    ? suppliers.find(s => s.id === deleteSupplierId)
    : null;

  return (
    <DashboardLayout>
      <PageHeader 
        title="Suppliers Management" 
        description="View, add, edit, and delete suppliers"
      >
        <Button className="sake-button-primary flex items-center">
          <Plus size={16} className="mr-1" /> Add Supplier
        </Button>
      </PageHeader>
      <ColorfulDivider className="mb-8" />
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search suppliers..." 
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
          
          <div className="flex items-center gap-2">
            <Label className="text-xs font-normal">Show:</Label>
            <Select 
              value={showActive ? "active" : "archived"} 
              onValueChange={(v) => setShowActive(v === "active")}
            >
              <SelectTrigger className="h-9 w-[120px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" className="flex items-center">
            <FileDown size={16} className="mr-1" /> Export
          </Button>
        </div>
      </div>
      
      {filterOpen && (
        <Card className="p-4 mb-6">
          <h3 className="text-lg font-medium mb-4">Filter Suppliers</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="vat-status">VAT Status</Label>
              <Select value={vatStatus} onValueChange={setVatStatus}>
                <SelectTrigger id="vat-status">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="registered">VAT Registered</SelectItem>
                  <SelectItem value="exempt">VAT Exempt</SelectItem>
                </SelectContent>
              </Select>
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
              <TableHead className="w-16">Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Trading As</TableHead>
              <TableHead>VAT Status</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Products</TableHead>
              <TableHead className="w-32 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSuppliers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  No suppliers found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredSuppliers.map((supplier) => {
                const primaryContact = supplier.contacts.find(c => c.isPrimary);
                
                return (
                  <TableRow key={supplier.id}>
                    <TableCell>{supplier.id}</TableCell>
                    <TableCell>
                      <div className="w-10 h-10 rounded overflow-hidden bg-gray-100">
                        {supplier.logo ? (
                          <img 
                            src={supplier.logo} 
                            alt={supplier.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Briefcase size={20} />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="max-w-xs truncate">{supplier.name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate">{supplier.tradingAs}</div>
                    </TableCell>
                    <TableCell>
                      {supplier.vatRegistered ? (
                        <div className="flex items-center">
                          <CheckCircle size={16} className="text-green-600 mr-1" />
                          <span className="text-sm">VAT Registered</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <XCircle size={16} className="text-gray-400 mr-1" />
                          <span className="text-sm">VAT Exempt</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {primaryContact && (
                        <div className="text-sm">
                          <div>{primaryContact.firstName} {primaryContact.lastName}</div>
                          <div className="flex items-center text-gray-500">
                            <Phone size={12} className="mr-1" />
                            <span className="truncate max-w-[100px]">{primaryContact.phone}</span>
                          </div>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-gray-100">
                        {supplier.productsCount} products
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => setViewSupplierId(supplier.id)}
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
                          onClick={() => setDeleteSupplierId(supplier.id)}
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
          Showing <span className="font-medium">{filteredSuppliers.length}</span> of{" "}
          <span className="font-medium">{suppliers.length}</span> suppliers
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-sake-deep-navy text-white">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
      
      {/* Supplier Details Dialog */}
      <Dialog 
        open={viewSupplierId !== null} 
        onOpenChange={(open) => !open && setViewSupplierId(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-sake-deep-navy">Supplier Details</DialogTitle>
          </DialogHeader>
          {viewingSupplier && (
            <div>
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded overflow-hidden bg-gray-100">
                  {viewingSupplier.logo ? (
                    <img 
                      src={viewingSupplier.logo} 
                      alt={viewingSupplier.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Briefcase size={32} />
                    </div>
                  )}
                </div>
                
                <div>
                  <h2 className="text-xl font-medium text-sake-deep-navy">
                    {viewingSupplier.name}
                  </h2>
                  <p className="text-gray-500">Trading as {viewingSupplier.tradingAs}</p>
                  <div className="flex items-center mt-1">
                    {viewingSupplier.vatRegistered ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        VAT Registered
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                        VAT Exempt
                      </Badge>
                    )}
                    <span className="text-sm text-gray-500 ml-2">
                      {viewingSupplier.productsCount} products
                    </span>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="general">
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="general">General Info</TabsTrigger>
                  <TabsTrigger value="contacts">Contacts</TabsTrigger>
                  <TabsTrigger value="banking">Banking Details</TabsTrigger>
                  <TabsTrigger value="addresses">Addresses</TabsTrigger>
                  <TabsTrigger value="products">Products</TabsTrigger>
                </TabsList>
                
                <TabsContent value="general" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-3">Entity Information</h3>
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <span className="text-sm text-gray-500">Entity Name:</span>
                          <span className="text-sm">{viewingSupplier.name}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <span className="text-sm text-gray-500">Trading Name:</span>
                          <span className="text-sm">{viewingSupplier.tradingAs}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <span className="text-sm text-gray-500">VAT Status:</span>
                          <span className="text-sm">
                            {viewingSupplier.vatRegistered ? "VAT Registered" : "VAT Exempt"}
                          </span>
                        </div>
                        {viewingSupplier.vatRegistered && (
                          <div className="grid grid-cols-2 gap-2">
                            <span className="text-sm text-gray-500">VAT Number:</span>
                            <span className="text-sm">{viewingSupplier.vatNumber}</span>
                          </div>
                        )}
                        <div className="grid grid-cols-2 gap-2">
                          <span className="text-sm text-gray-500">Industry Type:</span>
                          <span className="text-sm">{viewingSupplier.industryType}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Business Description</h3>
                      <p className="text-sm">{viewingSupplier.description}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="contacts">
                  <div className="bg-white rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Primary Contact</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {viewingSupplier.contacts.map((contact) => (
                          <TableRow key={contact.id}>
                            <TableCell>
                              {contact.firstName} {contact.lastName}
                            </TableCell>
                            <TableCell>{contact.title}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Phone size={14} className="mr-1" />
                                <span>{contact.phone}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Mail size={14} className="mr-1" />
                                <span>{contact.email}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {contact.isPrimary ? (
                                <Badge className="bg-green-100 text-green-800">
                                  Primary
                                </Badge>
                              ) : null}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button size="sm" variant="ghost">
                                  <Edit size={16} />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="text-sake-red hover:text-sake-red hover:bg-red-50"
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    <div className="p-4">
                      <Button size="sm" className="flex items-center">
                        <Plus size={16} className="mr-1" /> Add Contact
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="banking">
                  <div className="bg-white rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Bank Name</TableHead>
                          <TableHead>Account Type</TableHead>
                          <TableHead>Account Number</TableHead>
                          <TableHead>Branch Code</TableHead>
                          <TableHead>Primary Account</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {viewingSupplier.bankingDetails.map((account) => (
                          <TableRow key={account.id}>
                            <TableCell>{account.bankName}</TableCell>
                            <TableCell>{account.accountType}</TableCell>
                            <TableCell>{account.accountNumber}</TableCell>
                            <TableCell>{account.branchCode}</TableCell>
                            <TableCell>
                              {account.isPrimary ? (
                                <Badge className="bg-green-100 text-green-800">
                                  Primary
                                </Badge>
                              ) : null}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button size="sm" variant="ghost">
                                  <Edit size={16} />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="text-sake-red hover:text-sake-red hover:bg-red-50"
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    <div className="p-4">
                      <Button size="sm" className="flex items-center">
                        <Plus size={16} className="mr-1" /> Add Banking Details
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="addresses">
                  <div className="bg-white rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Type</TableHead>
                          <TableHead>Address</TableHead>
                          <TableHead>City</TableHead>
                          <TableHead>Province</TableHead>
                          <TableHead>Postal Code</TableHead>
                          <TableHead>Primary</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {viewingSupplier.addresses.map((address) => (
                          <TableRow key={address.id}>
                            <TableCell>{address.type}</TableCell>
                            <TableCell>{address.address}</TableCell>
                            <TableCell>{address.city}</TableCell>
                            <TableCell>{address.province}</TableCell>
                            <TableCell>{address.postalCode}</TableCell>
                            <TableCell>
                              {address.isPrimary ? (
                                <Badge className="bg-green-100 text-green-800">
                                  Primary
                                </Badge>
                              ) : null}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button size="sm" variant="ghost">
                                  <Edit size={16} />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="text-sake-red hover:text-sake-red hover:bg-red-50"
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    <div className="p-4">
                      <Button size="sm" className="flex items-center">
                        <Plus size={16} className="mr-1" /> Add Address
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="products">
                  <p className="text-sm text-gray-500 mb-4">
                    Products from this supplier will be displayed here.
                  </p>
                  
                  <Button className="flex items-center">
                    <Plus size={16} className="mr-1" /> Add Product for this Supplier
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewSupplierId(null)}>
              Close
            </Button>
            <Button>Edit Supplier</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteSupplierId !== null} onOpenChange={(open) => !open && setDeleteSupplierId(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sake-deep-navy">Confirm Deletion</DialogTitle>
          </DialogHeader>
          {deletingSupplier && (
            <div>
              <p className="mb-4">
                Are you sure you want to delete the supplier "{deletingSupplier.name}"?
                This action cannot be undone.
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Supplier ID: {deletingSupplier.id}
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
                  This will also delete all associated products and contacts.
                </span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteSupplierId(null)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => handleDeleteSupplier(deleteSupplierId!)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Suppliers;
