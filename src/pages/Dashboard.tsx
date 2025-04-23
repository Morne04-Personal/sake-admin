import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Briefcase, Calendar, Users, ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColorfulDivider } from "@/components/ui/colorful-divider";
import { Link } from "react-router-dom";
import { products, suppliers, events, users, activities, notifications, orders } from "@/lib/mock-data";
import { formatCurrency, formatDate, getRelativeTime, getActivityColor } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const recentOrders = [...(orders || [])]
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  .slice(0, 5);

function getOrderStats(orders) {
  const stats = {};
  const now = new Date();
  for (let i = 13; i >= 0; i--) {
    const dt = new Date(now);
    dt.setDate(now.getDate() - i);
    const key = dt.toISOString().slice(0, 10);
    stats[key] = 0;
  }
  for (const order of orders) {
    const key = new Date(order.createdAt).toISOString().slice(0, 10);
    if (stats[key] !== undefined) stats[key]++;
  }
  return Object.entries(stats).map(([date, count]) => ({
    date,
    count,
  }));
}

const orderStats = getOrderStats(orders || []);

const topSuppliersBySales = [...(suppliers || [])]
  .map(supplier => {
    const sales = (orders || [])
      .filter(order => order.supplierId === supplier.id)
      .reduce((sum, o) => sum + (o.total || 0), 0);
    return { ...supplier, sales };
  })
  .sort((a, b) => b.sales - a.sales)
  .slice(0, 5);

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

  return (
    <DashboardLayout>
      <PageHeader title="Dashboard" description="Welcome to the SAKEwinkel Admin Dashboard" />

      <ColorfulDivider className="mb-8" />

      <div className="mb-6 flex flex-wrap gap-3">
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
            <CardTitle className="text-lg">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-gray-900 bg-gray-100">
                    <th className="px-2 py-2 text-left">Order #</th>
                    <th className="px-2 py-2 text-left">Customer</th>
                    <th className="px-2 py-2 text-left">Supplier</th>
                    <th className="px-2 py-2 text-left">Date</th>
                    <th className="px-2 py-2 text-left">Total</th>
                    <th className="px-2 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-4 text-center text-gray-500">No recent orders</td>
                    </tr>
                  )}
                  {recentOrders.map(order => {
                    const customer = users.find(u => u.id === order.userId);
                    const supplier = suppliers.find(s => s.id === order.supplierId);
                    return (
                      <tr key={order.id} className="border-b last:border-b-0">
                        <td className="px-2 py-2 font-mono">{order.orderNumber || order.id}</td>
                        <td className="px-2 py-2">{customer ? `${customer.firstName} ${customer.lastName}` : "N/A"}</td>
                        <td className="px-2 py-2">{supplier ? supplier.name : "N/A"}</td>
                        <td className="px-2 py-2">{formatDate(order.createdAt)}</td>
                        <td className="px-2 py-2">{formatCurrency(order.total)}</td>
                        <td className="px-2 py-2 capitalize">{order.status || "Pending"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="pt-2">
                <Button variant="link" className="text-sake-teal-blue hover:text-sake-deep-navy p-0">
                  View all orders <ArrowRight className="h-4 w-4 ml-1" />
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
                <h4 className="text-sm font-medium mb-2">Orders Over Last 14 Days</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={orderStats}>
                      <XAxis dataKey="date" tickFormatter={d => d.slice(5)} fontSize={12} />
                      <YAxis allowDecimals={false} fontSize={12} />
                      <Tooltip />
                      <Line type="monotone" dataKey="count" stroke="#4F46E5" strokeWidth={2} dot />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Top 5 Suppliers by Sales</h4>
                <div className="space-y-1">
                  {topSuppliersBySales.map((supplier) => (
                    <div key={supplier.id} className="flex items-center justify-between">
                      <span className="truncate max-w-[200px]">{supplier.name}</span>
                      <span className="font-medium">{formatCurrency(supplier.sales)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Upcoming Events</h4>
                <div className="space-y-2">
                  {events
                    .filter(event => new Date(event.startDate) > new Date())
                    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
                    .slice(0, 5)
                    .map((event) => (
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

      <div className="mb-8">
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
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
