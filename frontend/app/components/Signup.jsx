"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { generateRandomCode } from "../Helper";
import { sendMail } from "../Helper";
export default function Signup({ setErrorMessage }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activate, setActivate] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [actualCode, setActualCode] = useState("");
  function generateRandomString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  function createAccount() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      username: name,
      email,
      password,
      verificationCode: generateRandomString(6),
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      credentials: "include",
    };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`, requestOptions)
      .then(async (response) => await response.json())
      .then((result) => {
        if (result.token) {
          setActualCode(result.user.verificationCode);
          setActivate(true);
          addCategory();
        } else if (result.response.code == 11000) {
          setErrorMessage("User with this mail already exist.");
        } else if (result.statusCode >= 400 || result.status >= 400) {
          setErrorMessage("Invalid email");
        } else {
          setErrorMessage(
            JSON.stringify(result) ? JSON.stringify(result) : result.toString()
          );
        }
      })
      .catch((error) => {
        console.log("error from signup catch: ", error);
        setErrorMessage(error.toString());
      });
  }

  function handleSignUp() {
    if (activate && verificationCode == actualCode) {
      router.push("/dashboard/mytests");
    } else if (!activate) {
      createAccount();
    }
  }

  function addCategory() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      category: "Uncategorized",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      credentials:'include'
    };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/category`, requestOptions)
      .then(async (response) => await response.json())
      .then((result) => {
        if(!result.category){
          setErrorMessage(
            JSON.stringify(result) ? JSON.stringify(result) : result.toString()
          );
        }
      })
      .catch((error) => setErrorMessage(error.toString()));;
  }

  return (
    <div className="w-96 border-swhite shadow-2xl rounded-lg py-10 px-10 flex flex-col space-y-6">
      <div className="flex flex-col mb-6">
        <span className="text-3xl text-spurple-300 font-bold text-center">
          testingninja
        </span>
        <span className="text-lg text mt-3 text-center text-spurple-300">
          {activate ? "Verify Your Account" : "Register a New Account"}
        </span>
      </div>
      <span
        className={
          activate && !verificationCode ? "text-md text-sgray-300" : "hidden"
        }
      >{`Verification link is sent to ${email} to verify that it's your email address.`}</span>
      <span
        className={
          activate && verificationCode && verificationCode != actualCode
            ? "text-md text-red-800"
            : "hidden"
        }
      >
        Invalid code, try again !
      </span>
      <input
        type="text"
        className={
          activate
            ? "rounded-lg bg-sgray text-spurple-300 font-medium focus:ring-spurple-300 focus:border-spurple-300"
            : "hidden"
        }
        placeholder="Verification Code"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <input
        type="text"
        className={
          activate
            ? "hidden"
            : "rounded-lg bg-sgray text-spurple-300 font-medium focus:ring-spurple-300 focus:border-spurple-300"
        }
        placeholder="Your Fullname"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        className={
          activate
            ? "hidden"
            : "rounded-lg bg-sgray text-spurple-300 font-medium focus:ring-spurple-300 focus:border-spurple-300"
        }
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className={
          activate
            ? "hidden"
            : "rounded-lg bg-sgray text-spurple-300 font-medium focus:ring-spurple-300 focus:border-spurple-300"
        }
        placeholder="Create new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="h-12" />
      <div className="flex flex-row justify-between items-center">
        <Link href="/login" className={activate ? "hidden" : ""}>
          <span className="text-lg font-semibold text-spurple-300">
            Login instead
          </span>
        </Link>
        <button
          className="bg-spurple-300 rounded-lg text-swhite text-lg font-semibold py-2 px-5"
          onClick={handleSignUp}
        >
          {activate ? "Verify" : "Sign up"}
        </button>
      </div>
    </div>
  );
}
