import Image from "next/image";
import {
  Stethoscope,
  Thermometer,
  Activity,
  Baby,
  ActivitySquare,
  HeartPulse,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SERVICES = [
  {
    name: "General Consultation",
    desc: "Expert diagnosis for common health issues.",
    icon: Stethoscope,
    image: "/GC.jpg",
  },
  {
    name: "Fever & Infection",
    desc: "Treatment for viral & bacterial infections.",
    icon: Thermometer,
    image: "/FI.jpg",
  },
  {
    name: "Diabetes & BP",
    desc: "Management of chronic conditions.",
    icon: Activity,
    image: "/DBP.jpg",
  },
  {
    name: "Child & Family Care",
    desc: "Pediatric & family healthcare.",
    icon: Baby,
    image: "/c-fc.jpg",
  },
  {
    name: "Minor Procedures",
    desc: "Basic treatments & first aid.",
    icon: ActivitySquare,
    image: "/MP.jpg",
  },
  {
    name: "Health Checkups",
    desc: "Routine preventive checkups.",
    icon: HeartPulse,
    image: "/HC.jpg",
  },
];

const ServiceCard = ({
  name,
  desc,
  icon: Icon,
  image,
}: (typeof SERVICES)[0]) => (
  <div className="group relative h-65 w-[70vw] sm:w-60 rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition shrink-0 snap-center">
    
    {/* Image */}
    <Image
      src={image}
      alt={name}
      fill
      className="object-cover group-hover:scale-105 transition duration-500"
      sizes="(max-width: 640px) 70vw, 240px"
      priority={name === "General Consultation"} // 👈 only first card
      quality={75}
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-shrink-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

    {/* Content */}
    <div className="relative h-full flex flex-col justify-end p-4 z-10">
      
      {/* Icon */}
      <div className="w-8 h-8 bg-white/20 backdrop-blur-md text-white rounded-lg flex items-center justify-center mb-2">
        <Icon className="w-4 h-4" />
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-white leading-tight">
        {name}
      </h3>

      {/* Description */}
      <p className="text-[11px] text-slate-200 mt-1 line-clamp-2 opacity-90">
        {desc}
      </p>
    </div>
  </div>
);

export default function ServicesSection() {
  return (
    <section className="py-12 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-2 bg-blue-100 text-blue-700 px-3 py-1 text-xs">
            Our Expertise
          </Badge>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Our Medical Services
          </h2>

          <div className="h-1 w-14 bg-blue-600 mx-auto mt-3 rounded-full" />
        </div>
      </div>

      {/* HORIZONTAL SCROLL (FIXED) */}
      <div className="w-full overflow-hidden">
        <div className="flex gap-3 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-6 scroll-smooth snap-x snap-mandatory no-scrollbar">
          
          {SERVICES.map((service) => (
            <ServiceCard key={service.name} {...service} />
          ))}

        </div>
      </div>
    </section>
  );
}