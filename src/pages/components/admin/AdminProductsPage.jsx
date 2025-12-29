import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function AdminProductsPage({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,   // ✅ FIX
  onBack,
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Manage Products</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onAddProduct}>Add Product</Button>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>

                {/* IMAGE + NAME */}
                <TableCell className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-10 w-10 rounded object-cover"
                  />
                  <span className="font-medium">{product.name}</span>
                </TableCell>

                <TableCell>{product.category}</TableCell>

                <TableCell> {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(product.price)}</TableCell>


                <TableCell>
                  {product.inStock ? (
                    <span className="text-green-600">In Stock</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </TableCell>

                <TableCell className="flex gap-2">
                  <Button size="sm" onClick={() => onEditProduct(product)}>Edit</Button>


                  <Button
                    size="sm"
                    className="bg-red-600 text-white hover:bg-red-700"
                    onClick={() => onDeleteProduct(product.id)}
                    >
                            Delete
                        </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => alert("Navigate to product reviews")}
                  >
                    Reviews
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
