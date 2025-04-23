
// Mock data for the SAKEwinkel admin dashboard

// Helper function to generate random dates within a range
const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Mock Products
export const products = [
  {
    id: 1,
    name: "Stellenbosch Reserve Chenin Blanc",
    image: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    supplierId: 1,
    originalPrice: 150.00,
    salePrice: null,
    stockQuantity: 45,
    commissionValue: 22.50,
    onHomepage: true,
    description: "A crisp Chenin Blanc with notes of green apple and tropical fruit. Perfect for summer evenings.",
    specifications: "Alcohol: 13.5%, Region: Stellenbosch",
    color: "White",
    created: "2023-05-12T10:30:00Z",
    updated: "2023-05-12T10:30:00Z"
  },
  {
    id: 2,
    name: "Franschhoek Cellars Cabernet Sauvignon",
    image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    supplierId: 2,
    originalPrice: 220.00,
    salePrice: 189.95,
    stockQuantity: 28,
    commissionValue: 28.49,
    onHomepage: false,
    description: "Bold Cabernet Sauvignon with rich blackcurrant flavors and a hint of oak.",
    specifications: "Alcohol: 14%, Region: Franschhoek",
    color: "Red",
    created: "2023-03-18T14:15:00Z",
    updated: "2023-07-05T09:45:00Z"
  },
  {
    id: 3,
    name: "Paarl Valley Pinotage",
    image: "https://images.unsplash.com/photo-1569919659476-f0852f6834b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    supplierId: 3,
    originalPrice: 180.00,
    salePrice: null,
    stockQuantity: 0,
    commissionValue: 27.00,
    onHomepage: false,
    description: "South Africa's signature varietal with smoky notes and dark fruit flavors.",
    specifications: "Alcohol: 13.8%, Region: Paarl",
    color: "Red",
    created: "2023-04-22T11:20:00Z",
    updated: "2023-08-15T13:10:00Z"
  },
  {
    id: 4,
    name: "Robertson Sauvignon Blanc",
    image: "https://images.unsplash.com/photo-1568213214202-aee0a28567f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    supplierId: 4,
    originalPrice: 130.00,
    salePrice: 109.95,
    stockQuantity: 62,
    commissionValue: 16.49,
    onHomepage: true,
    description: "Crisp and zesty with green pepper and gooseberry notes.",
    specifications: "Alcohol: 12.5%, Region: Robertson",
    color: "White",
    created: "2023-06-10T15:40:00Z",
    updated: "2023-06-10T15:40:00Z"
  },
  {
    id: 5,
    name: "Constantia Glen Five",
    image: "https://images.unsplash.com/photo-1581457226463-75442308507e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    supplierId: 5,
    originalPrice: 450.00,
    salePrice: null,
    stockQuantity: 15,
    commissionValue: 67.50,
    onHomepage: true,
    description: "Premium Bordeaux-style blend with complex structure and aging potential.",
    specifications: "Alcohol: 14.5%, Region: Constantia",
    color: "Red",
    created: "2022-12-05T09:30:00Z",
    updated: "2023-02-15T14:20:00Z"
  },
  {
    id: 6,
    name: "Klein Karoo Chardonnay",
    image: "https://images.unsplash.com/photo-1566200986303-9af160d27857?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    supplierId: 6,
    originalPrice: 160.00,
    salePrice: 135.95,
    stockQuantity: 8,
    commissionValue: 20.39,
    onHomepage: false,
    description: "Buttery Chardonnay with vanilla and citrus notes.",
    specifications: "Alcohol: 13.2%, Region: Klein Karoo",
    color: "White",
    created: "2023-01-15T10:45:00Z",
    updated: "2023-05-20T16:30:00Z"
  },
  {
    id: 7,
    name: "Swartland Syrah",
    image: "https://images.unsplash.com/photo-1558001376-99ae165d9f6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    supplierId: 7,
    originalPrice: 210.00,
    salePrice: null,
    stockQuantity: 34,
    commissionValue: 31.50,
    onHomepage: false,
    description: "Peppery Syrah with dark fruit flavors and a long finish.",
    specifications: "Alcohol: 14.2%, Region: Swartland",
    color: "Red",
    created: "2023-02-08T13:15:00Z",
    updated: "2023-02-08T13:15:00Z"
  },
  {
    id: 8,
    name: "Elgin Valley Pinot Noir",
    image: "https://images.unsplash.com/photo-1546944517-4f38480ff03c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    supplierId: 8,
    originalPrice: 280.00,
    salePrice: 249.95,
    stockQuantity: 0,
    commissionValue: 37.49,
    onHomepage: true,
    description: "Elegant Pinot Noir with red berry notes and silky tannins.",
    specifications: "Alcohol: 13%, Region: Elgin",
    color: "Red",
    created: "2022-11-20T11:25:00Z",
    updated: "2023-07-12T15:10:00Z"
  },
  {
    id: 9,
    name: "Cape Point Sauvignon Blanc Reserve",
    image: "https://images.unsplash.com/photo-1563277552-c735d3fd5639?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    supplierId: 9,
    originalPrice: 195.00,
    salePrice: null,
    stockQuantity: 22,
    commissionValue: 29.25,
    onHomepage: false,
    description: "Complex Sauvignon Blanc with mineral notes and crisp acidity.",
    specifications: "Alcohol: 13.5%, Region: Cape Point",
    color: "White",
    created: "2023-05-05T09:50:00Z",
    updated: "2023-05-05T09:50:00Z"
  },
  {
    id: 10,
    name: "Hemel-en-Aarde Pinot Noir",
    image: "https://images.unsplash.com/photo-1588685562249-cdb4b9671448?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    supplierId: 10,
    originalPrice: 320.00,
    salePrice: 289.95,
    stockQuantity: 18,
    commissionValue: 43.49,
    onHomepage: true,
    description: "Premium Pinot Noir with red fruit flavors and earthy undertones.",
    specifications: "Alcohol: 13.2%, Region: Walker Bay",
    color: "Red",
    created: "2022-10-15T14:30:00Z",
    updated: "2023-04-18T11:15:00Z"
  }
];

