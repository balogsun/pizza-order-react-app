// src/components/PizzaForm.js
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="container">
      <header>
        <h1>Your One Stop Shop for Great Pizzas</h1>
      </header>
      <h2>Kindly Make Your Order by Filling the Details Below</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
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
          <label htmlFor="email">Email:</label>
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
          <label htmlFor="phone">Phone No:</label>
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
        <button type="reset" className="button reset" onClick={() => setFormData({
          name: '',
          email: '',
          phone: '',
          toppings: { chicken: false, pepperoni: false, sausage: false, mushrooms: false }
        })}>Reset</button>
      </form>

      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/1280px-Pizza-3007395.jpg"
        alt="Pizza"
      />
      <footer>
        <h4>All Rights Reserved</h4>
      </footer>
    </div>
  );
};

export default PizzaForm;
