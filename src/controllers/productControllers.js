import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProductsById,
} from "../models/Product.js";

export const getProducts = async (req, res, next) => {
  try {
    const result = await getAllProducts();
    res.status(200).json(result);
  } catch (error) {
    next(error); //Pasar el error al middleware
  }
};

export const getProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await getProductsById(id);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const registerProduct = async (req, res, next) => {
  const { name, price, image } = req.body;
  try {
    const response = await createProduct(name, price, image);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, price, image } = req.body;

  // Validación de entrada
  if (!id) {
    return res.status(400).json({ error: "El campo 'id' es obligatorio." });
  }

  try {
    // Construimos los campos a actualizar dinámicamente
    const fieldsToUpdate = {};
    if (name) fieldsToUpdate.name = name;
    if (price) fieldsToUpdate.price = price;
    if (image) fieldsToUpdate.image = image;

    // Llamamos a la función para actualizar el producto
    const response = await editProduct(fieldsToUpdate, id);

    if (!response) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }

    res.status(200).json(response);
  } catch (error) {
    next(error); // Pasar errores al middleware de manejo de errores
  }
};

export const deleteProducto = async (req, res, next) => {
  const { id } = req.body;

  // Validación de entrada
  if (!id) {
    return res.status(404).json({ error: "No se logró encontrar el producto" });
  }

  try {
    const response = await deleteProduct(id);

    res.status(200).json({ message: "Producto eliminado.", product: response });
  } catch (error) {
    next(error); // Pasar errores al middleware de manejo de errores
  }
};
