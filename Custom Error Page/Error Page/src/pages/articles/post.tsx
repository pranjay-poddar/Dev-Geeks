// export const getStaticPaths = async () => {
//     return {
//       paths: [],
//       fallback: "blocking",
//     };
//   };
  
//   export const getStaticProps = async (context) => {
//     const { post } = context.params;
//     const response = await fetch(`mydomain.sample/articles/${post}`);
//     const product = await response.json();
  
//     if (!product) {
//       throw new AppError(404);
//     }
  
//     return {
//       props: { data: product },
//       revalidate: 300,
//     };
//   };

// src/pages/articles/[post].tsx
import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";

// Import the custom Error you created for 
import AppError from "../../errors/Customerror";

interface FullProductProps {
  productData: {
    title: string;
    price: number;
  };
}

const FullArticle: React.FC<FullProductProps> = ({ productData }) => {
  return (
    <div>
      <h1>{productData.title}</h1>
      <h2>U$ {productData.price.toFixed(2)}</h2>
    </div>
  );
};

export default FullArticle;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<FullProductProps> = async (
  context
) => {
  const { post } = context.params;

  const response = await fetch(`http://localhost:3333/articles?post=${post}`);

  const products = await response.json();
  const selectedProduct = products[0];

  // throw the custom error when fetch does not receive the expected data
  if (!selectedProduct) {
    throw new AppError(404);
  }

  return {
    props: {
      productData: selectedProduct,
    },
    revalidate: 300,
  };
};