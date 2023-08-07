import { Router } from "express";
import * as productService from "../services/product.services.js";
import * as cartService from "../services/cart.services.js";

const router = Router();

router.get("/products", async (req, res) => {
  try {
    const { user } = req.session;
    const { page } = req.query;
    const {
      payload: products,
      totalPages,
      prevPage,
      nextPage,
      page: currentPage,
      hasPrevPage,
      hasNextPage,
    } = await productService.getAllPaginated({ page, limit: 2 });

    const plainProducts = products.map((product) => product.toObject());

    res.render("products", {
      user,
      products: plainProducts,
      totalPages,
      currentPage,
      prevPage,
      nextPage,
      hasPrevPage,
      hasNextPage,
      prevLink: `/products?page=${prevPage}`,
      nextLink: `/products?page=${nextPage}`,
    });
  } catch (error) {
    res.render("error", { message: error, code: 500 });
  }
});

router.get("/carts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log({ id });
    const cart = await cartService.getById(id);
    const plainItems = cart.items.map((item) => ({
      ...item.toObject(),
      totalPrice: item.product.price * item.quantity,
    }));
    console.log(plainItems);
    res.render("cart", { items: plainItems, id: cart._id });
  } catch (error) {
    res.render("error", { message: error, code: 500 });
  }
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/error-register", (req, res) => {
  res.render("errorRegister");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/error-login", (req, res) => {
  res.render("errorLogin");
});

export default router;
