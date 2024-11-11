import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import emailjs from "emailjs-com";

const Contact = () => {
  const contacts = [
    {
      platform: "LinkedIn",
      handle: "kanchan3",
      icon: <FaLinkedin />,
      link: "https://www.linkedin.com/in/kanchan3/",
    },
    {
      platform: "Instagram",
      handle: "@kancu_0",
      icon: <FaInstagram />,
      link: "https://instagram.com/kancu_0",
    },
  ];

  // State for form data and visibility
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showForm, setShowForm] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      to_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        "service_jfste8d", // replace with your service ID
        "template_6hujcs1", // replace with your template ID
        templateParams,
        "iWAsLN1RVWRfoTeos" // replace with your user ID
      )
      .then(
        () => {
          alert("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          alert("Failed to send message, please try again.");
          console.error(error);
        }
      );
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5">Let's Connect!</h2>

      {/* Social Media Cards */}
      <div className="row d-flex justify-content-center">
        {contacts.map((contact, index) => (
          <div key={index} className="col-md-4 mb-4">
            <Card
              className="h-100 shadow border-0 text-center"
              style={{ backgroundColor: "#343a40", color: "#f8f9fa" }}>
              <Card.Body>
                <Card.Title>
                  {contact.icon} {contact.platform}
                </Card.Title>
                <Card.Text className="mt-3">{contact.handle}</Card.Text>
                <Button
                  variant="outline-light"
                  href={contact.link}
                  target="_blank"
                  className="mt-3">
                  Connect
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Button to show the form */}
      <div className="text-center mt-5">
        <Button variant="dark" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Hide Form" : "Message Me"}
        </Button>
      </div>

      {/* Conditionally render the form */}
      {showForm && (
        <div
          className="card shadow-lg mt-5 p-4"
          style={{ backgroundColor: "#f8f9fa" }}>
          <h3 className="text-center">Send me a Message</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="dark" type="submit">
              Send Message
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Contact;
