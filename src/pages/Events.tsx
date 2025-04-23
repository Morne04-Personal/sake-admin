import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { ColorfulDivider } from "@/components/ui/colorful-divider";
import { 
  Search, Plus, Filter, FileDown, Edit, Eye, Trash2, X, Calendar as CalendarIcon, List 
} from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate, getEventStatus } from "@/lib/utils";
import { events } from "@/lib/mock-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { EventForm } from "@/components/forms/EventForm";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

type Event = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  city: string;
  venue: string;
  description?: string;
  originalPrice: number;
  salePrice?: number;
  address: string;
  thumbnail?: string;
  featured: boolean;
  ticketUrl: string;
  created: string;
  updated: string;
};

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewType, setViewType] = useState<"list" | "calendar">("list");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [viewEventId, setViewEventId] = useState<number | null>(null);
  const [deleteEventId, setDeleteEventId] = useState<number | null>(null);
  const [addEventOpen, setAddEventOpen] = useState(false);
  const [editEventId, setEditEventId] = useState<number | null>(null);
  
  const { toast } = useToast();
  
  const filteredEvents = events.filter((event) => {
    const searchMatch = searchTerm === "" || 
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchTerm.toLowerCase());
    
    const now = new Date();
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);
    
    let statusMatch = true;
    if (selectedStatus === "upcoming") {
      statusMatch = now < start;
    } else if (selectedStatus === "ongoing") {
      statusMatch = now >= start && now <= end;
    } else if (selectedStatus === "past") {
      statusMatch = now > end;
    }
    
    const featuredMatch = !featuredOnly || event.featured;
    
    return searchMatch && statusMatch && featuredMatch;
  });
  
  const resetFilters = () => {
    setSelectedStatus("");
    setFeaturedOnly(false);
  };
  
  const handleDeleteEvent = (id: number) => {
    toast({
      title: "Event deleted",
      description: "The event has been successfully deleted.",
    });
    setDeleteEventId(null);
  };
  
  const handleAddEvent = (data: any) => {
    toast({
      title: "Event created",
      description: "The new event has been successfully created.",
    });
    setAddEventOpen(false);
  };
  
  const handleEditEvent = (data: any) => {
    toast({
      title: "Event updated",
      description: "The event has been successfully updated.",
    });
    setEditEventId(null);
  };
  
  const viewingEvent = viewEventId !== null 
    ? events.find(e => e.id === viewEventId) 
    : null;
    
  const deletingEvent = deleteEventId !== null
    ? events.find(e => e.id === deleteEventId)
    : null;

  const editingEvent = editEventId !== null
    ? events.find(e => e.id === editEventId)
    : null;

  return (
    <DashboardLayout>
      <PageHeader 
        title="Events Management" 
        description="View, add, edit, and delete events"
      >
        <Button 
          className="sake-button-primary flex items-center"
          onClick={() => setAddEventOpen(true)}
        >
          <Plus size={16} className="mr-1" /> Add Event
        </Button>
      </PageHeader>
      <ColorfulDivider className="mb-8" />
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search events..." 
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
          
          <div className="flex items-center gap-1">
            <Button 
              variant={viewType === "list" ? "default" : "outline"}
              size="icon" 
              onClick={() => setViewType("list")}
            >
              <List size={18} />
            </Button>
            <Button 
              variant={viewType === "calendar" ? "default" : "outline"}
              size="icon" 
              onClick={() => setViewType("calendar")}
            >
              <CalendarIcon size={18} />
            </Button>
          </div>
          
          <Button variant="outline" className="flex items-center">
            <FileDown size={16} className="mr-1" /> Export
          </Button>
        </div>
      </div>
      
      {filterOpen && (
        <Card className="p-4 mb-6">
          <h3 className="text-lg font-medium mb-4">Filter Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="event-status">Event Status</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger id="event-status">
                  <SelectValue placeholder="All Events" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Events</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="past">Past</SelectItem>
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
                Featured Events Only
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
      
      {viewType === "list" ? (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">ID</TableHead>
                <TableHead className="w-16">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Date Range</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="w-32 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    No events found. Try adjust your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredEvents.map((event) => {
                  const eventStatus = getEventStatus(event.startDate, event.endDate);
                  
                  return (
                    <TableRow key={event.id}>
                      <TableCell>{event.id}</TableCell>
                      <TableCell>
                        <div className="w-10 h-10 rounded overflow-hidden bg-gray-100">
                          {event.thumbnail ? (
                            <img 
                              src={event.thumbnail} 
                              alt={event.name} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <CalendarIcon size={20} />
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="max-w-xs truncate">{event.name}</div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="flex items-center">
                            <Badge className={`${eventStatus.bgColor} ${eventStatus.color} mr-2`}>
                              {eventStatus.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {formatDate(event.startDate)} - {formatDate(event.endDate)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{event.city}</div>
                          <div className="text-sm text-gray-500">{event.venue}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {event.salePrice ? (
                          <div>
                            <span className="line-through text-gray-400">
                              {formatCurrency(event.originalPrice)}
                            </span>
                            <div className="text-sake-teal-blue">
                              {formatCurrency(event.salePrice)}
                            </div>
                          </div>
                        ) : (
                          formatCurrency(event.originalPrice)
                        )}
                      </TableCell>
                      <TableCell>
                        <Switch checked={event.featured} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => setViewEventId(event.id)}
                          >
                            <Eye size={16} />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => setEditEventId(event.id)}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-sake-red hover:text-sake-red hover:bg-red-50"
                            onClick={() => setDeleteEventId(event.id)}
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
      ) : (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border p-6">
          <div className="text-center p-8">
            <CalendarIcon size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium">Calendar View</h3>
            <p className="text-gray-500">
              The calendar view is coming soon in the next update.
            </p>
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">{filteredEvents.length}</span> of{" "}
          <span className="font-medium">{events.length}</span> events
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
      
      <Dialog open={viewEventId !== null} onOpenChange={(open) => !open && setViewEventId(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-sake-deep-navy">Event Details</DialogTitle>
          </DialogHeader>
          {viewingEvent && (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="rounded-lg overflow-hidden mb-4 bg-gray-100">
                    {viewingEvent.thumbnail ? (
                      <img 
                        src={viewingEvent.thumbnail} 
                        alt={viewingEvent.name} 
                        className="w-full h-auto"
                      />
                    ) : (
                      <div className="w-full h-48 flex items-center justify-center text-gray-400">
                        <CalendarIcon size={64} />
                      </div>
                    )}
                  </div>
                  
                  <h2 className="text-xl font-medium text-sake-deep-navy mb-2">
                    {viewingEvent.name}
                  </h2>
                  
                  <div className="flex items-center mb-4">
                    <Badge className={`${getEventStatus(viewingEvent.startDate, viewingEvent.endDate).bgColor} ${getEventStatus(viewingEvent.startDate, viewingEvent.endDate).color} mr-2`}>
                      {getEventStatus(viewingEvent.startDate, viewingEvent.endDate).status}
                    </Badge>
                    
                    {viewingEvent.featured && (
                      <Badge className="bg-blue-100 text-blue-800">
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-4">
                    {viewingEvent.description}
                  </p>
                  
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Event Details</h3>
                    <div className="grid grid-cols-2 gap-y-2">
                      <span className="text-sm text-gray-500">Date Range:</span>
                      <span className="text-sm">
                        {formatDate(viewingEvent.startDate)} - {formatDate(viewingEvent.endDate)}
                      </span>
                      
                      <span className="text-sm text-gray-500">Price:</span>
                      <span className="text-sm">
                        {viewingEvent.salePrice ? (
                          <div>
                            <span className="line-through text-gray-400">
                              {formatCurrency(viewingEvent.originalPrice)}
                            </span>{' '}
                            <span>{formatCurrency(viewingEvent.salePrice)}</span>
                          </div>
                        ) : (
                          formatCurrency(viewingEvent.originalPrice)
                        )}
                      </span>
                      
                      <span className="text-sm text-gray-500">Ticket URL:</span>
                      <a href={viewingEvent.ticketUrl} target="_blank" className="text-sm text-sake-teal-blue hover:underline">
                        {viewingEvent.ticketUrl}
                      </a>
                      
                      <span className="text-sm text-gray-500">Created:</span>
                      <span className="text-sm">{formatDate(viewingEvent.created)}</span>
                      
                      <span className="text-sm text-gray-500">Last Updated:</span>
                      <span className="text-sm">{formatDate(viewingEvent.updated)}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Location</h3>
                    <div className="space-y-1">
                      <p className="font-medium">{viewingEvent.venue}</p>
                      <p className="text-sm">{viewingEvent.address}</p>
                      <p className="text-sm">{viewingEvent.city}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-gray-100 rounded-lg p-4 flex items-center">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                      <CalendarIcon size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">View on Map</p>
                      <p className="text-sm text-gray-500">Coming soon in next update</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewEventId(null)}>
              Close
            </Button>
            <Button onClick={() => {
              setViewEventId(null);
              setEditEventId(viewingEvent?.id || null);
            }}>
              Edit Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={addEventOpen} onOpenChange={setAddEventOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>
          <EventForm onSubmit={handleAddEvent} />
        </DialogContent>
      </Dialog>
      
      <Dialog open={editEventId !== null} onOpenChange={(open) => !open && setEditEventId(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
          </DialogHeader>
          {editingEvent && (
            <EventForm 
              onSubmit={handleEditEvent} 
              defaultValues={{
                name: editingEvent.name,
                startDate: editingEvent.startDate,
                endDate: editingEvent.endDate,
                city: editingEvent.city,
                venue: editingEvent.venue,
                description: editingEvent.description || '',
                originalPrice: editingEvent.originalPrice,
                salePrice: editingEvent.salePrice || undefined,
              }}
            />
          )}
        </DialogContent>
      </Dialog>
      
      <Dialog open={deleteEventId !== null} onOpenChange={(open) => !open && setDeleteEventId(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sake-deep-navy">Confirm Deletion</DialogTitle>
          </DialogHeader>
          {deletingEvent && (
            <div>
              <p className="mb-4">
                Are you sure you want to delete the event "{deletingEvent.name}"?
                This action cannot be undone.
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Event ID: {deletingEvent.id}
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
                  If this is a past event, consider archiving it instead.
                </span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteEventId(null)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => handleDeleteEvent(deleteEventId!)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Events;
