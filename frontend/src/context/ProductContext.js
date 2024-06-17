import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create context
export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  // Product state
  const [products, setProducts] = useState([]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productResponse = await fetch('https://m8mp78nj-8000.asse.devtunnels.ms/api/products/')
        if (productResponse.ok) {
          const productdata = await productResponse.json();   
          setProducts(productdata);
        } else {
          console.error('Failed to fetch products:', productResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Function to delete a product by ID
  const deleteProduct = async (product_id) => {
    try {
      await axios.delete(`https://m8mp78nj-8000.asse.devtunnels.ms/api/products/${product_id}`);
      setProducts(products.filter(product => product.product_id !== product_id));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert("Error deleting product")
    }
  };

  const addProduct = async (newProduct) => {
    try {
      const response = await axios.post(`https://m8mp78nj-8000.asse.devtunnels.ms/api/products`, newProduct);
      setProducts([...products, response.data]);
    } catch (error) {
      console.error('Error adding product:', error);
      alert("Error adding product")
    }
  };

  const updateProduct = async (product_id, updatedProduct) => {
    try {
      const response = await axios.put(`https://m8mp78nj-8000.asse.devtunnels.ms/api/products/${product_id}`, updatedProduct);
      setProducts(products.map(product => (product.product_id === product_id ? response.data : product)));
    } catch (error) {
      console.error('Error updating product:', error);
      alert("Error updating product")
    }
  };



  // Function to find product by ID
  const findProductById = (product_id) => {
    return products.find(product => product.product_id === product_id);
  };

  return (
    <ProductContext.Provider value={{ products, findProductById, deleteProduct, addProduct, updateProduct}}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
