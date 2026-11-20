import SmoothScroll from "@/components/SmoothScroll";
import AnimationProvider from "@/components/AnimationProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <AnimationProvider>
        <Navbar />
        <main id="main-content" className="relative z-10 flex flex-col">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Services />
          <Contact />
        </main>
        <Footer />
      </AnimationProvider>
    </SmoothScroll>
  );
}