// Mock Suppliers
export const suppliers = [
  {
    id: 1,
    name: "Stellenbosch Wine Co.",
    tradingAs: "Stellenbosch Vineyards",
    logo: "https://images.unsplash.com/photo-1573621622238-f7acc736ac13?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    vatRegistered: true,
    vatNumber: "4560123789",
    industryType: "Wine Production",
    description: "Premium wine producer from the Stellenbosch region.",
    contacts: [
      { id: 1, firstName: "Johan", lastName: "van der Merwe", title: "Owner", phone: "0829876543", email: "johan@stellenbosch.co.za", isPrimary: true },
      { id: 2, firstName: "Lisa", lastName: "Joubert", title: "Sales Manager", phone: "0831234567", email: "lisa@stellenbosch.co.za", isPrimary: false }
    ],
    bankingDetails: [
      { id: 1, bankName: "FNB", accountType: "Business", accountNumber: "****5678", branchCode: "250655", isPrimary: true }
    ],
    addresses: [
      { id: 1, type: "Physical", address: "15 Winery Road", city: "Stellenbosch", province: "Western Cape", postalCode: "7600", isPrimary: true },
      { id: 2, type: "Postal", address: "PO Box 1234", city: "Stellenbosch", province: "Western Cape", postalCode: "7599", isPrimary: true }
    ],
    productsCount: 5
  },
  {
    id: 2,
    name: "Franschhoek Cellar Holdings",
    tradingAs: "Franschhoek Cellars",
    logo: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    vatRegistered: true,
    vatNumber: "4982567123",
    industryType: "Wine Production",
    description: "Historic winery in the French Corner of the Cape.",
    contacts: [
      { id: 3, firstName: "Pierre", lastName: "du Toit", title: "CEO", phone: "0834567890", email: "pierre@franschhoek.co.za", isPrimary: true }
    ],
    bankingDetails: [
      { id: 2, bankName: "Standard Bank", accountType: "Business", accountNumber: "****4321", branchCode: "051001", isPrimary: true }
    ],
    addresses: [
      { id: 3, type: "Physical", address: "23 Huguenot Street", city: "Franschhoek", province: "Western Cape", postalCode: "7690", isPrimary: true }
    ],
    productsCount: 3
  },
  {
    id: 3,
    name: "Paarl Wine Estates Ltd",
    tradingAs: "Paarl Valley Wines",
    logo: "https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    vatRegistered: true,
    vatNumber: "4836729156",
    industryType: "Wine Production",
    description: "Family-owned estate producing signature Pinotage since 1956.",
    contacts: [
      { id: 4, firstName: "Susan", lastName: "Louw", title: "Managing Director", phone: "0825671234", email: "susan@paarlvalley.co.za", isPrimary: true },
      { id: 5, firstName: "Willem", lastName: "Louw", title: "Winemaker", phone: "0825671235", email: "willem@paarlvalley.co.za", isPrimary: false }
    ],
    bankingDetails: [
      { id: 3, bankName: "Nedbank", accountType: "Business", accountNumber: "****8765", branchCode: "198765", isPrimary: true }
    ],
    addresses: [
      { id: 4, type: "Physical", address: "45 Main Road", city: "Paarl", province: "Western Cape", postalCode: "7646", isPrimary: true }
    ],
    productsCount: 4
  },
  {
    id: 4,
    name: "Robertson Wine Collective",
    tradingAs: "Robertson Valley Wines",
    logo: "https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    vatRegistered: false,
    vatNumber: null,
    industryType: "Wine Distribution",
    description: "Cooperative of small-scale producers from the Robertson Wine Valley.",
    contacts: [
      { id: 6, firstName: "Jannie", lastName: "Brink", title: "Coordinator", phone: "0841234987", email: "jannie@robertsonwines.co.za", isPrimary: true }
    ],
    bankingDetails: [
      { id: 4, bankName: "ABSA", accountType: "Business", accountNumber: "****1122", branchCode: "632005", isPrimary: true }
    ],
    addresses: [
      { id: 5, type: "Physical", address: "18 Church Street", city: "Robertson", province: "Western Cape", postalCode: "6705", isPrimary: true }
    ],
    productsCount: 2
  },
  {
    id: 5,
    name: "Constantia Wine Farm (Pty) Ltd",
    tradingAs: "Constantia Glen",
    logo: "https://images.unsplash.com/photo-1507434965515-31d0f787afd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    vatRegistered: true,
    vatNumber: "4892736510",
    industryType: "Wine Production",
    description: "Historic estate in the oldest wine-producing region of South Africa.",
    contacts: [
      { id: 7, firstName: "Elizabeth", lastName: "van Breda", title: "Operations Director", phone: "0836549872", email: "elizabeth@constantiaglen.co.za", isPrimary: true }
    ],
    bankingDetails: [
      { id: 5, bankName: "FNB", accountType: "Business", accountNumber: "****3344", branchCode: "250655", isPrimary: true }
    ],
    addresses: [
      { id: 6, type: "Physical", address: "33 Constantia Main Road", city: "Cape Town", province: "Western Cape", postalCode: "7806", isPrimary: true }
    ],
    productsCount: 3
  },
  {
    id: 6,
    name: "Klein Karoo Wine Group",
    tradingAs: "Klein Karoo Wines",
    logo: "https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    vatRegistered: true,
    vatNumber: "4721658903",
    industryType: "Wine Production",
    description: "Specializing in wines from the semi-arid Klein Karoo region.",
    contacts: [
      { id: 8, firstName: "Pieter", lastName: "Swanepoel", title: "CEO", phone: "0823456789", email: "pieter@kleinkaroo.co.za", isPrimary: true }
    ],
    bankingDetails: [
      { id: 6, bankName: "Standard Bank", accountType: "Business", accountNumber: "****5566", branchCode: "051001", isPrimary: true }
    ],
    addresses: [
      { id: 7, type: "Physical", address: "12 Voortrekker Road", city: "Calitzdorp", province: "Western Cape", postalCode: "6660", isPrimary: true }
    ],
    productsCount: 6
  },
  {
    id: 7,
    name: "Swartland Wine Collective",
    tradingAs: "Swartland Winemakers",
    logo: "https://images.unsplash.com/photo-1606768666853-403c90a981ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    vatRegistered: true,
    vatNumber: "4609832175",
    industryType: "Wine Production",
    description: "Innovative winemakers known for natural wines from the Swartland region.",
    contacts: [
      { id: 9, firstName: "Hanlie", lastName: "Louw", title: "Founding Member", phone: "0834569871", email: "hanlie@swartlandwines.co.za", isPrimary: true }
    ],
    bankingDetails: [
      { id: 7, bankName: "Nedbank", accountType: "Business", accountNumber: "****7788", branchCode: "198765", isPrimary: true }
    ],
    addresses: [
      { id: 8, type: "Physical", address: "7 Market Street", city: "Malmesbury", province: "Western Cape", postalCode: "7299", isPrimary: true }
    ],
    productsCount: 5
  },
  {
    id: 8,
    name: "Elgin Apple & Wine Farm",
    tradingAs: "Elgin Valley Vineyards",
    logo: "https://images.unsplash.com/photo-1591735126361-478fb46128de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    vatRegistered: false,
    vatNumber: null,
    industryType: "Mixed Farming",
    description: "Cool-climate wines from the apple-growing region of Elgin.",
    contacts: [
      { id: 10, firstName: "Sarah", lastName: "Johnson", title: "Owner", phone: "0829876543", email: "sarah@elginvalley.co.za", isPrimary: true }
    ],
    bankingDetails: [
      { id: 8, bankName: "ABSA", accountType: "Business", accountNumber: "****9900", branchCode: "632005", isPrimary: true }
    ],
    addresses: [
      { id: 9, type: "Physical", address: "25 Appletree Road", city: "Grabouw", province: "Western Cape", postalCode: "7160", isPrimary: true }
    ],
    productsCount: 2
  },
  {
    id: 9,
    name: "Cape Point Vineyards Ltd",
    tradingAs: "Cape Point Vineyards",
    logo: "https://images.unsplash.com/photo-1577911869466-edf245abd269?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    vatRegistered: true,
    vatNumber: "4567890123",
    industryType: "Wine Production",
    description: "Coastal winery with sea-facing vineyards producing mineral-driven wines.",
    contacts: [
      { id: 11, firstName: "David", lastName: "Smith", title: "Managing Director", phone: "0834567890", email: "david@capepoint.co.za", isPrimary: true }
    ],
    bankingDetails: [
      { id: 9, bankName: "FNB", accountType: "Business", accountNumber: "****1122", branchCode: "250655", isPrimary: true }
    ],
    addresses: [
      { id: 10, type: "Physical", address: "Silvermine Road", city: "Noordhoek", province: "Western Cape", postalCode: "7975", isPrimary: true }
    ],
    productsCount: 3
  },
  {
    id: 10,
    name: "Hemel-en-Aarde Estate",
    tradingAs: "Heaven & Earth Wines",
    logo: "https://images.unsplash.com/photo-1566903697290-3475960daef4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    vatRegistered: true,
    vatNumber: "4512367890",
    industryType: "Wine Production",
    description: "Boutique producer specializing in cool-climate Pinot Noir and Chardonnay.",
    contacts: [
      { id: 12, firstName: "Anthony", lastName: "Hamilton", title: "Winemaker", phone: "0821234567", email: "anthony@hemelenaarde.co.za", isPrimary: true }
    ],
    bankingDetails: [
      { id: 10, bankName: "Standard Bank", accountType: "Business", accountNumber: "****3344", branchCode: "051001", isPrimary: true }
    ],
    addresses: [
      { id: 11, type: "Physical", address: "15 Valley Road", city: "Hermanus", province: "Western Cape", postalCode: "7200", isPrimary: true }
    ],
    productsCount: 4
  }
];

