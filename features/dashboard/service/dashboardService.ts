import Customer from "@/models/Customer";

export async function getCustomersData(userId: string) {
  const customers = await Customer.find({ owner: userId })
    .select("name phone status createdAt")
    .sort({
      createdAt: -1,
    });

  const total = customers.length;
  const newCount = customers.filter((c) => c.status === "NEW").length;
  const contacted = customers.filter((c) => c.status === "CONTACTED").length;
  const won = customers.filter((c) => c.status === "WON").length;

  const recentCustomers = customers.slice(0, 3);

  const customerData = {
    total,
    newCount,
    contacted,
    won,
    recentCustomers,
  };

  return customerData;
}
