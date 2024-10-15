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

  const [isLoading, setIsLoading] = useState(false); // For loading state

  // Handle input changes (for text fields and checkboxes)
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
      toppings: selectedToppings, // Ensure toppings is sent as an array
    };

    if (!orderData.name || !orderData.email || !orderData.phone || selectedToppings.length === 0) {
      alert('Please fill all fields and select at least one topping.');
      return;
    }

    try {
      setIsLoading(true); // Set loading state

      // Create the payload as a string nested under the "body" key
      const payload = {
        body: JSON.stringify(orderData) // The body should contain a stringified JSON object
      };

      const response = await fetch('https://kdvlgeydij.execute-api.ca-central-1.amazonaws.com/dev/pizzaorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // Send the payload as JSON
      });

      // Handle the API response
      if (response.ok) {
        const data = await response.json();

        // The `body` in the response is a string, so parse it first
        const parsedBody = JSON.parse(data.body);

        // Check if `orderId` is present and alert accordingly
        if (parsedBody.orderId) {
          alert(`Order placed successfully! Your order ID: ${parsedBody.orderId}`);
        } else {
          alert('Order placed successfully, but order ID is not available in the response.');
        }
      } else {
        const errorData = await response.json();
        alert(`Error placing order: ${errorData.message || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error placing order. Please check your internet connection.');
    } finally {
      setIsLoading(false); // End loading state
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
        
        <button type="submit" className="order-button" disabled={isLoading}>
          {isLoading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default PizzaForm;
