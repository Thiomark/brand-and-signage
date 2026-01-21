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
  const bgColor = variant === "blue" ? "bg-blue-600" : "bg-pink-500";
  const textColor = variant === "blue" ? "text-blue-100" : "text-pink-100";
  const buttonVariant = variant === "blue" ? "primary" : "secondary";

  return (
    <div
      className={`${bgColor} p-8 rounded-2xl flex flex-col items-center text-center shadow-xl transform hover:-translate-y-2 transition-transform`}
    >
      <div className="mb-6">{icon}</div>
      <h3 className="text-2xl font-bold uppercase mb-4">{title}</h3>
      <p className={`${textColor} mb-8 flex-grow`}>{description}</p>
      <Button variant={buttonVariant} href={buttonHref}>
        {buttonText}
      </Button>
    </div>
  );
};

export default ServiceCard;
