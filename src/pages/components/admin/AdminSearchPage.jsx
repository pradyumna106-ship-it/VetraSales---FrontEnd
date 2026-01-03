import { useState, useMemo } from "react";
import { Input } from "../ui/input";

export function AdminSearchPage({
  products,
  customers,
  admins,
  onBack
}) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("products");

  const results = useMemo(() => {
  const q = query?.toLowerCase() || "";

  if (!q) return [];

  switch (type) {
    case "products":
      return (products || []).filter(p =>
        (p.name || "").toLowerCase().includes(q)
      );

    case "customers":
      return (customers || []).filter(c =>
        (c.username || "").toLowerCase().includes(q) ||
        (c.email || "").toLowerCase().includes(q)
      );

    case "admins":
      return (admins || []).filter(e =>
        (e.username || "").toLowerCase().includes(q)
      );

    default:
      return [];
  }
}, [query, type, products, customers, admins]);


  return (
    <div className="space-y-4">

      {/* Controls */}
      <div className="flex gap-4">
        <Input
          placeholder="Search products, customers, admins..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded-md px-3"
        >
          <option value="products">Products</option>
          <option value="customers">Customers</option>
          <option value="admins">Admins</option>
        </select>
      </div>

      {/* Results */}
      <SearchResults type={type} data={results} />

    </div>
  );
}
function SearchResults({ type, data }) {

  if (!data.length) {
    return <p className="text-gray-500">No results found</p>;
  }

  if (type === "products") {
    return data.map(p => (
      <div key={p.id} className="border p-3 rounded">
        <b>{p.name}</b> – ₹{p.price}
        <span className={p.inStock ? "text-green-600" : "text-red-600"}>
          {p.inStock ? " In Stock" : " Out of Stock"}
        </span>
      </div>
    ));
  }

  if (type === "customers") {
    return data.map(c => (
      <div key={c.id}>
        {c.name} — {c.email}
      </div>
    ));
  }

  if (type === "admins") {
    return data.map(e => (
      <div key={e.id}>
        {e.name} — Godown Staff
      </div>
    ));
  }
}
