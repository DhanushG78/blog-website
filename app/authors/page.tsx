import { Stack } from "../../lib/contentstack";
import Navbar from "@/components/Navbar";
import Link from "next/link";

async function getAuthors() {
  const Query = Stack.ContentType("author").Query();
  const data = await Query.toJSON().find();
  return data?.[0] || [];
}

export default async function AuthorsPage() {
  const authors = await getAuthors();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-20 relative">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-[300px] bg-accent/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="text-center mb-16 animate-fade-in-up relative">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-white">
            Meet Our <span className="text-accent">Authors</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            The brilliant minds behind our insightful articles. Discover their stories and ideas.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-fade-in-up delay-200 relative">
          {authors.map((author: any) => (
            <Link key={author.uid} href={`/authors/${author.uid}`} className="h-full">
              <div className="group relative h-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-blue-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                <div className="relative bg-[#090b14] border border-white/5 rounded-3xl p-8 text-center hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col items-center">
                  <div className="w-28 h-28 mx-auto mb-5 rounded-full overflow-hidden border-4 border-white/5 group-hover:border-accent/50 transition-colors duration-500">
                    <img 
                      src={author.profile_image?.url || `https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}&background=random`} 
                      alt={author.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors mb-2">{author.name}</h3>
                  {author.bio && (
                    <div 
                      className="text-sm text-gray-500 line-clamp-3 mt-auto"
                      dangerouslySetInnerHTML={{ __html: author.bio }}
                    />
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
