import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import Button from "../../components/ui/button/button";
import PhotoModal from "./PhotoModal/PhotoModal";
import freeDelivery from "../../assets/images/freeDelivery.svg";
import returnDelivery from "../../assets/images/returnDelivery.svg";
import styles from "./Product.module.scss";
import { productsListServer } from "../../data/users.data";

const Product = () => {
  const { productName } = useParams();
  const product = productsListServer.find(
    (product) => product.name === productName,
  );

  const [currentImage, setCurrentImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedBrand, setSelectedBrand] = useState<string>(
    product?.filter.brand[0] || "",
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.filter.color[0] || "",
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!product) return;
    if (!product.images.length) return;
    setCurrentImage(product.images[0]);
    setSelectedBrand(product?.filter.brand[0] || "");
    setSelectedColor(product?.filter.color[0] || "");
  }, [product]);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(event.target.value);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(event.target.value);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.linksPage}>
        <NavLink to={"/"}>Home</NavLink>
        <p> / </p>
        <NavLink to={`/categories/${product.category}`}>
          {product.category}
        </NavLink>
        <p> / {product.name}</p>
      </div>

      <div className={styles.product}>
        <div className={styles.images}></div>
        <div className={styles.images}>
          <div className={styles.imagesList}>
            {product.images.map((image, i) => (
              <div
                key={i}
                className={styles.image}
                style={{ backgroundImage: `url(${image})` }}
                onClick={() => setCurrentImage(image)}
              />
            ))}
          </div>
          <div
            className={styles.current}
            style={{ backgroundImage: `url(${currentImage})` }}
            onClick={() => openModal({ currentImage })}
          />
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{product.name}</h1>
          <div className={styles.wrapperPrice}>
            <div className={styles.price}>{product.price}$</div>
            <div className={styles.priceOld}>{product.priceOld}$</div>
          </div>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.filters}>
            <div className={styles.filter}>
              <label htmlFor="brandFilter">Brand:</label>
              <select
                id="brandFilter"
                value={selectedBrand}
                onChange={handleBrandChange}
              >
                {product.filter.brand.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.filter}>
              <label htmlFor="colorFilter">Color:</label>
              <select
                id="colorFilter"
                value={selectedColor}
                onChange={handleColorChange}
              >
                {product.filter.color.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.filterAvailability}>
              <label htmlFor="availabilityFilter">Availability:</label>
              <p>{product.filter.availability[0]}</p>
            </div>
          </div>

          <div className={styles.block}></div>

          <div className={styles.actions}>
            <div className={styles.quantity}>
              <button
                className={styles.minusQuantity}
                onClick={decrementQuantity}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className={styles.addQuantity}
                onClick={incrementQuantity}
              >
                +
              </button>
            </div>

            <Button type="button">Buy now</Button>
            <span className={styles.cart}></span>
          </div>

          <div className={styles.advantage}>
            <div className={styles.col1}>
              <img src={freeDelivery} alt="FREE AND FAST DELIVERY" />
            </div>
            <div className={styles.col2}>
              <h3>FREE DELIVERY</h3>
              <p>Free 30 Days Delivery Returns.</p>
            </div>
            <div className={styles.col3}>
              <p></p>
            </div>
            <div className={styles.col1}>
              <img src={returnDelivery} alt="24/7 CUSTOMER SERVICE" />
            </div>
            <div className={styles.col2}>
              <h3>RETURN DELIVERY</h3>
              <p>Enter your postal code for Delivery Availability</p>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <PhotoModal
            isOpen={isModalOpen}
            images={[{ original: currentImage }]}
            onClose={closeModal}
          />
        )}
      </div>
    </section>
  );
};

export default Product;
