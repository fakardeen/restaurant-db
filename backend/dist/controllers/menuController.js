"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMenuItem = exports.getMenu = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
// Get all menu items
const getMenu = async (req, res) => {
    try {
        const menu = await prisma_1.default.menu.findMany();
        res.status(200).json(menu);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch menu" });
    }
};
exports.getMenu = getMenu;
// Add a menu item
const addMenuItem = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const item = await prisma_1.default.menu.create({
            data: { name, description, price },
        });
        res.status(201).json(item);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to add menu item" });
    }
};
exports.addMenuItem = addMenuItem;