// Mock Events
const today = new Date();
const nextMonth = new Date(today);
nextMonth.setMonth(nextMonth.getMonth() + 1);
const lastMonth = new Date(today);
lastMonth.setMonth(lastMonth.getMonth() - 1);

export const events = [
  {
    id: 1,
    name: "Cape Wine Festival",
    thumbnail: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    startDate: new Date(today.getFullYear(), today.getMonth() + 1, 15).toISOString(),
    endDate: new Date(today.getFullYear(), today.getMonth() + 1, 17).toISOString(),
    featured: true,
    city: "Cape Town",
    venue: "Cape Town International Convention Centre",
    address: "Convention Square, 1 Lower Long Street",
    originalPrice: 350,
    salePrice: 299.95,
    description: "South Africa's premier wine event showcasing over 200 wineries from across the Western Cape.",
    ticketUrl: "https://capewine.com/tickets",
    created: new Date(today.getFullYear(), today.getMonth() - 3, 10).toISOString(),
    updated: new Date(today.getFullYear(), today.getMonth() - 1, 5).toISOString()
  },
  {
    id: 2,
    name: "Stellenbosch Wine Weekend",
    thumbnail: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2).toISOString(),
    endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4).toISOString(),
    featured: true,
    city: "Stellenbosch",
    venue: "Various Estates",
    address: "Stellenbosch Wine Route",
    originalPrice: 450,
    salePrice: null,
    description: "A weekend of cellar tours, tastings, and food pairings at Stellenbosch's finest estates.",
    ticketUrl: "https://stellenboschwineroute.com/weekend",
    created: new Date(today.getFullYear(), today.getMonth() - 2, 15).toISOString(),
    updated: new Date(today.getFullYear(), today.getMonth() - 2, 15).toISOString()
  },
  {
    id: 3,
    name: "Franschhoek Wine Tram Experience",
    thumbnail: "https://images.unsplash.com/photo-1566903697290-3475960daef4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    startDate: new Date(today.getFullYear(), today.getMonth() - 1, 25).toISOString(),
    endDate: new Date(today.getFullYear(), today.getMonth() - 1, 25).toISOString(),
    featured: false,
    city: "Franschhoek",
    venue: "Franschhoek Wine Tram",
    address: "32 Huguenot Road, Franschhoek",
    originalPrice: 250,
    salePrice: 199.95,
    description: "A unique hop-on hop-off tram tour through the Franschhoek Valley, visiting multiple wineries.",
    ticketUrl: "https://winetram.co.za",
    created: new Date(today.getFullYear(), today.getMonth() - 3, 5).toISOString(),
    updated: new Date(today.getFullYear(), today.getMonth() - 3, 5).toISOString()
  },
  {
    id: 4,
    name: "SAKEwinkel Winter Wine Showcase",
    thumbnail: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString(),
    endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString(),
    featured: true,
    city: "Johannesburg",
    venue: "Sandton Convention Centre",
    address: "161 Maude Street, Sandton",
    originalPrice: 200,
    salePrice: 150,
    description: "Exclusive showcase of premium South African wines featured on the Ontbytsake TV program.",
    ticketUrl: "https://sakewinkel.co.za/winter-showcase",
    created: new Date(today.getFullYear(), today.getMonth() - 2, 1).toISOString(),
    updated: new Date(today.getFullYear(), today.getMonth() - 1, 10).toISOString()
  },
  {
    id: 5,
    name: "Constantia Fresh Festival",
    thumbnail: "https://images.unsplash.com/photo-1541971730711-99259c7d94a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    startDate: new Date(today.getFullYear(), today.getMonth() + 2, 8).toISOString(),
    endDate: new Date(today.getFullYear(), today.getMonth() + 2, 9).toISOString(),
    featured: false,
    city: "Cape Town",
    venue: "Buitenverwachting Wine Estate",
    address: "Klein Constantia Road, Constantia",
    originalPrice: 395,
    salePrice: null,
    description: "A celebration of fine wine, gourmet food, and art in the historic Constantia wine valley.",
    ticketUrl: "https://constantiafresh.com",
    created: new Date(today.getFullYear(), today.getMonth() - 1, 20).toISOString(),
    updated: new Date(today.getFullYear(), today.getMonth() - 1, 20).toISOString()
  }
];

