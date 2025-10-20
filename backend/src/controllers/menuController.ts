import { Request, Response } from "express";
import prisma from "../config/prisma";

// Get all menu items
export const getMenu = async (req: Request, res: Response) => {
  try {
    const menu = await prisma.menu.findMany();
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu" });
  }
};

// Add a menu item
export const addMenuItem = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const item = await prisma.menu.create({
      data: { name, description, price },
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to add menu item" });
  }
};
