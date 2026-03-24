import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const DOCTORS = [
  {
    name: "Drx. Buddhraj Kushwaha",
    role: "D.Pharma (General Medicine)",
    image: "/dr1.jpeg",
    experience:
      "BDS , MDS - Periodontology and Oral Implantology, 10 Years Experience",
    accentColor: "bg-rose-500",
  },
  {
    name: "Ankita Kushwaha",
    role: "Nursing Officer",
    image: "/dr2.jpeg",
    experience:
      "BDS , MDS - Periodontology and Oral Implantology, 05 Years Experience",
    accentColor: "bg-blue-500",
  },
];

const DoctorCard = ({ doctor }: { doctor: (typeof DOCTORS)[0] }) => (
  <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300">
    
    {/* Square Layout */}
    <div className="grid grid-cols-2 h-[220px]">
      
      {/* LEFT SIDE - DETAILS */}
      <div className="p-4 flex flex-col justify-between">
        
        <div>
          <h3 className="text-base font-bold text-slate-800 leading-tight">
            {doctor.name}
          </h3>

          <p className="text-xs text-blue-600 font-medium mt-1">
            {doctor.role}
          </p>

          <div className={`h-1 w-8 mt-2 rounded-full ${doctor.accentColor}`} />

          <p className="text-xs text-slate-500 mt-3 leading-relaxed">
            {doctor.experience}
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-3 text-slate-300">
          <Linkedin size={14} className="hover:text-blue-600 cursor-pointer" />
          <Facebook size={14} className="hover:text-blue-600 cursor-pointer" />
          <Twitter size={14} className="hover:text-blue-400 cursor-pointer" />
          <Instagram size={14} className="hover:text-pink-600 cursor-pointer" />
        </div>
      </div>

      {/* RIGHT SIDE - IMAGE */}
      <div className="relative h-full w-full">
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          className="object-cover"
        />
      </div>
    </div>
  </div>
);

export default function DoctorSection() {
  return (
    <section className="py-14 bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <Badge className="mb-3 bg-blue-50 text-blue-600 px-3 py-1 text-xs">
            Medical Professionals
          </Badge>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Expert Medical Team
          </h2>

          <div className="h-1 w-16 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
          {DOCTORS.map((doc, index) => (
            <DoctorCard key={index} doctor={doc} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Badge Component
function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${className}`}>
      {children}
    </span>
  );
}