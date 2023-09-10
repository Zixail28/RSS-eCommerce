import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import Button from "../../components/ui/Button/Button";
import PhotoModal from "./PhotoModal/PhotoModal";
import freeDelivery from "../../assets/images/freeDelivery.svg";
import returnDelivery from "../../assets/images/returnDelivery.svg";
import styles from "./Product.module.scss";
import { productsListServer } from "../../data/users.data";
import { useAppDispatch } from "../../hooks/hooks";
import { fetchProduct } from "../../services/products/productThunk";

const Product = () => {
  const { productName, productId } = useParams();
  const product = productsListServer.find(
    (product) => product.name === productName,
  );

  const dispatch = useAppDispatch();

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

  const [description, setDescription] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [priceOld, setPriceOld] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProduct(productId)).then((resultAction) => {
        if (fetchProduct.fulfilled.match(resultAction)) {
          const productData = resultAction.payload;
          setDescription(
            productData.masterData.current.description["en-US"] || "",
          );
          setCurrentImage(
            productData.masterData.current.masterVariant.images[0],
          );
          setName(productData.masterData.current.name["en-US"]);
          setPrice(
            String(
              productData.masterData.staged.masterVariant.prices[0].value
                .centAmount / 10,
            ),
          );
          setPriceOld(
            String(
              productData.masterData.staged.masterVariant.prices[0].discounted
                .value.centAmount / 10,
            ),
          );
          const imagesAll = productData.masterData.current.masterVariant.images;
          const images: string[] = [];
          for (let k = 0; k < imagesAll.length; k++) {
            images.push(imagesAll[k].url);
          }
          setImages(images);
          setCurrentImage(images[0]);
        }
      });
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (!product) return;
    if (!product.images.length) return;
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
        <p> / {name}</p>
      </div>

      <div className={styles.product}>
        <div className={styles.images}></div>
        <div className={styles.images}>
          <div className={styles.imagesList}>
            {images.map((image, i) => (
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
            onClick={() => openModal()} // было onClick={() => openModal({ currentImage })}
          />
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{name}</h1>
          <div className={styles.wrapperPrice}>
            <div className={styles.price}>{price}$</div>
            <div className={styles.priceOld}>{priceOld}$</div>
          </div>
          <p className={styles.description}>{description}</p>

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
