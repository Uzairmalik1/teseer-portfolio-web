"use client";
import { useEffect, useState } from "react";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import { client } from "@/sanity/lib/client";
import { BLOG_QUERIES } from "@/sanity/lib/queries";

export default function Home() {
  // const blogs = await client.fetch(BLOG_QUERIES);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      const data = await client.fetch(BLOG_QUERIES);
      setBlogs(data);
    }
    fetchBlogs();
  }, []);

  return (
    <div suppressHydrationWarning >
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