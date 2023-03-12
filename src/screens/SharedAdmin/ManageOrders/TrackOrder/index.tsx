import styles from "./style.module.css";
import logo2 from "../../../../assets/image/logo2.png";
import house from "../../../../assets/image/house.png";
import ellipse from "../../../../assets/image/ellipse.png";

const TrackOrder = () => {
  return (
    <div className={styles.container}>
      <div className='flex-btwn'>
        <h3 className='breadcrumb'>
          <span>MANAGE ORDERS</span> / ORDER DETAILS
        </h3>
      </div>
      <div className={styles.indicators}>
        <Indicator src={logo2} text='IFuel request' />
        <Indicator src={ellipse} text='Vendor' />
        <Indicator src={house} text='Beatrice' />
      </div>
      <div className={styles.vectors}>
        <div className={styles.divider} />
      </div>
      <h3 className={styles.orderInfo}>
        <span className='span-green'>Status:</span> Order has been accepted by
        ABC Oil & Gas. Expected Delivery time 4:30:34s
      </h3>
      <div className={styles.productDetails}>
        <div className='flex-btwn'>
          <h2>Product Details</h2>
          <h2>Price (N)</h2>
        </div>
        <div className='divider' style={{ margin: "15px 0" }} />
        <div className={styles.row}>
          <h3>Product:</h3>
          <div className='flex-btwn' style={{ width: "70%" }}>
            <p>Diesel</p>
            <p>34,500.00</p>
          </div>
        </div>
        <div className={styles.row}>
          <h3>Vendor:</h3>
          <p>Sunny Jay & Co.</p>
        </div>
        <div className={styles.row}>
          <h3>Quantity:</h3>
          <p>100 ltrs</p>
        </div>
        <div className={styles.row}>
          <h3>Delivery Address:</h3>
          <p>No. 1, Bosipo Street, Ikoyi, Lagos</p>
        </div>
        <div className={styles.row}>
          <h3>Recipient</h3>
          <p>Beatrice / 08123456789</p>
        </div>
      </div>
    </div>
  );
};

const Indicator = ({ src, text }: { src: string; text: string }) => {
  return (
    <div className={styles.indicatorContainer}>
      <div className={styles.indicator}>
        <img src={src} />
      </div>
      <p>{text}</p>
    </div>
  );
};

export default TrackOrder;
