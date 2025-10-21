import prisma from "../src/config/prisma.js";

async function main() {
  await prisma.menu.createMany({
    data: [
      {
        name: "Grilled Chicken",
        description: "Tender chicken breast served with herbs",
        price: 15.99,
        image: "/images/chicken.jpg", // 👈 use your actual frontend image paths or URLs
      },
      {
        name: "Classic Burger",
        description: "Juicy beef patty with cheese and pickles",
        price: 10.5,
        image: "/images/burger.jpg",
      },
      {
        name: "Spaghetti Bolognese",
        description: "Italian pasta with rich tomato sauce",
        price: 12.0,
        image: "/images/spaghetti.jpg",
      },
    ],
  });
  console.log("✅ Menu items seeded");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
