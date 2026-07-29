import Blobs from "@/components/Blobs";
import Intro from "@/components/Intro";
import Nav from "@/components/Nav";
import Marquee from "@/components/Marquee";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Details from "@/components/Details";
import Footer from "@/components/Footer";
import MobileCta from "@/components/MobileCta";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden pb-20 sm:pb-0">
      <Intro />
      <Blobs />
      <Nav />
      <Marquee />
      <main className="relative flex-1">
        <Hero />
        <Gallery />
        <Details />
      </main>
      <Footer />
      <MobileCta />
    </div>
  );
}
