import { Header, ScrollProgress, StickyBuy } from "./components/Chrome";
import { Hero } from "./sections/Hero";
import { Challenges } from "./sections/Challenges";
import { Pillars } from "./sections/Pillars";
import { Products } from "./sections/Products";
import { Journey } from "./sections/Journey";
import { Preview } from "./sections/Preview";
import { Offer } from "./sections/Offer";
import { Faq } from "./sections/Faq";
import { Footer } from "./sections/Footer";

export default function App() {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <ScrollProgress />
      <Header />
      <main id="conteudo">
        <Hero />
        <Challenges />
        <Pillars />
        <Products />
        <Journey />
        <Preview />
        <Offer />
        <Faq />
      </main>
      <Footer />
      <StickyBuy />
    </>
  );
}
