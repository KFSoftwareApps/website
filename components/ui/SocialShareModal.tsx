"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { X, Copy, Check, Twitter, Instagram, Download } from "lucide-react";
import Image from "next/image";

interface SocialShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    post: {
        title: string;
        excerpt: string;
        image: string;
        url: string;
        tags: string[];
    };
    platform: "twitter" | "instagram" | null;
}

export default function SocialShareModal({
    isOpen,
    onClose,
    post,
    platform,
}: SocialShareModalProps) {
    const [copied, setCopied] = useState(false);

    // Generate content based on platform
    const twitterContent = `${post.title}\n\n${post.excerpt.substring(0, 150)}...\n\n🔗 ${post.url}\n\n${post.tags.map(t => `#${t.trim()}`).join(" ")}`;

    const instagramContent = `🔥 YENİ YAZI: ${post.title}\n\n${post.excerpt}\n\n🔗 Okumak için: ${post.url}\n\n#KFSoftware #Blog #Teknoloji ${post.tags.map(t => `#${t.trim()}`).join(" ")}`;

    const content = platform === "twitter" ? twitterContent : instagramContent;

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleTwitterShare = () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterContent)}`;
        window.open(url, '_blank');
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <div className="flex justify-between items-center mb-6">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-bold leading-6 text-gray-900 flex items-center gap-2"
                                    >
                                        {platform === "twitter" ? (
                                            <>
                                                <div className="p-2 bg-black rounded-lg text-white"><Twitter className="h-5 w-5" /></div>
                                                Twitter Paylaşımı
                                            </>
                                        ) : (
                                            <>
                                                <div className="p-2 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-lg text-white"><Instagram className="h-5 w-5" /></div>
                                                Instagram Gönderisi
                                            </>
                                        )}
                                    </Dialog.Title>
                                    <button
                                        onClick={onClose}
                                        className="rounded-full p-1 hover:bg-gray-100 transition-colors"
                                    >
                                        <X className="h-5 w-5 text-gray-500" />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {/* Visual Preview for Instagram */}
                                    {platform === "instagram" && post.image && (
                                        <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-gray-100 shadow-inner group">
                                            <Image src={post.image} alt="Preview" fill className="object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                                <p className="text-white font-bold text-sm line-clamp-2">{post.title}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Text Content */}
                                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 relative group">
                                        <pre className="whitespace-pre-wrap font-sans text-sm text-gray-600 leading-relaxed">
                                            {content}
                                        </pre>
                                        <button
                                            onClick={handleCopy}
                                            className="absolute top-2 right-2 p-2 bg-white rounded-lg shadow-sm border border-gray-100 text-gray-500 hover:text-blue-600 transition-colors"
                                            title="Metni Kopyala"
                                        >
                                            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                        </button>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-3">
                                        {platform === "twitter" ? (
                                            <button
                                                onClick={handleTwitterShare}
                                                className="flex items-center justify-center gap-2 w-full py-3 bg-black text-white rounded-xl font-bold hover:opacity-80 transition-opacity"
                                            >
                                                <Twitter className="h-4 w-4" />
                                                Tweet Gönder
                                            </button>
                                        ) : (
                                            <div className="flex gap-2 w-full">
                                                <button
                                                    onClick={async () => {
                                                        try {
                                                            const response = await fetch(post.image, { mode: 'cors' });

                                                            if (!response.ok) {
                                                                throw new Error(`İndirme başarısız (HTTP ${response.status})`);
                                                            }

                                                            const contentType = response.headers.get('content-type');
                                                            if (contentType && !contentType.startsWith('image/')) {
                                                                // If it's not an image (e.g. XML error or HTML 404), throw
                                                                throw new Error(`Geçersiz dosya formatı: ${contentType}`);
                                                            }

                                                            const blob = await response.blob();
                                                            if (blob.size < 1024) {
                                                                // 1KB check just to be safe, matches Instagram's complaint
                                                                console.warn("Dosya çok küçük, muhtemelen hata: ", blob.size);
                                                                // We can let it pass or warn? Let's throw to be safe if it is suspiciously small for a blog post image
                                                                // But a very small icon might be legitimate. Let's trust status and content-type more.
                                                            }

                                                            const url = window.URL.createObjectURL(blob);
                                                            const link = document.createElement('a');
                                                            link.href = url;
                                                            link.download = `instagram-share-${post.title.substring(0, 10).replace(/\s+/g, '-')}.jpg`;
                                                            document.body.appendChild(link);
                                                            link.click();
                                                            document.body.removeChild(link);
                                                            window.URL.revokeObjectURL(url);
                                                        } catch (error: any) {
                                                            console.error("Görsel indirilemedi:", error);
                                                            alert(`Görsel indirilemedi: ${error.message || "Bilinmeyen hata"}`);
                                                        }
                                                    }}
                                                    className="flex items-center justify-center gap-2 flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                                                >
                                                    <Download className="h-4 w-4" />
                                                    Görseli İndir
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        handleCopy();
                                                        setTimeout(() => window.open('https://instagram.com', '_blank'), 1000);
                                                    }}
                                                    className="flex items-center justify-center gap-2 flex-[2] py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
                                                >
                                                    {copied ? <Check className="h-4 w-4" /> : <Instagram className="h-4 w-4" />}
                                                    Metni Kopyala ve Instagram'ı Aç
                                                </button>
                                            </div>
                                        )}

                                        <p className="text-xs text-center text-gray-400">
                                            {platform === "instagram" ? "Görseli kaydedip, metni yapıştırarak paylaşabilirsiniz." : "Otomatik olarak Twitter açılacaktır."}
                                        </p>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
