export const packages = [
  {
    id: "calmee-7",
    productName: "Calmee Starter Pack",
    displayName: "Starter Pack",
    quantity: "7 sachet",
    amount: 179999,
  },
  {
    id: "calmee-14",
    productName: "Calmee Routine",
    displayName: "Calmee Routine",
    quantity: "14 sachet",
    amount: 199450,
  },
  {
    id: "calmee-28",
    productName: "Calmee Monthly Ritual",
    displayName: "Monthly Ritual",
    quantity: "28 sachet",
    amount: 369458,
  },
];

export function findPackageById(packageId) {
  return packages.find((pkg) => pkg.id === packageId) || null;
}
