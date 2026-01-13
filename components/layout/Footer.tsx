import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 bg-gray-50/50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left Side: Logo */}
          <div className="flex flex-col items-center md:items-start">
            <div className="relative h-36 w-96">
              <Image
                src="/logo-horizontal.png"
                alt="KF Software Logo"
                fill
                className="object-contain mix-blend-multiply"
              />
            </div>
          </div>

          {/* Right Side: Social & Legal */}
          <div className="flex flex-col items-center md:items-end gap-4">
            {/* Social Icons */}
            <div className="flex items-center space-x-6">
              <Link
                href="mailto:info@kfsoftware.app"
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <span className="sr-only">E-posta</span>
                <Mail className="h-6 w-6" />
              </Link>
              <Link
                href="https://instagram.com/kfsoftware/"
                target="_blank"
                className="hover:opacity-80 transition-opacity"
              >
                <span className="sr-only">Instagram</span>
                <div className="relative h-6 w-6">
                  <Image
                    src="/instagram-logo.png"
                    alt="Instagram Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Legal Links */}
            <div className="flex gap-6">
              <Link
                href="/privacy/"
                className="text-gray-400 hover:text-gray-600 text-xs transition-colors"
              >
                Gizlilik Politikası
              </Link>
              <Link
                href="/terms/"
                className="text-gray-400 hover:text-gray-600 text-xs transition-colors"
              >
                Kullanım Şartları
              </Link>
              <Link
                href="/account-deletion/"
                className="text-gray-400 hover:text-gray-600 text-xs transition-colors"
              >
                Hesap Sil
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-6 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} KF SOFTWARE. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
