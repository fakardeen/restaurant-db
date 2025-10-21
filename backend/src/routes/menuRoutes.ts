import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// ✅ Get all menu items
router.get("/", async (_req: Request, res: Response) => {
  try {
    const menus = await prisma.menu.findMany();
    res.json(menus);
  } catch (error: unknown) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid menu ID" });
    }

    const menu = await prisma.menu.findUnique({
      where: { id },
    });

    if (!menu) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    res.json(menu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch menu item" });
  }
});

// ✅ Update a menu item
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const updatedMenu = await prisma.menu.update({
      where: { id: Number(id) },
      data: { name, description, price },
    });

    res.json(updatedMenu);
  } catch (error: unknown) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
});

// ✅ Delete a menu item
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.menu.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Menu item deleted successfully" });
  } catch (error: unknown) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
});

// ✅ Stream live updates
router.get("/stream", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const sendMenus = async () => {
    const menus = await prisma.menu.findMany();
    res.write(`data: ${JSON.stringify(menus)}\n\n`);
  };

  sendMenus(); // send immediately

  const interval = setInterval(sendMenus, 10000);

  req.on("close", () => clearInterval(interval));
});

// 👇 make sure this is LAST
export default router;
