import React from "react";
import Button from "../components/Button";

const values = [
  {
    title: "Quality First",
    description:
      "We use premium materials and state-of-the-art equipment to ensure every product meets the highest standards.",
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    ),
  },
  {
    title: "Fast Turnaround",
    description:
      "We understand deadlines matter. Our efficient processes ensure quick delivery without compromising quality.",
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Customer Focus",
    description:
      "Your satisfaction is our priority. We work closely with you to bring your vision to life.",
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
];

const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-4">
          About Us
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Your trusted partner for all printing and signage needs.
        </p>
      </div>

      {/* Story Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-gray-300 mb-4">
            Brand and Signage was founded with a simple mission: to help
            businesses and individuals bring their visual identity to life through
            high-quality printing and signage solutions.
          </p>
          <p className="text-gray-300 mb-4">
            With years of experience in the industry, we&apos;ve built a reputation
            for delivering exceptional results, fast turnaround times, and
            outstanding customer service.
          </p>
          <p className="text-gray-300">
            Whether you need a single business card or a complete branding
            package, we treat every project with the same level of care and
            attention to detail.
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-pink-500 rounded-2xl p-1">
          <div className="bg-[#1a2b4b] rounded-2xl p-8">
            <div className="text-center">
              <div className="text-6xl font-extrabold text-pink-500 mb-2">10+</div>
              <div className="text-gray-300">Years of Experience</div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400">5000+</div>
                <div className="text-sm text-gray-400">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400">1000+</div>
                <div className="text-sm text-gray-400">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-[#0f1a2e] p-8 rounded-2xl text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-pink-500 rounded-full mb-6">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{value.title}</h3>
              <p className="text-gray-400">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-pink-500 rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Work Together?</h2>
        <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
          Let&apos;s discuss your project and see how we can help bring your vision
          to life.
        </p>
        <Button href="/contact" variant="secondary">
          Contact Us Today
        </Button>
      </div>
    </div>
  );
};

export default AboutPage;
