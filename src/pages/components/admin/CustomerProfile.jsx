import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";

/* Default customer data (NO API) */
const customerData = {
  name: "Pradyumna J Kumar",
  email: "pradyumna@example.com",
  phone: "+91 8431362112",
  location: "Bangalore",
  gender: "Male",
  dob: "2001-08-25",
  joinedDate: "2024-01-15",
  status: "Active",

  orders: [
    {
      id: "ORD-1023",
      date: "20 Dec 2025",
      amount: "₹1,200",
      status: "Delivered",
    },
    {
      id: "ORD-1041",
      date: "22 Dec 2025",
      amount: "₹2,500",
      status: "Delivered",
    },
  ],

  reviews: [
    {
      product: "Wireless Earbuds",
      rating: 4,
      comment: "Good sound quality, delivery was a bit late.",
      date: "23 Dec 2025",
    },
    {
      product: "Smart Watch",
      rating: 5,
      comment: "Excellent product. Totally worth it!",
      date: "18 Dec 2025",
    },
  ],
};

export default function CustomerProfile() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* ================= CUSTOMER PROFILE ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Profile</CardTitle>
        </CardHeader>

        <CardContent className="flex gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/avatar.png" />
            <AvatarFallback>
              {customerData.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="grid grid-cols-2 gap-4 flex-1">
            <div>
              <Label>Name</Label>
              <Input value={customerData.name} readOnly />
            </div>

            <div>
              <Label>Email</Label>
              <Input value={customerData.email} readOnly />
            </div>

            <div>
              <Label>Phone</Label>
              <Input value={customerData.phone} readOnly />
            </div>

            <div>
              <Label>Location</Label>
              <Input value={customerData.location} readOnly />
            </div>

            <div>
              <Label>Gender</Label>
              <Input value={customerData.gender} readOnly />
            </div>

            <div>
              <Label>Date of Birth</Label>
              <Input type="date" value={customerData.dob} readOnly />
            </div>

            <div>
              <Label>Account Status</Label>
              <Input value={customerData.status} readOnly />
            </div>

            <div>
              <Label>Joined On</Label>
              <Input value={customerData.joinedDate} readOnly />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================= ORDER HISTORY ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {customerData.orders.map(order => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell className="text-green-600">
                    {order.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ================= PRODUCT REVIEWS ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Product Reviews</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {customerData.reviews.map((review, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 space-y-1"
            >
              <div className="flex justify-between">
                <h4 className="font-medium">{review.product}</h4>
                <span className="text-sm text-gray-500">
                  {review.date}
                </span>
              </div>

              <p className="text-yellow-500">
                {"⭐".repeat(review.rating)}
              </p>

              <p className="text-sm text-gray-700">
                {review.comment}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  );
}
