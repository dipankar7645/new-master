import React, { useState } from 'react';
import { useCart } from '../components/CartContext';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const CheckOut = () => {
  const { cartItems, totalPrice } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    if (!formData.email || !formData.phone || !formData.firstname) {
      alert('Please fill in required fields');
      return;
    }
    navigate('/payment', { state: { cartItems, totalPrice, formData } });
  };

  return (
    <div className="checkout-container">
      <div className="checkout-form">
        <h3>Contact Information</h3>
        <input type="email" name="email" onChange={handleChange} placeholder="Email address" />
        <input type="text" name="phone" onChange={handleChange} placeholder="Phone" />
        <div className="two-inputs">
          <input type="text" name="firstname" onChange={handleChange} placeholder="First name" />
          <input type="text" name="lastname" onChange={handleChange} placeholder="Last name" />
        </div>

        <h3>Billing & Shipping</h3>
        <input type="text" name="address" onChange={handleChange} placeholder="House number and street name" />
        <input type="text" name="city" onChange={handleChange} placeholder="Town / City" />
        <select name="state" onChange={handleChange}>
          <option value="">Select State</option>
          <option>Delhi</option>
          <option>Uttar Pradesh</option>
          <option>Maharashtra</option>
          {/* Add others */}
        </select>
        <input type="text" name="zip" onChange={handleChange} placeholder="ZIP Code" />

        <textarea name="notes" onChange={handleChange} placeholder="Special notes for delivery" />

        <button onClick={handleContinue}>Continue to Payment</button>
      </div>
    </div>
  );
};

export default CheckOut;

// import React, { useState } from 'react';
// import './Checkout.css';

// const CheckOut = () => {
//   const [tip, setTip] = useState('No Tip');
//   const [shippingMethod, setShippingMethod] = useState('pickup');

//   const items = [
//     {
//       name: 'Fish Burger',
//       desc: ['Cheese: American ($0.49)', 'Toppings: Lettuce, Tomato', 'Condiments: Ketchup'],
//       price: 9.48,
//       qty: 1,
//       image: '🍔', // Replace with actual image src in real app
//     },
//     {
//       name: 'Chocolate Brownie',
//       desc: [],
//       price: 4.99,
//       qty: 1,
//       image: '🍫',
//     },
//   ];

//   const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
//   const tax = 1.16;
//   const total = (subtotal + tax).toFixed(2);

//   return (
//     <div className="checkout-container">
//       {/* Left Side - Form */}
//       <div className="checkout-form">
//         <h3>Contact Information</h3>
//         <input type="email" placeholder="Email address" />
//         <input type="text" placeholder="Phone" />
//         <div className="two-inputs">
//           <input type="text" placeholder="First name" />
//           <input type="text" placeholder="Last name" />
//         </div>

//         <h3>Billing & Shipping</h3>
//         <input type="text" placeholder="House number and street name" />
//         <input type="text" placeholder="Town / City" />
//         <select>
//           <option value="search">Select State</option>
//           <option>Andhra Pradesh</option>
//           <option>Arunachal Pradesh</option>
//           <option>Assam</option>
//           <option>Bihar</option>
//           <option>Chhattisgarh</option>
//           <option>Goa</option>
//           <option>Gujarat</option>
//           <option>Haryana</option>
//           <option>Himachal Pradesh</option>
//           <option>Jharkhand</option>
//           <option>Karnataka</option>
//           <option>Kerala</option>
//           <option>Madhya Pradesh</option>
//           <option>Maharashtra</option>
//           <option>Manipur</option>
//           <option>Meghalaya</option>
//           <option>Mizoram</option>
//           <option>Nagaland</option>
//           <option>Odisha</option>
//           <option>Punjab</option>
//           <option>Rajasthan</option>
//           <option>Sikkim</option>
//           <option>Tamil Nadu</option>
//           <option>Telangana</option>
//           <option>Tripura</option>
//           <option>Uttar Pradesh</option>
//           <option>Uttarakhand</option>
//           <option>West Bengal</option>
//           <option>Andaman and Nicobar Islands</option>
//           <option>Chandigarh</option>
//           <option>Dadra and Nagar Haveli and Daman and Diu</option>
//           <option>Delhi</option>
//           <option>Lakshadweep</option>
//           <option>Ladakh</option>
//           <option>Puducherry</option>
//           <option>Jammu and Kashmir</option>
//         </select>
//         <input type="text" placeholder="ZIP Code" />

//         <h3>Additional information</h3>
//         <textarea placeholder="Notes about your order, e.g. special notes for delivery." />
//       </div>

//       {/* Right Side - Summary */}
//       <div className="order-summary">
//         <h3>Order Summary</h3>
//         <div className="shipping-options">
//           <label><input type="radio" checked={shippingMethod === 'pickup'} onChange={() => setShippingMethod('pickup')} /> Local pickup</label>
//           <label><input type="radio" checked={shippingMethod === 'delivery'} onChange={() => setShippingMethod('delivery')} /> Local Delivery: $2.99</label>
//         </div>

//         <label>Pickup Date</label>
//         <select>
//           <option>As soon as possible</option>
//           <option>Tomorrow</option>
//         </select>

//         <ul className="item-list">
//           {items.map((item, idx) => (
//             <li key={idx}>
//               <span className="item-image">{item.image}</span>
//               <div className="item-info">
//                 <strong>{item.name}</strong>
//                 {item.desc.map((line, i) => <div key={i}>{line}</div>)}
//               </div>
//               <span className="item-price">1 x ${item.price.toFixed(2)}</span>
//             </li>
//           ))}
//         </ul>

//         <h4>Tip Amount</h4>
//         <div className="tip-buttons">
//           {['15%', '18%', '22%', 'No Tip', 'Custom Tip'].map((val) => (
//             <button key={val} className={tip === val ? 'selected' : ''} onClick={() => setTip(val)}>
//               {val}
//             </button>
//           ))}
//         </div>

//         <div className="price-summary">
//           <div>Subtotal <span>${subtotal.toFixed(2)}</span></div>
//           <div>Shipping <span>{shippingMethod === 'pickup' ? 'Free!' : '$2.99'}</span></div>
//           <div>Tax <span>${tax.toFixed(2)}</span></div>
//           <div className="total">Total <span>${total}</span></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckOut;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Checkout.css';

// const Checkout = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     address: '',
//     phone: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.address || !formData.phone) {
//       alert('Please fill in all fields');
//       return;
//     }
//     navigate('/payment');
//   };

//   return (
//     <div className="checkout">
//       <h2>Checkout Details</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="name" placeholder="Full Name" onChange={handleChange} />
//         <input type="text" name="address" placeholder="Delivery Address" onChange={handleChange} />
//         <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} />
//         <button type="submit">Continue to Payment</button>
//       </form>
//     </div>
//   );
// };

// export default Checkout;


// import React from 'react';
// import Payment from './Payment';
// import { useNavigate } from 'react-router-dom';

// const CheckoutPage = ({ totalPrice }) => {
//   const navigate = useNavigate();

//   const handleConfirm = (method) => {
//     alert(`Payment method selected: ${method}. Order confirmed!`);
//     // Here, you could call backend APIs to save order, process payment, etc.
//     navigate('/order-success');
//   };

//   return <Payment totalPrice={totalPrice} onConfirm={handleConfirm} />;
// };

// export default CheckoutPage;
