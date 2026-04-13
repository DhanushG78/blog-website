import { Stack } from "../../../lib/contentstack";
import Navbar from "@/components/Navbar";
import Link from "next/link";

async function getBlog(url: string) {
  // First try the exact url provided
  let Query = Stack.ContentType("blog").Query().where("url", url);
  let data = await Query.includeReference(["author"]).toJSON().find();

  // If not found, it might have a leading slash in Contentstack
  if (!data?.[0]?.[0]) {
    Query = Stack.ContentType("blog").Query().where("url", `/${url}`);
    data = await Query.includeReference(["author"]).toJSON().find();
  }

  return data?.[0]?.[0] ?? null;
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ url: string }>;
}) {
  const { url } = await params;
  const blog = await getBlog(url);

  if (!blog) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="p-20 text-center">
          <p className="text-red-400 text-xl font-medium">Blog not found.</p>
        </div>
      </div>
    );
  }

  const authorName = Array.isArray(blog.author) ? blog.author[0]?.name : blog.author?.name;
  const authorUid = Array.isArray(blog.author) ? blog.author[0]?.uid : blog.author?.uid;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-16 animate-fade-in-up">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight text-white">
            {blog.title}
          </h1>
          
          <div className="flex items-center justify-center gap-4 text-gray-400">
             {authorUid ? (
                <Link href={`/authors/${authorUid}`} className="hover:text-white transition-colors duration-200">
                  By <span className="font-semibold text-accent">{authorName}</span>
                </Link>
             ) : (
                <span>By Unknown</span>
             )}
             {blog.published_date && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                  <span>{new Date(blog.published_date).toLocaleDateString()}</span>
                </>
             )}
          </div>
        </div>

        {blog.featured_image?.url && (
          <div className="mb-14 overflow-hidden rounded-3xl border border-white/10 shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 bottom-0 h-32 mt-auto"></div>
            <img
              src={blog.featured_image.url}
              alt={blog.title ?? "Blog image"}
              className="w-full h-auto max-h-[600px] object-cover"
            />
          </div>
        )}

        <div
          className="prose prose-invert prose-lg max-w-none prose-dark leading-relaxed 
                     prose-a:text-accent hover:prose-a:text-white prose-a:transition-colors
                     prose-headings:text-white prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </main>
    </div>
  );
}