// Mock Users
export const users = [
  {
    id: 1,
    firstName: "John",
    lastName: "Admin",
    email: "admin@example.com",
    phone: "0821234567",
    roleId: 1, // Super Admin
    status: "active",
    registrationDate: new Date(today.getFullYear() - 1, 5, 12).toISOString(),
    lastLogin: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).toISOString(),
    address: {
      street: "10 Main Road",
      city: "Cape Town",
      province: "Western Cape",
      postalCode: "8001"
    }
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Manager",
    email: "manager@example.com",
    phone: "0835556666",
    roleId: 2, // Admin
    status: "active",
    registrationDate: new Date(today.getFullYear() - 1, 8, 5).toISOString(),
    lastLogin: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3).toISOString(),
    address: {
      street: "25 Long Street",
      city: "Cape Town",
      province: "Western Cape",
      postalCode: "8001"
    }
  },
  {
    id: 3,
    firstName: "Sam",
    lastName: "Supplier",
    email: "supplier@example.com",
    phone: "0829876543",
    roleId: 4, // Supplier Admin
    supplierId: 1,
    status: "active",
    registrationDate: new Date(today.getFullYear() - 1, 3, 15).toISOString(),
    lastLogin: new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString(),
    address: {
      street: "15 Winery Road",
      city: "Stellenbosch",
      province: "Western Cape",
      postalCode: "7600"
    }
  },
  {
    id: 4,
    firstName: "Lisa",
    lastName: "Joubert",
    email: "lisa@stellenbosch.co.za",
    phone: "0831234567",
    roleId: 5, // Supplier User
    supplierId: 1,
    status: "active",
    registrationDate: new Date(today.getFullYear() - 1, 4, 20).toISOString(),
    lastLogin: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5).toISOString(),
    address: {
      street: "15 Winery Road",
      city: "Stellenbosch",
      province: "Western Cape",
      postalCode: "7600"
    }
  },
  {
    id: 5,
    firstName: "Pierre",
    lastName: "du Toit",
    email: "pierre@franschhoek.co.za",
    phone: "0834567890",
    roleId: 4, // Supplier Admin
    supplierId: 2,
    status: "active",
    registrationDate: new Date(today.getFullYear() - 1, 2, 8).toISOString(),
    lastLogin: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2).toISOString(),
    address: {
      street: "23 Huguenot Street",
      city: "Franschhoek",
      province: "Western Cape",
      postalCode: "7690"
    }
  },
  {
    id: 6,
    firstName: "Michael",
    lastName: "Client",
    email: "michael@client.co.za",
    phone: "0821112222",
    roleId: 6, // Client
    status: "active",
    registrationDate: new Date(today.getFullYear() - 1, 6, 14).toISOString(),
    lastLogin: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10).toISOString(),
    address: {
      street: "42 Beach Road",
      city: "Cape Town",
      province: "Western Cape",
      postalCode: "8005"
    },
    idNumber: "8101015009087",
    entityReference: "Wine Shop Cape Town",
    entityAccountId: "WSC001",
    entityId: 1
  },
  {
    id: 7,
    firstName: "David",
    lastName: "Smith",
    email: "david@capepoint.co.za",
    phone: "0834567890",
    roleId: 4, // Supplier Admin
    supplierId: 9,
    status: "inactive",
    registrationDate: new Date(today.getFullYear() - 1, 1, 30).toISOString(),
    lastLogin: new Date(today.getFullYear(), today.getMonth() - 2, 5).toISOString(),
    address: {
      street: "Silvermine Road",
      city: "Noordhoek",
      province: "Western Cape",
      postalCode: "7975"
    }
  },
  {
    id: 8,
    firstName: "Emma",
    lastName: "Johnson",
    email: "emma@user.co.za",
    phone: "0833334444",
    roleId: 7, // Regular User
    status: "active",
    registrationDate: new Date(today.getFullYear() - 1, 7, 22).toISOString(),
    lastLogin: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).toISOString(),
    address: {
      street: "12 Main Road",
      city: "Johannesburg",
      province: "Gauteng",
      postalCode: "2196"
    }
  },
  {
    id: 9,
    firstName: "William",
    lastName: "Brown",
    email: "william@user.co.za",
    phone: "0824445555",
    roleId: 7, // Regular User
    status: "active",
    registrationDate: new Date(today.getFullYear() - 1, 9, 10).toISOString(),
    lastLogin: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7).toISOString(),
    address: {
      street: "35 Hill Street",
      city: "Durban",
      province: "KwaZulu-Natal",
      postalCode: "4001"
    }
  },
  {
    id: 10,
    firstName: "Sophia",
    lastName: "Taylor",
    email: "sophia@admin.co.za",
    phone: "0823456789",
    roleId: 3, // Admin
    status: "active",
    registrationDate: new Date(today.getFullYear() - 1, 4, 5).toISOString(),
    lastLogin: new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString(),
    address: {
      street: "8 Park Avenue",
      city: "Cape Town",
      province: "Western Cape",
      postalCode: "8001"
    }
  }
];

