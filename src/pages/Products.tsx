
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { ColorfulDivider } from "@/components/ui/colorful-divider";
import { Search, Plus, Filter, FileDown, Edit, Eye, Trash2, X } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { formatCurrency, getStockStatus } from "@/lib/utils";
import { products, suppliers } from "@/lib/mock-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [showActive, setShowActive] = useState(true);
  const [selectedSupplierId, setSelectedSupplierId] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [stockStatus, setStockStatus] = useState("");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [viewProductId, setViewProductId] = useState<number | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);
  
  const { toast } = useToast();
  
  const filteredProducts = products.filter((product) => {
    // Search term filter
    const searchMatch = searchTerm === "" || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Supplier filter
    const supplierMatch = selectedSupplierId === "" || 
      product.supplierId === parseInt(selectedSupplierId);
    
    // Price range filter
    const priceMinMatch = priceMin === "" || 
      (product.salePrice ?? product.originalPrice) >= parseFloat(priceMin);
    
    const priceMaxMatch = priceMax === "" || 
      (product.salePrice ?? product.originalPrice) <= parseFloat(priceMax);
    
    // Stock status filter
    const stockMatch = stockStatus === "" || (
      (stockStatus === "in-stock" && product.stockQuantity > 10) ||
      (stockStatus === "low-stock" && product.stockQuantity > 0 && product.stockQuantity <= 10) ||
      (stockStatus === "out-of-stock" && product.stockQuantity === 0)
    );
    
    // Featured filter
    const featuredMatch = !featuredOnly || product.onHomepage;
    
    return searchMatch && supplierMatch && priceMinMatch && 
           priceMaxMatch && stockMatch && featuredMatch;
  });
  
  const resetFilters = () => {
    setSelectedSupplierId("");
    setPriceMin("");
    setPriceMax("");
    setStockStatus("");
    setFeaturedOnly(false);
  };
  
  const handleDeleteProduct = (id: number) => {
    toast({
      title: "Product deleted",
      description: "The product has been successfully deleted.",
    });
    setDeleteProductId(null);
  };
  
  const viewingProduct = viewProductId !== null 
    ? products.find(p => p.id === viewProductId) 
    : null;
    
  const deletingProduct = deleteProductId !== null
    ? products.find(p => p.id === deleteProductId)
    : null;

  return (
    <DashboardLayout>
      <PageHeader 
        title="Products Management" 
        description="View, add, edit, and delete products"
      >
        <Button className="sake-button-primary flex items-center">
          <Plus size={16} className="mr-1" /> Add Product
        </Button>
      </PageHeader>
      <ColorfulDivider className="mb-8" />
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search products..." 
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
          <h3 className="text-lg font-medium mb-4">Filter Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <Label htmlFor="supplier-filter">Supplier</Label>
              <Select 
                value={selectedSupplierId} 
                onValueChange={setSelectedSupplierId}
              >
                <SelectTrigger id="supplier-filter">
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
              <Label htmlFor="price-range">Price Range</Label>
              <div className="flex gap-2 items-center">
                <Input
                  id="price-min"
                  placeholder="Min"
                  className="w-full"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                />
                <span>-</span>
                <Input
                  id="price-max"
                  placeholder="Max"
                  className="w-full"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="stock-status">Stock Status</Label>
              <Select value={stockStatus} onValueChange={setStockStatus}>
                <SelectTrigger id="stock-status">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="in-stock">In Stock</SelectItem>
                  <SelectItem value="low-stock">Low Stock</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2 pt-8">
              <Checkbox 
                id="featured-only" 
                checked={featuredOnly}
                onCheckedChange={(checked) => setFeaturedOnly(!!checked)}
              />
              <Label htmlFor="featured-only" className="cursor-pointer">
                Featured on Homepage Only
              </Label>
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
              <TableHead className="w-16">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Original Price</TableHead>
              <TableHead>Sale Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead className="w-24">Homepage</TableHead>
              <TableHead className="w-32 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-8">
                  No products found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => {
                const stockStatus = getStockStatus(product.stockQuantity);
                
                return (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>
                      <div className="w-10 h-10 rounded overflow-hidden bg-gray-100">
                        {product.image ? (
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Package size={20} />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="max-w-xs truncate">{product.name}</div>
                    </TableCell>
                    <TableCell>
                      {suppliers.find(s => s.id === product.supplierId)?.name || "Unknown"}
                    </TableCell>
                    <TableCell>{formatCurrency(product.originalPrice)}</TableCell>
                    <TableCell>
                      {product.salePrice ? (
                        <span className="text-sake-teal-blue">
                          {formatCurrency(product.salePrice)}
                        </span>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>
                      <span className={stockStatus.color}>
                        {product.stockQuantity} ({stockStatus.status})
                      </span>
                    </TableCell>
                    <TableCell>{formatCurrency(product.commissionValue)}</TableCell>
                    <TableCell>
                      <Switch checked={product.onHomepage} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => setViewProductId(product.id)}
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
                          onClick={() => setDeleteProductId(product.id)}
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
          Showing <span className="font-medium">{filteredProducts.length}</span> of{" "}
          <span className="font-medium">{products.length}</span> products
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
      
      {/* Product Details Dialog */}
      <Dialog open={viewProductId !== null} onOpenChange={(open) => !open && setViewProductId(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-sake-deep-navy">Product Details</DialogTitle>
          </DialogHeader>
          {viewingProduct && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="rounded-md overflow-hidden bg-gray-100 mb-4">
                  {viewingProduct.image ? (
                    <img
                      src={viewingProduct.image}
                      alt={viewingProduct.name}
                      className="w-full h-auto"
                    />
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center text-gray-400">
                      <Package size={64} />
                    </div>
                  )}
                </div>
                <h3 className="font-medium mb-2">Basic Info</h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-sm text-gray-500">ID:</span>
                    <span className="text-sm">{viewingProduct.id}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-sm text-gray-500">Supplier:</span>
                    <span className="text-sm">
                      {suppliers.find(s => s.id === viewingProduct.supplierId)?.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-sm text-gray-500">Original Price:</span>
                    <span className="text-sm">{formatCurrency(viewingProduct.originalPrice)}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-sm text-gray-500">Sale Price:</span>
                    <span className="text-sm">
                      {viewingProduct.salePrice ? formatCurrency(viewingProduct.salePrice) : "—"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-sm text-gray-500">Stock:</span>
                    <span className={`text-sm ${getStockStatus(viewingProduct.stockQuantity).color}`}>
                      {viewingProduct.stockQuantity}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-sm text-gray-500">Commission:</span>
                    <span className="text-sm">{formatCurrency(viewingProduct.commissionValue)}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-sm text-gray-500">Homepage:</span>
                    <span className="text-sm">
                      {viewingProduct.onHomepage ? (
                        <span className="text-green-600">Yes</span>
                      ) : (
                        <span className="text-gray-500">No</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <h2 className="text-lg font-medium text-sake-deep-navy mb-2">
                    {viewingProduct.name}
                  </h2>
                  <p className="text-gray-700">{viewingProduct.description}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Specifications</h3>
                  <p className="text-gray-700">{viewingProduct.specifications}</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Additional Information</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-sm text-gray-500">Color:</span>
                      <span className="text-sm">{viewingProduct.color}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-sm text-gray-500">Created:</span>
                      <span className="text-sm">{new Date(viewingProduct.created).toLocaleDateString()}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-sm text-gray-500">Last Updated:</span>
                      <span className="text-sm">{new Date(viewingProduct.updated).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewProductId(null)}>
              Close
            </Button>
            <Button>Edit Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteProductId !== null} onOpenChange={(open) => !open && setDeleteProductId(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sake-deep-navy">Confirm Deletion</DialogTitle>
          </DialogHeader>
          {deletingProduct && (
            <div>
              <p className="mb-4">
                Are you sure you want to delete the product "{deletingProduct.name}"?
                This action cannot be undone.
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Product ID: {deletingProduct.id}
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
                  You can archive this product instead of deleting it to keep its history.
                </span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteProductId(null)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => handleDeleteProduct(deleteProductId!)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
    </DashboardLayout>
  );
};

export default Products;
