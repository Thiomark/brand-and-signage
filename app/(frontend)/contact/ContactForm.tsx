"use client";

import React, { useState } from "react";
import Button from "../../components/Button";

interface ContactFormProps {
  serviceOptions: {
    value: string;
    label: string;
  }[];
}

const ContactForm = ({ serviceOptions }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 transition placeholder:text-slate-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-100"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 transition placeholder:text-slate-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-100"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Phone (Optional)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 transition placeholder:text-slate-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-100"
          placeholder="Your phone number"
        />
      </div>

      <div>
        <label
          htmlFor="service"
          className="block text-sm font-medium mb-2"
        >
          Service Interested In
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 transition focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-100"
        >
          <option value="">Select a service</option>
          {serviceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full resize-none rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 transition placeholder:text-slate-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-100"
          placeholder="Tell us about your project..."
        />
      </div>

      <Button type="submit" className="w-full">
        Send Message
      </Button>
    </form>
  );
};

export default ContactForm;
