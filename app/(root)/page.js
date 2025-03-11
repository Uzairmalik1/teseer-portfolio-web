"use server";
import { client } from "@/sanity/lib/client";
import { BLOG_QUERIES } from "@/sanity/lib/queries";
import HeroSection from "../components/homepage/hero-section";
import AboutSection from "../components/homepage/about";
import Experience from "../components/homepage/experience";
import Projects from "../components/homepage/projects";
import Education from "../components/homepage/education";
import Blog from "../components/homepage/blog";
import ContactSection from "../components/homepage/contact";
import Skills from "../components/homepage/skills";

export default async function Home() {
  const blogs = await client.fetch(BLOG_QUERIES);

  return (
    <div >
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Blog blogs={blogs} />
      <ContactSection />
    </div>
  )
};
