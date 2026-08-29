import { Nav } from "@/components/layout/Nav";
import { Preloader } from "@/components/layout/Preloader";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { AdmissionsPopup } from "@/components/layout/AdmissionsPopup";
import { Hero } from "@/components/sections/Hero";
import { FactsBar } from "@/components/sections/FactsBar";
import { WhyConsider } from "@/components/sections/WhyConsider";
import { Gallery } from "@/components/sections/Gallery";
import { Highlights } from "@/components/sections/Highlights";
import { GroupAdvantage } from "@/components/sections/GroupAdvantage";
import { Updates } from "@/components/sections/Updates";
import { Alumni } from "@/components/sections/Alumni";
import { Faq } from "@/components/sections/Faq";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { VideoSlider } from "@/components/sections/VideoSlider";
import { InstagramSlider } from "@/components/sections/InstagramSlider";

export default function Page() {
  return (
    <>
      <Preloader />
      <Nav />
      <main id="main">
        <Hero />
        <FactsBar />
        <VideoSlider />
        <WhyConsider />
        <Gallery />
        <Highlights />
        <GroupAdvantage />
        <Updates />
        <Alumni />
        <InstagramSlider />
        <Faq />
        <ClosingCta />
      </main>
      <Footer />
      <FloatingActions />
      <AdmissionsPopup />
    </>
  );
}
