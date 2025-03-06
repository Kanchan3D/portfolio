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
      pho:"https://media.licdn.com/dms/image/v2/D5603AQHaxFszNf2GOQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1668742306633?e=1746662400&v=beta&t=2CtWdewZ3ujed9PFsHZodTLzfCyH_ZHy_ZSfkB2O0-U",
      link: "https://www.linkedin.com/in/kanchan3/",
      message: "Connect",
    },
    {
      platform: "Instagram",
      handle: "@kancu_0",
      icon: <FaInstagram />,
      pho:"https://scontent.fdel27-5.fna.fbcdn.net/v/t39.30808-6/328694695_1976538472737885_403947757103046510_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=22gz77wKRvQQ7kNvgEQpoVv&_nc_oc=Adh0HRLp9gHHd6ix6Nl3CzZEm1f_kibLE1m7eFvbzBEFvQzTxP6n-cZ-jCCYMYPlQ74&_nc_zt=23&_nc_ht=scontent.fdel27-5.fna&_nc_gid=ArWH0rhYR8iFaCBLeuJnZmr&oh=00_AYCNPDEiOD6UayZt1Gq0flmfdPikGOSVWeJEG8znEQFk7Q&oe=67CF28C4",
      link: "https://instagram.com/kancu_0",
      message: "Follow",
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
                <img
                class="mx-auto block h-24 rounded-full sm:mx-0 sm:shrink-0"
                src={contact.pho}
                alt=""
              />
                <Card.Text className="mt-3">{contact.handle}</Card.Text>
                <Button
                  variant="outline-light"
                  href={contact.link}
                  target="_blank"
                  className=" mt-1f ">
                  {contact.message}
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
