'use client'
import { firebaseapp } from "@/app/api/firebase/firebase";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
export default function Home() {
  const [loading, setLoading] = useState()
  const { register, handleSubmit, setError, clearErrors, getValues, formState: { errors } } = useForm();
  const auth = getAuth(firebaseapp);
  const user = getAuth(firebaseapp).currentUser
  const router = useRouter()
  const onSubmit = (data) => {
    clearErrors()
    setLoading(true)
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          router.push('/')
        }
        setLoading(false)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError('repass', { type: 'custom', message: 'CHECK EMAIL AND PASSWORD' })
        setLoading(false)
      })
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.push('/')
    } else {
    }
  });


  return (
    <main className="">
      <div className="flex justify-center text-center pt-[10vh] text-3xl">
        <h1>To Do App With Firebase</h1>
      </div>
      <div className="container mx-auto flex-col h-[75vh] flex justify-center items-center">
        <h2 className="text-3xl pb-4 font-semibold">Login</h2>
        <form className="flex flex-col gap-y-2 w-2/3 sm:w-96" onSubmit={handleSubmit(onSubmit)}>
          <input placeholder="E-mail" className="bg-[#606060] focus:border-[#e3e3e3] rounded-lg px-2 border border-[#202020] h-10 sm:h-12"
            {...register("email", { required: { value: true, message: 'EMAIL IS NEEDED' }, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })} />
          <p className="text-red-500 text-xs font-semibold">
            {errors.email ? "INVALID MAIL" : null}
          </p>
          <input type="password" placeholder="Password" className="bg-[#606060] focus:border-[#e3e3e3] rounded-lg px-2 border border-[#202020]  h-10 sm:h-12"
            {...register("password", { required: { value: true, message: 'PASSWORD IS NEEDED' } })}
          />
          <p className="text-red-500 text-xs font-semibold">
            {errors.repass ? errors.repass.message : null}
          </p>
          <button onClick={() => clearErrors()} className="bg-primary text-dirtyWhite font-semibold rounded-lg py-2 sm:py-3 flex justify-center items-center sm:text-xl hover:opacity-75 cursor-pointer">
            {loading ? <span><AiOutlineLoading3Quarters /></span> :
              <span>Login</span>}
          </button>
        </form>
        <span className="mt-2 text-sm"> If you don&apos;t have an account</span>
        <button className="bg-primary mt-2 w-2/3 sm:w-96 text-dirtyWhite font-semibold rounded-lg py-2 sm:py-3 flex justify-center items-center sm:text-xl hover:opacity-75 cursor-pointer">
          <Link href={'register'}>
            <span>Register</span>
          </Link>
        </button>
      </div>
    </main>
  )
}
