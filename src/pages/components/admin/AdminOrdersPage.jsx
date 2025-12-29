import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";

export function AdminOrdersPage({ orders, onUpdateStatus }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders Management</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Packed By</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>

                <TableCell className="font-medium">
                  {order.id}
                </TableCell>

                <TableCell>
                  <div className="flex flex-col">
                    <span>{order.customerName}</span>
                    <span className="text-sm text-muted-foreground">
                      {order.customerEmail}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  ₹{order.totalAmount}
                </TableCell>

                <TableCell>
                  <span
                    className={
                      order.paymentStatus === "Paid"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {order.paymentStatus}
                  </span>
                </TableCell>

                <TableCell>
                  <span className="capitalize">
                    {order.orderStatus}
                  </span>
                </TableCell>

                <TableCell>
                  {order.packedBy || "Not Assigned"}
                </TableCell>

                <TableCell className="flex gap-2">
                    <OrderActions
                    onPlace={() => handlePlaceOrder(order.id)}
                    onDeliver={() => handleDeliverOrder(order.id)}
                    onShip={() => handleShipOrder(order.id)}
                    />

                  <Button
                    size="sm"
                    variant="destructive"
                    className="bg-red-500 text-white hover:bg-red-600"
                    onClick={() => onUpdateStatus(order.id, "Cancelled")}
                  >
                    Cancel
                  </Button>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function OrderActions({ onPlace, onDeliver, onShip }) {
  return (
    <div className="flex gap-2">
      <Button size="sm" variant="primary" onClick={onPlace}>
        Place
      </Button>
      <Button size="sm" variant="secondary" onClick={onDeliver}>
        Deliver
      </Button>
      <Button size="sm" variant="destructive" onClick={onShip} className="bg-gray-400 text-white hover:bg-gray-500">
        Ship
      </Button>
    </div>
  );
}
