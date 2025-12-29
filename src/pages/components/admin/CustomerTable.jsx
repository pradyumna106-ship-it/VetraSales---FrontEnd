export default function CustomerTable() {
  const customers = [
    { id: 1, name: "Arjun", orders: 12, spend: "₹8,500" },
    { id: 2, name: "Megha", orders: 3, spend: "₹1,200" },
  ];

  return (
    <div className="bg-white shadow rounded-lg">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Orders</th>
            <th className="p-3 text-left">Total Spend</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.map(user => (
            <tr key={user.id} className="border-t">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.orders}</td>
              <td className="p-3">{user.spend}</td>
              <td className="p-3 flex gap-2">
                <button className="text-blue-600 hover:underline">
                  Profile
                </button>
                <button className="text-purple-600 hover:underline">
                  Orders
                </button>
                <button className="text-gray-600 hover:underline">
                  Reviews
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
