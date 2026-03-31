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
    
    // Validate inputs
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert("Please fill in all fields");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }
    
    const templateParams = {
      to_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
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
      className="container mx-auto py-10 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-center text-3xl sm:text-4xl font-bold mb-8">Let's Connect!</h2>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12">
        {contacts.map((contact, index) => (
          <motion.div
            key={index}
            className="bg-[#fafaf9] text-[#0c0a09] p-4 sm:p-6 rounded-xl shadow-lg text-center w-full sm:w-[calc(50%-12px)] md:w-64 lg:w-72"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-4xl sm:text-5xl mb-3 flex justify-center">
              {contact.icon}
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              {contact.platform}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              {contact.handle}
            </p>
            <motion.a
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-500 text-white px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-600 transition-all no-underline"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {contact.message}
            </motion.a>
          </motion.div>
        ))}
      </div>

      <motion.div className="text-center mt-8 sm:mt-12" whileHover={{ scale: 1.05 }}>
        <button 
          className="bg-gray-900 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-base sm:text-lg hover:bg-[#f97316] transition-all font-medium" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Hide Form" : "Message Me"}
        </button>
      </motion.div>

      {showForm && (
        <motion.form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto mt-8 sm:mt-10 px-4 sm:px-6 bg-white rounded-2xl shadow-2xl p-6 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-center text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">Send me a Message</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium text-sm sm:text-base mb-2">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 sm:py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none text-base"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium text-sm sm:text-base mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 sm:py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none text-base"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium text-sm sm:text-base mb-2">Message</label>
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 sm:py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none text-base resize-none"
              />
            </div>

            <motion.button
              type="submit"
              className="w-full sm:w-auto bg-blue-500 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold text-base sm:text-lg hover:bg-blue-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
            >
              Send Message
            </motion.button>
          </div>
        </motion.form>
      )}
    </motion.div>
  );
};

export default Contact;