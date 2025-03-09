// @flow strict
import { timeConverter } from '@/utils/time-converter';
import Image from 'next/image';
import Link from 'next/link';
import { BsHeartFill } from 'react-icons/bs';
import { FaCommentAlt } from 'react-icons/fa';

function BlogCard({ blog }) {
  const blogSlug = blog?.slug?.current || "";

  return (
    <div className="border border-[#1d293a] hover:border-[#464c6a] transition-all duration-500 bg-[#1b203e] rounded-lg relative group"
    >
      <div className="h-44 lg:h-52 w-auto cursor-pointer overflow-hidden rounded-t-lg">
        <Image
          src={blog?.mainImage?.asset?.url}
          height={1080}
          width={1920}
          alt=""
          className='h-full w-full group-hover:scale-110 transition-all duration-300'
        />
      </div>
      <div className="p-2 sm:p-3 flex flex-col">
        <div className="flex justify-between items-center text-[#16f2b3] text-sm">
          <p>{timeConverter(blog?._createdAt)}</p>
          <div className="flex items-center gap-3">
            {blog?.author?.image && (
                              <Image
                                src={blog?.author?.image?.asset?.url}
                                alt={blog?.author?.name}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                            )}
                            <h4 className="text-lg font-semibold text-white">
                    {blog?.author?.name}
                  </h4>
          </div>
        </div>
        <Link href={`/blog/${blogSlug}`}>
          <p className='my-2 lg:my-3 cursor-pointer text-lg text-white sm:text-xl font-medium hover:text-violet-500'>
            {blog?.title}
          </p>
        </Link>
        {/* <p className='mb-2 text-sm text-[#16f2b3]'>
          {`${blog.reading_time_minutes} Min Read`}
        </p> */}
        <p className='text-sm lg:text-base text-[#d3d8e8] pb-3 lg:pb-6 line-clamp-3'>
  {blog?.body?.map((block) => block?.children?.map((child) => child?.text).join(" ")).join(" ")}
</p>

        {/* <div className="">
          <Link target='_blank' href={blog.url}>
            <button className='bg-violet-500 text-white px-3 py-1.5 rounded-full text-xs'>
              Read More
            </button>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default BlogCard;