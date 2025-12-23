"use client";

import { useSearchParams } from "next/navigation";
import BlogEditor from "../editor";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

function EditPageContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id)
    return (
      <div className="p-8 text-center text-red-500 font-bold">Düzenlenecek yazı bulunamadı.</div>
    );

  return <BlogEditor postId={id} />;
}

export default function EditBlogPostPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          </div>
        }
      >
        <EditPageContent />
      </Suspense>
    </div>
  );
}
