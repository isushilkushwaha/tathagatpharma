
import DoctorSection from "@/components/DoctorSection";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AppointmentForm from "@/components/AppointmentForm";
import BlogSection from "@/components/BlogSection";
import RatingForm from "@/components/RatingForm";
import RatingList from "@/components/RatingList";


export default function Home() {
  return (
    <main className="min-h-screen">
      
      <section id="Home"><HeroSection /></section>
      <section id="Doctor"><DoctorSection /></section>
      <section id="Services"><ServicesSection /></section>
      <section id="appointment"><AppointmentForm /></section>
      <section id="blog"><BlogSection /></section>
      <section id="ratingL"><RatingList /></section>
      <section id="ratingF"><RatingForm /></section>
    </main>
  )
}