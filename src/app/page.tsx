import Navbar from "@/components/site/navbar";
import Hero from "@/components/site/hero";
import CategoriesSection from "@/components/site/categories";
import FeaturedProducts from "@/components/site/featured-products";
import WholesaleSection from "@/components/site/wholesale";
import WhyAxisMart from "@/components/site/why-axismart";
import BrandsSection from "@/components/site/brands";
import Testimonials from "@/components/site/testimonials";
import CtaBanner from "@/components/site/cta-banner";
import Footer from "@/components/site/footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <CategoriesSection />
      <FeaturedProducts />
      <WholesaleSection />
      <WhyAxisMart />
      <BrandsSection />
      <Testimonials />
      <CtaBanner />
      <Footer />
    </>
  );
}