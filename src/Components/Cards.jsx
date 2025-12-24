"use client";
import { useEffect, useState } from "react";
import styles from "./Cards.module.css";
import Image from "next/image";

const Cards = () => {
  const [products, setProducts] = useState(null);
  const [deletedProducts, setDeletedProducts] = useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((result) => setProducts(result));
  }, []);
  const handleClick = (item) => {
    setDeletedProducts([...deletedProducts, item]);
    setProducts((prev) => prev.filter((p) => p.id !== item.id));
  };
  if (products === null) {
    return <h1 className={styles.renderingText}>Products are rendering...</h1>;
  }
  return (
    <>
      <div className={styles.cardContainer}>
        {products?.map((item) => {
          return (
            <div key={item.id} className={styles.card}>
              <Image
                src={item.image}
                width={100}
                height={100}
                alt={item.title}
              ></Image>
              <h4>{item.title}</h4>
              <p>{item.category}</p>
              <div className={styles.description}>
                <p>{item.description}</p>
              </div>
              <div className={styles.btnWrapper}>
                <button>{item.price}</button>
                <button
                  onClick={() => {
                    handleClick(item);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <h1 className={styles.deletedCardText}>Deleted Products:</h1>
      <div className={styles.cardContainer}>
        {deletedProducts?.map((item) => {
          return (
            <div key={item.id} className={styles.card}>
              <Image
                src={item.image}
                width={100}
                height={100}
                alt={item.title}
              ></Image>
              <h4>{item.title}</h4>
              <p>{item.category}</p>
              <div className={styles.description}>
                <p>{item.description}</p>
              </div>
              <div className={styles.btnWrapper}>
                <button>{item.price}</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Cards;
