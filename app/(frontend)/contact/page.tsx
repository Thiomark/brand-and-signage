import React from "react";
import { draftMode } from "next/headers";
import { getPayloadClient } from "@/lib/payload";
import ContactForm from "./ContactForm";

// Revalidate every 60 seconds so CMS changes appear on the frontend
export const revalidate = 60;

interface ContactPageData {
  pageTitle?: string;
  pageSubtitle?: string;
  formTitle?: string;
  contactInfoTitle?: string;
  address?: {
    street?: string;
    city?: string;
    country?: string;
  };
  phone?: string;
  email?: string;
  businessHoursTitle?: string;
  businessHours?: {
    days: string;
    hours: string;
    isClosed?: boolean;
  }[];
  serviceOptions?: {
    value: string;
    label: string;
  }[];
}

const ContactPage = async () => {
  const { isEnabled: isDraftMode } = await draftMode();
  let contactPageData: ContactPageData | null = null;
  try {
    const payload = await getPayloadClient();
    contactPageData = await payload.findGlobal({
      slug: 'contact-page',
      draft: isDraftMode,
    }) as ContactPageData;
  } catch {
    // PayloadCMS unavailable or global doesn't exist, use default values
    contactPageData = null;
  }

  // Default values - use ?? so that CMS values (even empty strings) take precedence
  const pageTitle = contactPageData?.pageTitle ?? 'Contact Us';
  const pageSubtitle = contactPageData?.pageSubtitle ?? 'Get in touch with us for a free quote or any questions about our services.';
  const formTitle = contactPageData?.formTitle ?? 'Send Us a Message';
  const contactInfoTitle = contactPageData?.contactInfoTitle ?? 'Get In Touch';

  const address = {
    street: contactPageData?.address?.street ?? '123 Print Street',
    city: contactPageData?.address?.city ?? 'Johannesburg, GP 2000',
    country: contactPageData?.address?.country ?? 'South Africa',
  };

  const phone = contactPageData?.phone ?? '+27 11 123 4567';
  const email = contactPageData?.email ?? 'info@brandandsignage.co.za';
  const businessHoursTitle = contactPageData?.businessHoursTitle ?? 'Business Hours';

  const businessHours = contactPageData?.businessHours?.length
    ? contactPageData.businessHours
    : [
        { days: 'Monday - Friday', hours: '08:00 - 17:00', isClosed: false },
        { days: 'Saturday', hours: '09:00 - 13:00', isClosed: false },
        { days: 'Sunday', hours: 'Closed', isClosed: true },
      ];

  const serviceOptions = contactPageData?.serviceOptions?.length
    ? contactPageData.serviceOptions
    : [
        { value: 'copies-prints', label: 'Copies & Prints' },
        { value: 'custom-stickers', label: 'Custom Stickers' },
        { value: 'business-signage', label: 'Business Signage' },
        { value: 'other', label: 'Other' },
      ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-4">
          {pageTitle}
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          {pageSubtitle}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-[#0f1a2e] p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-6">{formTitle}</h2>
          <ContactForm serviceOptions={serviceOptions} />
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-blue-600 to-pink-500 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6">{contactInfoTitle}</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold">Address</h3>
                  <p className="text-gray-100">
                    {address.street}
                    <br />
                    {address.city}
                    <br />
                    {address.country}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold">Phone</h3>
                  <p className="text-gray-100">{phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold">Email</h3>
                  <p className="text-gray-100">{email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-[#0f1a2e] p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6">{businessHoursTitle}</h2>
            <div className="space-y-3">
              {businessHours.map((item) => (
                <div key={item.days} className="flex justify-between">
                  <span className="text-gray-400">{item.days}</span>
                  <span className={item.isClosed ? "text-pink-400" : ""}>
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
