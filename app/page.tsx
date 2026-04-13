import { Stack } from "../lib/contentstack";
import Link from "next/link";
import Navbar from "@/components/Navbar";

async function getBlogs() {
  const Query = Stack.ContentType("blog").Query();
  const data = await Query.includeReference(["author"]).toJSON().find();
  return data?.[0] || [];
}

export default async function Home() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-20 relative">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[400px] bg-accent/20 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Smooth Hero Entrance */}
        <div className="relative text-center mb-24 animate-fade-in-up">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-accent">
            ✨ Professional Insights
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-gradient-to-br from-white via-white to-gray-500 bg-clip-text text-transparent leading-tight">
            Elevate Your Knowledge <br className="hidden md:block"/> With NexBlog
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Deep dives, tutorials, and perspectives from industry experts to help you stay ahead of the curve.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="relative grid md:grid-cols-3 gap-8 animate-fade-in-up delay-200">
          {blogs.map((blog: any) => {
            const authorName = Array.isArray(blog.author) ? blog.author[0]?.name : blog.author?.name;
            const authorUid = Array.isArray(blog.author) ? blog.author[0]?.uid : blog.author?.uid;

            return (
              <div key={blog.uid} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-25 transition duration-500"></div>
                <div className="relative h-full bg-[#090b14] border border-white/10 rounded-2xl overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-300">
                  <Link href={`/blog/${blog.url.replace(/^\/?(blog\/)?/, '')}`}>
                    <div className="overflow-hidden">
                      <img
                        src={blog.featured_image?.url || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"}
                        alt={blog.title ?? "Blog thumbnail"}
                        className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </Link>

                  <div className="p-6 flex flex-col flex-grow">
                    <Link href={`/blog/${blog.url.replace(/^\/?(blog\/)?/, '')}`} className="flex-grow">
                      <h2 className="text-xl font-bold mb-3 text-white group-hover:text-accent transition-colors">
                        {blog.title}
                      </h2>
                    </Link>

                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                      {authorUid ? (
                        <Link href={`/authors/${authorUid}`} className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                          By <span className="text-white">{authorName}</span>
                        </Link>
                      ) : (
                        <span className="text-sm text-gray-500">By Unknown</span>
                      )}
                      
                      {blog.published_date && (
                        <span className="text-xs text-gray-600 border border-white/10 px-2 py-1 rounded-md">
                          {new Date(blog.published_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
