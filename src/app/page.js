'use client'
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import img_2 from "../../public/img_2.svg";
import odr_logo from "../../public/odr_logo.svg";
import axios from "axios";

//Components
import SpotifyPlayer from "@/components/SpotifyPlayer";


export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [isMobile, setIsMobile] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (isMobile !== null) {
      setTimeout(() => {
        setAnimate(true);
      }, 2000);
    }
  }, [isMobile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      setLoading(true); // Ensure loading state is set before the request
      const response = await axios.post("/api/register", formData);

      if (response.data.success) {
        setTimeout(() => {
          setSubmitted(true);
          setLoading(false)
        }, 1200);
      }
      else{
        setLoading(false)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isMobile === null) return <div className="w-full h-screen bg-black"></div>;

  return (
    <div className="text-[#00FD00] min-h-screen w-full overflow-hidden flex flex-col items-center justify-center pb-10">


      <main className="relative flex flex-col items-center justify-center gap-8 w-full min-h-screen">

        {/* ODR Logo */}
        <motion.div
          initial={{
            opacity: 0,
            y: 0,
            width: isMobile ? "70vw" : "25vw"
          }}
          animate={{
            opacity: 1,
            y: animate ? (isMobile ? "-28vh" : "-65%") : 0,
            x: isMobile ? 0 : (animate ? "37.5vw" : 0),
            width: animate ? (isMobile ? "40vw" : "20vw") : (isMobile ? "70vw" : "25vw"),
          }}
          transition={{ duration: 1 }}
        >
          <Image src={odr_logo} alt="ODR Logo" className="h-auto w-full" />
        </motion.div>

        {/* Image 2 */}
        <motion.div
          initial={{
            opacity: 0,
            y: 0,
            width: isMobile ? "70vw" : "25vw"
          }}
          animate={{
            opacity: 1,
            y: animate ? (isMobile ? "100vh" : "25%") : 0,
            x: isMobile ? 0 : (animate ? "-37.5vw" : 0),
            width: animate ? (isMobile ? "40vw" : "20vw") : (isMobile ? "70vw" : "25vw"),
          }}
          transition={{ duration: 1 }}
        >
          <Image src={img_2} alt="Shillong We're Back" className="h-auto w-full" />
        </motion.div>



        {/* Form - Moves to the center after animation */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: animate ? 1 : 0, y: animate ? 0 : 100 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-center"
        >
          {submitted && <button
            type="submit"
            className="md:w-[30svw] md:mx-0 mx-5 px-10 text-[#00FD00] p-2 rounded-full mt-10 cursor-pointer uppercase font-semibold transition-colors duration-300"
            disabled
          >
            Welcome to the Community!
          </button>}
          <form onSubmit={handleSubmit} className={`space-y-5 md:max-w-[25svw] md:px-0 px-10 md:-mt-0 mt-20 ${submitted ? "hidden" : "h-auto"}`}>
            <div className="md:w-[25svw] mx-auto mb-10 ">
              <SpotifyPlayer />
            </div>

            <label htmlFor="name" className="px-5 font-medium">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 bg-[#00FD00] border rounded-full text-black outline-none px-5 mt-2 placeholder:text-black/20"
              required
            />
            <label htmlFor="email" className="px-5 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 bg-[#00FD00] border rounded-full text-black outline-none px-5 mt-2 placeholder:text-black/20"
              required
            />
            <label htmlFor="phone" className="px-5 font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 bg-[#00FD00] border rounded-full text-black outline-none px-5 mt-2 placeholder:text-black/20"
              required
            />
            {!submitted && <button
              type="submit"
              className="w-full border border-[#00FD00] text-[#00FD00] p-2 rounded-full mt-10 hover:bg-[#00FD00] hover:text-black cursor-pointer uppercase font-semibold transition-colors duration-300"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Sign Up"}
            </button>}

          </form>
        </motion.div>
      </main>
    </div>
  );
}
