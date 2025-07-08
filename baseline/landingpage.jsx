
import { useState, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";
import { useAccount } from "wagmi";
import WhoWeAre from "./WhoWeAre";
import PartnersSection from "./PartnersSection";
import ProductSection from "./ProductSection";

const firebaseConfig = {
  apiKey: "AIzaSyDU3biqF-xAGPUJeztRfojvQi6sEMAwFpw",
  authDomain: "e-spark-app.firebaseapp.com",
  projectId: "e-spark-app",
  storageBucket: "e-spark-app.firebasestorage.app",
  messagingSenderId: "75883842023",
  appId: "1:75883842023:web:346d4041fe1abbc6689542"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export default function LandingPage({ openWalletModal }) {
  const [showLogin, setShowLogin] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["who", "partners", "products", "contact"];
      const scrollPos = window.scrollY + window.innerHeight / 2;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop < scrollPos && el.offsetTop + el.offsetHeight > scrollPos) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        const updatedWallet = address || null;

        if (userSnap.exists()) {
          const existingData = userSnap.data();
          if (updatedWallet && existingData.walletAddress !== updatedWallet) {
            await setDoc(userRef, {
              ...existingData,
              walletAddress: updatedWallet
            });
          }
          setUserProfile({ ...existingData, walletAddress: updatedWallet });
        } else {
          const newProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            role: "investor",
            walletAddress: updatedWallet,
            displayName: firebaseUser.displayName || "",
            createdAt: serverTimestamp(),
            assignedProjects: [],
            managedProjects: [],
            metadata: {}
          };
          await setDoc(userRef, newProfile);
          setUserProfile(newProfile);
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
    });
    return () => unsubscribe();
  }, [address]);

  useEffect(() => {
    if (user && userProfile) {
      setShowLogin(false);
    }
  }, [user, userProfile]);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error(error);
      alert("Google login failed");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const loggedIn = user || isConnected;

  return (
    <div className="relative min-h-screen w-full font-encode text-cyanLight text-center">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/assets/e-charger.png')" }}
      />
      <div className="relative z-10 bg-gradient-to-b from-[#0D1A1A]/90 to-black/90 min-h-screen w-full">
        <header className="sticky top-0 z-50 flex justify-between items-center p-6 bg-[#0D1A1A]/80 backdrop-blur border-b border-cyan-500">
          <img src="/assets/e-spark logo.png" alt="e-Spark logo" className="h-14" />
          <nav className="flex space-x-6 text-sm">
            {!loggedIn && [
              { id: "who", label: "Who We Are" },
              { id: "partners", label: "Partners" },
              { id: "products", label: "Products" },
              { id: "contact", label: "Contact" }
            ].map(({ id, label }) => (
             <a
               key={id}
               href={`#${id}`}
               className={`transition hover:text-cyan-400 hover:underline underline-offset-4 ${activeSection === id ? 'text-cyan-400 font-bold underline' : ''}`}
             >
              {label}
              </a>
              ))}
            {loggedIn && (
              <>
                <a href="/marketplace" className="transition hover:text-cyan-400">Marketplace</a>
                <a href="/wallet" className="transition hover:text-cyan-400">Wallet</a>
                <a href="#contact" className="transition hover:text-cyan-400">Contact</a>
              </>
            )}
            {loggedIn ? (
              <Button
                variant="outline"
                onClick={logout}
                className="text-red-400 border-red-400 hover:bg-red-500 hover:text-black"
              >
                Sign out
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => setShowLogin(true)}
                className="text-cyan-400 border-cyan-400 hover:bg-cyan-500 hover:text-black"
              >
                Login
              </Button>
            )}
          </nav>
        </header>

        <main className="py-20 px-6 space-y-40 max-w-5xl mx-auto">
          <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
            <img src="/assets/e-Spark - IFM.png" alt="Main logo" className="w-[60%] mb-6" />
            {/* Title and tagline removed — image now handles it visually */}
          </section>

          {!loggedIn && <>
            <section id="who"><WhoWeAre /></section>
            <section id="partners"><PartnersSection /></section>
            <section id="products"><ProductSection /></section>
          </>}

          <section id="contact" className="py-20 px-4">
            <h2 className="text-4xl font-bold text-cyan-400 mb-6">Contact Us</h2>
            <form className="space-y-4 max-w-xl mx-auto">
              <Input placeholder="Your name" className="text-black px-4 py-2 rounded shadow" />
              <Input placeholder="Your email" type="email" className="text-black px-4 py-2 rounded shadow" />
              <textarea placeholder="Your message" className="w-full p-4 rounded text-black shadow" rows="4" />
              <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-lg shadow">
                Send Message
              </Button>
            </form>
          </section>
        </main>

        {showLogin && (
          <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50">
            <Card className="bg-[#1A1A1A] text-white w-96 p-6 border border-cyan-400">
              <CardContent className="space-y-4">
                <h3 className="text-2xl font-bold text-cyan-400">Sign in</h3>
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-500" onClick={loginWithGoogle}>Continue with Google</Button>
                <Button className="w-full bg-cyan-600 text-black hover:bg-cyan-500" onClick={openWalletModal}>Connect Wallet</Button>
                {isConnected && <p className="text-sm text-center text-cyan-400">Connected: {address}</p>}
                {user && <p className="text-sm text-center text-cyan-400">Signed in as: {user.email}</p>}
                <Button
                  variant="outline"
                  className="w-full mt-2 border-cyan-400 text-cyan-400 hover:bg-cyan-500 hover:text-black"
                  onClick={() => setShowLogin(false)}
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