// Mock Activities
export const activities = [
  {
    id: 1,
    userId: 1,
    activityType: "product_added",
    description: "Added new product: Stellenbosch Reserve Chenin Blanc",
    timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2).toISOString(),
    relatedItemId: 1,
    relatedItemType: "product"
  },
  {
    id: 2,
    userId: 2,
    activityType: "supplier_updated",
    description: "Updated supplier: Franschhoek Cellars",
    timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3).toISOString(),
    relatedItemId: 2,
    relatedItemType: "supplier"
  },
  {
    id: 3,
    userId: 1,
    activityType: "event_created",
    description: "Created event: SAKEwinkel Winter Wine Showcase",
    timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5).toISOString(),
    relatedItemId: 4,
    relatedItemType: "event"
  },
  {
    id: 4,
    userId: 3,
    activityType: "product_updated",
    description: "Updated product: Paarl Valley Pinotage",
    timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).toISOString(),
    relatedItemId: 3,
    relatedItemType: "product"
  },
  {
    id: 5,
    userId: 1,
    activityType: "user_registered",
    description: "New user registered: William Brown",
    timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6).toISOString(),
    relatedItemId: 9,
    relatedItemType: "user"
  },
  {
    id: 6,
    userId: 2,
    activityType: "product_deleted",
    description: "Deleted product: Cape Agulhas Sauvignon Blanc",
    timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString(),
    relatedItemId: null,
    relatedItemType: "product"
  },
  {
    id: 7,
    userId: 10,
    activityType: "user_role_changed",
    description: "Changed role for user: Lisa Joubert (Supplier Admin to Supplier User)",
    timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 4).toISOString(),
    relatedItemId: 4,
    relatedItemType: "user"
  },
  {
    id: 8,
    userId: 1,
    activityType: "order_status_changed",
    description: "Order #ORD-2023-056 changed from Processing to Shipped",
    timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2, 15, 30).toISOString(),
    relatedItemId: 56,
    relatedItemType: "order"
  },
  {
    id: 9,
    userId: 5,
    activityType: "enquiry_received",
    description: "New enquiry received for Franschhoek Cellars Cabernet Sauvignon",
    timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 9, 15).toISOString(),
    relatedItemId: 2,
    relatedItemType: "product"
  },
  {
    id: 10,
    userId: 2,
    activityType: "event_updated",
    description: "Updated event: Cape Wine Festival (Changed venue)",
    timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 45).toISOString(),
    relatedItemId: 1,
    relatedItemType: "event"
  }
];

// Mock Notifications
export const notifications = [
  {
    id: 1,
    type: "low_stock",
    message: "Low stock alert: Paarl Valley Pinotage (0 remaining)",
    timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).toISOString(),
    read: false,
    itemId: 3,
    itemType: "product"
  },
  {
    id: 2,
    type: "expired_event",
    message: "Event expired: Franschhoek Wine Tram Experience",
    timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2).toISOString(),
    read: true,
    itemId: 3,
    itemType: "event"
  },
  {
    id: 3,
    type: "failed_login",
    message: "Failed login attempt for user: admin@example.com",
    timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3).toISOString(),
    read: false,
    itemId: 1,
    itemType: "user"
  },
  {
    id: 4,
    type: "new_user",
    message: "New user registration: William Brown",
    timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6).toISOString(),
    read: true,
    itemId: 9,
    itemType: "user"
  },
  {
    id: 5,
    type: "low_stock",
    message: "Low stock alert: Klein Karoo Chardonnay (8 remaining)",
    timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString(),
    read: false,
    itemId: 6,
    itemType: "product"
  }
];

// Helper functions for formatting
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-ZA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};
