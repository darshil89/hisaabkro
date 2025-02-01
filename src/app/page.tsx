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
    // based on the status of the session, we will either sign in or sign out
    if (status === 'unauthenticated') {
      await signIn("google", {
        callbackUrl: "/dashboard/profile",
      });
    }
    else
      await signOut();
  };


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
        className="flex flex-col justify-center items-center bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-3xl font-medium tracking-tight text-transparent md:text-6xl"
      >
        Stay on top of every rupee <br /> with your smart finance companion<br />
        <button onClick={() => handleSignIn()} className="w-fit mt-8 shadow-[inset_0_0_0_2px_#616467] flex justify-center space-x-2 items-center text-black px-6 py-3 rounded-full text-2xl tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
          <Image src={"/icons/google.svg"} alt="google" width={40} height={40} />
          <span>{status === 'unauthenticated' ? "Login" : "Log Out"}</span>
        </button>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="mt-4 text-center z-auto text-white text-3xl font-bold tracking-tight"
      >
        <p className="mb-1">ᕼᏆᔕᗩᗩᗷ ᛕᖇᗝ</p> <hr />
      </motion.div>

    </LampContainer>

  );
}
