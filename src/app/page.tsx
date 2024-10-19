"use client";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "framer-motion";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignIn = async () => {
    await signIn("google");
  };

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="flex flex-col justify-center items-center mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Stay on top of every rupee <br /> with your smart finance companion<br />
        <button className="w-fit mt-5 shadow-[inset_0_0_0_2px_#616467] flex justify-center space-x-4 items-center text-black px-12 py-4 rounded-full text-3xl tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
          <Image src={"/icons/google.svg"} alt="google" width={40} height={40} />
          <span>Login</span>
        </button>
      </motion.h1>
    </LampContainer>
  );
}
