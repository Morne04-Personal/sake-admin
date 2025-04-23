
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Briefcase, Calendar, Users, ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColorfulDivider } from "@/components/ui/colorful-divider";
import { Link } from "react-router-dom";
import { products, suppliers, events, users, activities, notifications } from "@/lib/mock-data";
import { formatCurrency, formatDate, getRelativeTime, getActivityColor } from "@/lib/utils";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

const Dashboard = () => {
  const statsCards = [
    {
      title: "Total Products",
      count: products.length,
      icon: <Package className="h-6 w-6 text-sake-deep-navy" />,
      link: "/products"
    },
    {
      title: "Total Suppliers",
      count: suppliers.length,
      icon: <Briefcase className="h-6 w-6 text-sake-deep-navy" />,
      link: "/suppliers"
    },
    {
      title: "Active Events",
      count: events.filter(event => {
        const now = new Date();
        const endDate = new Date(event.endDate);
        return endDate >= now;
      }).length,
      icon: <Calendar className="h-6 w-6 text-sake-deep-navy" />,
      link: "/events"
    },
    {
      title: "Active Users",
      count: users.filter(user => user.status === "active").length,
      icon: <Users className="h-6 w-6 text-sake-deep-navy" />,
      link: "/users"
    }
  ];
  
  // Calculate stock status data for pie chart
  const stockStatusData = [
    { name: "In Stock", value: products.filter(p => p.stockQuantity > 10).length },
    { name: "Low Stock", value: products.filter(p => p.stockQuantity > 0 && p.stockQuantity <= 10).length },
    { name: "Out of Stock", value: products.filter(p => p.stockQuantity === 0).length }
  ];
  
  const STOCK_COLORS = ["#4CAF50", "#FFC107", "#F44336"];
  
  // Top suppliers by product count
  const topSuppliers = [...suppliers]
    .sort((a, b) => b.productsCount - a.productsCount)
    .slice(0, 5);
  
  // Upcoming events
  const upcomingEvents = events
    .filter(event => new Date(event.startDate) > new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 5);

  return (
    <DashboardLayout>
      <PageHeader title="Dashboard" description="Welcome to the SAKEwinkel Admin Dashboard" />
      <ColorfulDivider className="mb-8" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((card) => (
          <Link to={card.link} key={card.title}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {card.title}
                </CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.count}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.slice(0, 10).map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div className="w-2 h-2 rounded-full mt-2 mr-3" style={{ 
                    backgroundColor: getActivityColor(activity.activityType).replace('text-', '') 
                  }}></div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <p className={`font-medium ${getActivityColor(activity.activityType)}`}>
                        {activity.description}
                      </p>
                      <span className="text-sm text-gray-500">
                        {getRelativeTime(activity.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      by {users.find(u => u.id === activity.userId)?.firstName} {users.find(u => u.id === activity.userId)?.lastName}
                    </p>
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <Button variant="link" className="text-sake-teal-blue hover:text-sake-deep-navy p-0">
                  View all activities <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Products by Stock Status</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stockStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={1}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {stockStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={STOCK_COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Top 5 Suppliers by Product Count</h4>
                <div className="space-y-1">
                  {topSuppliers.map((supplier) => (
                    <div key={supplier.id} className="flex items-center justify-between">
                      <span className="truncate max-w-[200px]">{supplier.name}</span>
                      <span className="font-medium">{supplier.productsCount}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Upcoming Events</h4>
                <div className="space-y-2">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between">
                      <span className="truncate max-w-[200px]">{event.name}</span>
                      <span className="text-sm text-gray-500">{formatDate(event.startDate)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className={`p-3 rounded-md ${notification.read ? 'bg-gray-50' : 'bg-amber-50'}`}>
                  <div className="flex justify-between">
                    <h4 className="font-medium">{notification.message}</h4>
                    <span className="text-xs text-gray-500">{getRelativeTime(notification.timestamp)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button className="sake-button-primary flex items-center justify-center">
                <Plus className="h-5 w-5 mr-2" /> Add New Product
              </Button>
              <Button className="sake-button-primary flex items-center justify-center">
                <Plus className="h-5 w-5 mr-2" /> Add New Supplier
              </Button>
              <Button className="sake-button-primary flex items-center justify-center">
                <Plus className="h-5 w-5 mr-2" /> Add New Event
              </Button>
              <Button className="sake-button-primary flex items-center justify-center">
                <Plus className="h-5 w-5 mr-2" /> Add New User
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
