import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DetailProductContext = createContext();

const DetailProductProvider = ({ children }) => {
  const [detailProducts, setDetailProducts] = useState([]);

  useEffect(() => {
    const fetchDetailProducts = async () => {
      try {
        const response = await axios.get('https://m8mp78nj-8000.asse.devtunnels.ms/api/detailproducts/');
        setDetailProducts(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchDetailProducts();
  }, []);
  const deleteDetailProduct = async (detail_product_id) => {
    try {
      await axios.delete(`https://m8mp78nj-8000.asse.devtunnels.ms/api/detailproducts/${detail_product_id}`);
      setDetailProducts(detailProducts.filter(detailProduct => detailProduct.detail_product_id !== detail_product_id));
    } catch (error) {
      console.error('Error deleting detail product:', error);
      alert("Error deleting detail product");
    }
  };

  const addDetailProduct = async (newDetailProduct) => {
    try {
      const response = await axios.post('https://m8mp78nj-8000.asse.devtunnels.ms/api/detailproducts', newDetailProduct);
      setDetailProducts([...detailProducts, newDetailProduct]);
    } catch (error) {
      console.error('Error adding detail product:', error);
      alert("Error adding detail product");
    }
  };

  const updateDetailProduct = async (detail_product_id, updatedDetailProduct) => {
    try {
      const response = await axios.put(`https://m8mp78nj-8000.asse.devtunnels.ms/api/detailproducts/${detail_product_id}`, updatedDetailProduct);
      setDetailProducts(detailProducts.map(detailProduct => 
        detailProduct.detail_product_id === detail_product_id ? updatedDetailProduct : detailProduct
      ));
    } catch (error) {
      console.error('Error updating detail product:', error);
      alert("Error updating detail product");
    }
  };

  const findDetailProductById = (detail_product_id) => {
    return detailProducts.find(detailProduct => detailProduct.detail_product_id === detail_product_id);
  };

  return (
    <DetailProductContext.Provider value={{ detailProducts, deleteDetailProduct, addDetailProduct, updateDetailProduct, findDetailProductById }}>
      {children}
    </DetailProductContext.Provider>
  );
};

export default DetailProductProvider;
