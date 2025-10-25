import React, { useState } from "react";
import { FaLinkedin, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

const Contact = () => {
  const contacts = [
    {
      platform: "LinkedIn",
      handle: "kanchan3",
      icon: <FaLinkedin className="text-2xl" />,
      message: "Connect",
      link: "https://www.linkedin.com/in/kanchan3/",
    },
    {
      platform: "X",
      handle: "kanchan3d",
      icon: <FaTwitter className="text-2xl" />,
      message: "Follow",
      link: "https://x.com/kanchan3d",
    },
    {
      platform: "Instagram",
      handle: "kancu_0",
      icon: <FaInstagram className="text-2xl" />,
      message: "Follow",
      link: "https://www.instagram.com/kancu_0/",
    },
    {
      platform: "Facebook",
      handle: "Kanchan Dasila",
      icon: <FaFacebook className="text-2xl" />,
      message: "Follow",
      link: "https://www.facebook.com/",
    },
  ];

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const templateParams = {
      to_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send("service_jfste8d", "template_6hujcs1", templateParams, "iWAsLN1RVWRfoTeos")
      .then(
        () => {
          alert("Message sent successfully!😇");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          alert("Failed to send message, please try again.🥲");
          console.error(error);
        }
      );
  };

  return (
    <motion.div
      className="container mx-auto py-10 px-5"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-center text-3xl font-bold mb-6">Let's Connect!</h2>

      <div className="flex flex-wrap justify-center gap-6">
        {contacts.map((contact, index) => (
          <motion.div
            key={index}
            className="bg-[#fafaf9] text-[#0c0a09] p-6 rounded-xl shadow-lg text-center w-64"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center justify-center gap-2 text-xl font-semibold">
              {contact.icon} {contact.platform}
            </div>
            <p className="mt-2 text-[#dda704]">{contact.handle}</p>
            <motion.a
              href={contact.link}
              target="_blank"
              className="inline-block mt-3 px-4 py-2 border text-[#fff1f2] bg-[#22c55e] border-[#eab308] rounded-lg hover:bg-[#166534] hover:text-[#fff1f2] transition no-underline"
              whileHover={{ scale: 1.1 }}
            >
              {contact.message}
            </motion.a>
          </motion.div>
        ))}
      </div>

      <motion.div className="text-center mt-8" whileHover={{ scale: 1.1 }}>
        <button className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-[#f97316]" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Hide Form" : "Message Me"}
        </button>
      </motion.div>

      {showForm && (
        <motion.div
          className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg mx-auto mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-center text-2xl font-semibold text-gray-900 mb-4">Send me a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Message</label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-[#4ade80] transition"
              >
                Send Message
              </button>
            </motion.div>
          </form>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Contact;