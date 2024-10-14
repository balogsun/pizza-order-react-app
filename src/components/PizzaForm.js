import React, { useState } from 'react';
import './PizzaForm.css';

const PizzaForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    toppings: {
      chicken: false,
      pepperoni: false,
      sausage: false,
      mushrooms: false,
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        toppings: {
          ...prev.toppings,
          [name]: checked,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert toppings from object to array of selected toppings
    const selectedToppings = Object.keys(formData.toppings)
      .filter((topping) => formData.toppings[topping]);

    const orderData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      toppings: selectedToppings,
    };

    try {
      const response = await fetch('https://kdvlgeydij.execute-api.ca-central-1.amazonaws.com/dev/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Order placed successfully! Your order ID: ${data.orderId}`);
      } else {
        alert('Error placing order. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error placing order. Please check your internet connection.');
    }
  };

  return (
    <div className="container">
      <header>
        <h2>Your Ultimate Destination for Mouth-Watering Pizzas</h2>
      </header>
      <h2>Let's Get Your Pizza Order Ready</h2>
      <div className="marquee">
        <span>Welcome to the Pizza Paradise! Order your delicious pizza now! 🙂🍕🍕🍕🍕</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-background">
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Your Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <h3>Select Pizza Toppings</h3>
        <div className="toppings">
          <div>
            <input
              type="checkbox"
              id="chicken"
              name="chicken"
              checked={formData.toppings.chicken}
              onChange={handleChange}
            />
            <label htmlFor="chicken"> Chicken</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="pepperoni"
              name="pepperoni"
              checked={formData.toppings.pepperoni}
              onChange={handleChange}
            />
            <label htmlFor="pepperoni"> Pepperoni</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="sausage"
              name="sausage"
              checked={formData.toppings.sausage}
              onChange={handleChange}
            />
            <label htmlFor="sausage"> Sausage</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="mushrooms"
              name="mushrooms"
              checked={formData.toppings.mushrooms}
              onChange={handleChange}
            />
            <label htmlFor="mushrooms"> Mushrooms</label>
          </div>
        </div>

        <button type="submit" className="button">Submit</button>
        <button 
          type="reset" 
          className="button reset" 
          onClick={() => setFormData({
            name: '',
            email: '',
            phone: '',
            toppings: { chicken: false, pepperoni: false, sausage: false, mushrooms: false }
          })}
        >
          Reset
        </button>
      </form>

      <img
        className="pizza-image"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/1280px-Pizza-3007395.jpg"
        alt="Pizza"
      />

      <div className="image-gallery">
        <h3>Check Out More of Our Delicious Pizzas!</h3>
        <div className="gallery">
          <img src="https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg" alt="Pizza 1" />
          <img src="https://www.cobsbread.com/wp-content/uploads/2022/09/Pepperoni-pizza-850x630-1-585x400-1.jpg" alt="Pizza 2" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Pizza_Margherita_stu_spivack.jpg/1280px-Pizza_Margherita_stu_spivack.jpg" alt="Pizza 3" />
        </div>
      </div>

      <footer>
        <p>&copy; 2024 Pizza Paradise. All Rights Reserved.</p>
        <p>Contact: <a href="mailto:seunb@email.com">seunb@email.com</a></p>
      </footer>
    </div>
  );
};

export default PizzaForm;
