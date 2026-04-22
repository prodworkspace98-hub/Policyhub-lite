const fs = require('fs');

const firstNames = [
  "John","Jane","Michael","Sarah","David","Emma","Daniel","Olivia","James","Sophia",
  "Liam","Noah","Ava","Isabella","Mason","Lucas","Ethan","Amelia","Harper","Elijah"
];

const lastNames = [
  "Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis",
  "Rodriguez","Martinez","Hernandez","Lopez","Gonzalez","Wilson","Anderson"
];

const productTypes = [
  "Motor Comprehensive",
  "Third Party Motor",
  "Home Insurance",
  "Travel Insurance",
  "Life Cover",
  "Funeral Cover",
  "Business Insurance",
  "Health Insurance"
];

const policyStatuses = ["Active", "Expired", "Cancelled", "Pending"];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateClients(count) {
  return Array.from({ length: count }, (_, i) => {
    const first = randomItem(firstNames);
    const last = randomItem(lastNames);
    return {
      id: i + 1,
      name: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}${i}@example.com`,
      phone: `082${Math.floor(1000000 + Math.random() * 9000000)}`,
      city: "Johannesburg",
      createdAt: new Date().toISOString()
    };
  });
}

function generateProducts(count) {
  return Array.from({ length: count }, (_, i) => {
    const basePremium = Math.floor(300 + Math.random() * 5000);
    return {
      id: i + 1,
      name: `${randomItem(productTypes)} Plan ${i + 1}`,
      category: randomItem(productTypes),
      basePremium,
      active: Math.random() > 0.2
    };
  });
}

function generatePolicies(count, clients, products) {
  return Array.from({ length: count }, (_, i) => {
    const client = randomItem(clients);
    const product = randomItem(products);

    const startDate = randomDate(new Date(2023, 0, 1), new Date());
    const endDate = new Date(startDate);
    endDate.setFullYear(endDate.getFullYear() + 1);

    const premium = product.basePremium + Math.floor(Math.random() * 500);

    return {
      id: i + 1,
      policyNumber: `PH-${String(i + 1).padStart(4, '0')}`,
      clientId: client.id,
      productId: product.id,
      premium,
      status: randomItem(policyStatuses),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      createdAt: new Date().toISOString()
    };
  });
}

const clients = generateClients(150);
const products = generateProducts(150);
const policies = generatePolicies(150, clients, products);

const db = {
  clients,
  products,
  policies
};

fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
console.log("✅ db.json generated with 150 clients, 150 products, and 150 policies");
