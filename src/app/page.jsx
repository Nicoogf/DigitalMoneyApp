import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="bg-slate-800 h-[100%]">
      <nav className="flex items-center flex-row flex-wrap gap-2"> 
        <Link href="/" className="p-2 rounded-md text-white bg-blue-500"> Inicio </Link>
        <Link href="/register" className="p-2 rounded-md text-white bg-blue-500"> Regisro </Link>
        <Link href="/login" className="p-2 rounded-md text-white bg-blue-500"> Ingresar </Link>
        <Link href="/dashboard" className="p-2 rounded-md text-white bg-blue-500"> Home </Link>
      </nav>
    </section>
  );
}
