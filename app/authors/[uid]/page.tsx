import { Stack } from "../../../lib/contentstack";
import Navbar from "@/components/Navbar";
import Link from "next/link";

async function getAuthorData(uid: string) {
  // 1. Fetch Author
  const authorQ = await Stack.ContentType("author").Query().where("uid", uid).toJSON().find();
  const author = authorQ?.[0]?.[0];

  // 2. Fetch Author's Blogs
  const blogQ = await Stack.ContentType("blog").Query().includeReference(["author"]).toJSON().find();
  const allBlogs = blogQ?.[0] || [];
  
  const authorBlogs = allBlogs.filter((b: any) => {
    if (Array.isArray(b.author)) {
      return b.author.some((a: any) => a.uid === uid);
    }
    return b.author?.uid === uid;
  });

  return { author, authorBlogs };
}

export default async function AuthorDetailPage({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  const { author, authorBlogs } = await getAuthorData(uid);

  if (!author) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="p-20 text-center">
          <p className="text-red-400 text-xl font-medium">Author not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-16 animate-fade-in-up">
        {/* Author Header */}
        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start mb-20 bg-[#090b14] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[80px] rounded-full pointer-events-none"></div>
          
          <div className="shrink-0 relative z-10 w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
            <img 
              src={author.profile_image?.url || `https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}&background=random`} 
              alt={author.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 text-center md:text-left flex-grow">
            <h1 className="text-4xl md:text-6xl font-black mb-4 text-white">{author.name}</h1>
            {author.bio && (
              <div 
                className="text-lg text-gray-400 leading-relaxed max-w-3xl prose prose-invert prose-dark"
                dangerouslySetInnerHTML={{ __html: author.bio }}
              />
            )}
          </div>
        </div>

        {/* Authored Blogs Section */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-white border-b border-white/10 pb-4 inline-block">
            Articles by {author.name}
          </h2>

          {authorBlogs.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {authorBlogs.map((blog: any) => (
                <div key={blog.uid} className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                  <div className="relative h-full bg-[#090b14] border border-white/10 rounded-2xl overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-300">
                    <Link href={`/blog/${blog.url.replace(/^\/?(blog\/)?/, '')}`}>
                      <div className="overflow-hidden">
                        <img
                          src={blog.featured_image?.url || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"}
                          alt={blog.title ?? "Blog thumbnail"}
                          className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    </Link>

                    <div className="p-6 flex flex-col flex-grow">
                      <Link href={`/blog/${blog.url.replace(/^\/?(blog\/)?/, '')}`} className="flex-grow">
                        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-accent transition-colors">
                          {blog.title}
                        </h3>
                      </Link>
                      
                      {blog.published_date && (
                        <div className="mt-4 pt-4 border-t border-white/5">
                          <span className="text-xs text-gray-500">
                            {new Date(blog.published_date).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No articles published yet.</p>
          )}
        </div>
      </main>
    </div>
  );
}
