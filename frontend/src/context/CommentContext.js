import React, { createContext, useState, useEffect } from 'react';

// Create context
export const CommentContext = createContext();

const CommentProvider = ({ children }) => {
  // Comment state
  const [comments, setComments] = useState([]);

  // Fetch Comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        // const phoneResponse = await fetch('https://e-commerce-hcmus-server-qggz96m4u-c-zus-projects.vercel.app/phone/comments/');
        // const laptopResponse = await fetch('https://e-commerce-hcmus-server-qggz96m4u-c-zus-projects.vercel.app/laptop/comments/');
        const productResponse = await fetch('https://m8mp78nj-8000.asse.devtunnels.ms/api/comments')
        if (productResponse.ok ) {
          const productcommentData = await productResponse.json();   
          setComments(productcommentData);
        } else {
          console.error('Failed to fetch Comments:', productResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching Comments:', error);
      }
    };
    fetchComments();
  }, []);

  return (
    <CommentContext.Provider value={{comments} }>
      {children}
    </CommentContext.Provider>
  );
};

export default CommentProvider;
