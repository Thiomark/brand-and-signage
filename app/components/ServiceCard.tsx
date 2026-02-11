import React from "react";
import Button from "./Button";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
  variant?: "blue" | "pink";
}

const ServiceCard = ({
  icon,
  title,
  description,
  buttonText = "Learn More",
  buttonHref = "/services",
  variant = "blue",
}: ServiceCardProps) => {
  const accentClasses =
    variant === "blue"
      ? "text-blue-600 bg-blue-50"
      : "text-pink-500 bg-pink-50";
  const barColor = variant === "blue" ? "bg-blue-600" : "bg-pink-500";

  return (
    <div className="group rounded-[2rem] border border-slate-100 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${accentClasses}`}>
        {icon}
      </div>
      <h3 className="mb-3 text-2xl font-black uppercase tracking-tight text-blue-900">{title}</h3>
      <p className="mb-8 text-slate-500">{description}</p>
      <div className={`mb-6 h-1.5 w-12 rounded-full ${barColor} transition-all duration-300 group-hover:w-full`} />
      <Button variant={variant === "blue" ? "secondary" : "primary"} href={buttonHref}>
        {buttonText}
      </Button>
    </div>
  );
};

export default ServiceCard;
