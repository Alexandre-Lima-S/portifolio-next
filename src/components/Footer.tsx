// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      {/* ESTE div já ocupa 100% da largura da viewport */}
      <div className="w-full flex justify-between items-center px-5">
        <p className="text-sm">
          © {new Date().getFullYear()} AL CODES. Todos os direitos reservados.
        </p>

        <nav className="flex space-x-6 text-sm">
          <Link href="https://instagram.com/seuPerfil" target="_blank" rel="noreferrer">
            Instagram
          </Link>
          <Link href="https://wa.me/5511999999999" target="_blank" rel="noreferrer">
            WhatsApp
          </Link>
          <Link href="mailto:seuemail@exemplo.com" target="_blank" rel="noreferrer">
            E-mail
          </Link>
          <Link href="https://github.com/seuUsuario" target="_blank" rel="noreferrer">
            GitHub
          </Link>
        </nav>
      </div>
    </footer>
  );
}
