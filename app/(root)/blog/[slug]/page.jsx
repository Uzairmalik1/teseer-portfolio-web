import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { timeConverter } from "@/utils/time-converter";
import BlogCard from "@/app/components/homepage/blog/blog-card";
// import BlogCard from "@/components/BlogCard";

export async function generateStaticParams() {
  const query = groq`*[_type == "post"]{ slug }`;
  const posts = await client.fetch(query);

  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export default async function BlogPost({ params }) {
  const { slug } = params;

  // Fetch current blog post
  const query = groq`
    *[_type == "post" && slug.current == $slug][0]{
      title,
      mainImage{
        asset->{url}
      },
      body,
      _createdAt,
      "author": author ->{ 
          name, 
          email, 
          image{
              asset->{url}
          }, 
          bio 
      },
      "categories": categories[]->{ title, slug, description }
    }
  `;
  const post = await client.fetch(query, { slug });

  // Fetch related blog posts (excluding current post)
  const relatedQuery = groq`
    *[_type == "post" && slug.current != $slug] | order(_createdAt desc) [0...3] {
      title,
      slug,
      mainImage{
          asset->{url}
      },
      body,
      _createdAt,
      "author": author ->{ 
          name, 
          email, 
          image{
              asset->{url}
          }, 
          bio 
      },
      "categories": categories[]->{ title, slug, description }
    }
  `;
  const relatedPosts = await client.fetch(relatedQuery, { slug });

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-7xl mx-auto p-6">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Blog Content */}
      <div className="lg:col-span-2 mx-auto w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-white mb-4">{post.title}</h1>
  
        {post.mainImage?.asset?.url && (
          <Image
            src={post.mainImage.asset.url}
            alt={post.title}
            width={800}
            height={500}
            className="rounded-lg mx-auto"
          />
        )}
  
        <p className="text-gray-400 text-sm mt-2">{timeConverter(post._createdAt)}</p>
  
        <div className="prose prose-lg text-white mt-6">
          <PortableText value={post.body} />
        </div>
      </div>
  
      {/* Sidebar (Author & Categories) */}
      <div className="space-y-6">
        {/* Author Section */}
        {post.author && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-white">Author</h3>
            <div className="flex items-center gap-4 mt-4">
              {post.author.image && (
                <Image
                  src={post.author.image.asset.url}
                  alt={post.author.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              )}
              <div>
                <h4 className="text-lg font-semibold text-white">{post.author.name}</h4>
                <p className="text-gray-400 text-sm">{post.author.email}</p>
                <p className="text-gray-400 text-sm">{post.author.bio}</p>
              </div>
            </div>
          </div>
        )}
  
        {/* Categories Section */}
        {post.categories?.length > 0 && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-white">Categories</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {post.categories.map((category) => (
                <span
                  key={category.slug.current}
                  className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
                >
                  {category.title}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  
    {/* Related Blog Posts Section - Full Width */}
    {relatedPosts.length > 0 && (
      <div className="mt-16 w-full">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          You May Also Like
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPosts.map((relatedPost) => (
            <BlogCard key={relatedPost.slug.current} blog={relatedPost} />
          ))}
        </div>
      </div>
    )}
  </main>
  
  );
}
