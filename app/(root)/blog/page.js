// @flow strict
"use client"
import BlogCard from "@/app/components/homepage/blog/blog-card";
import { client } from "@/sanity/lib/client";
import { BLOG_QUERIES } from "@/sanity/lib/queries";
import { useEffect, useState } from "react";

export default function Page() {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await client.fetch(BLOG_QUERIES);
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="py-8">
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-2xl rounded-md">
            All Blog
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
        {
          blogs.map((blog, i) => (
            blog?.mainImage &&
            <BlogCard blog={blog} key={i} />
          ))
        }
      </div>
    </div>
  );
};

