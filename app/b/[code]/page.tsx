import { supabase } from "@/lib/supabase";

interface ShortLinkPageProps {
    params: Promise<{
        code: string;
    }>;
}

// Force static generation for the shorts
export const dynamic = 'force-static';

export async function generateStaticParams() {
    const { data: posts } = await supabase
        .from("posts")
        .select("short_code")
        .not("short_code", "is", null);

    if (!posts) return [];

    return posts.map((post) => ({
        code: post.short_code,
    }));
}

export default async function ShortLinkPage({ params }: ShortLinkPageProps) {
    const { code } = await params;

    const { data: post } = await supabase
        .from("posts")
        .select("slug")
        .eq("short_code", code)
        .single();

    // If post not found or some error happened, we still need to return a valid page for static generation
    // though generateStaticParams should prevent this for valid codes.
    const targetUrl = post ? `/blog/${post.slug}/` : '/blog/';
    const title = post ? 'Yönlendiriliyorsunuz...' : 'Yazı Bulunamadı';

    return (
        <html>
            <head>
                <title>{title}</title>
                {post && <meta httpEquiv="refresh" content={`0;url=${targetUrl}`} />}
                {post && <script dangerouslySetInnerHTML={{ __html: `window.location.href = "${targetUrl}"` }} />}
            </head>
            <body className="bg-gray-50 flex items-center justify-center min-h-screen">
                <div className="text-center">
                    {post ? (
                        <>
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-500 font-bold">Blog yazısına yönlendiriliyorsunuz...</p>
                        </>
                    ) : (
                        <>
                            <p className="text-red-500 font-bold text-xl mb-4">Yazı bulunamadı!</p>
                            <a href="/blog/" className="text-blue-600 underline">Blog ana sayfasına dön</a>
                        </>
                    )}
                </div>
            </body>
        </html>
    );
}
