import Footer from '../components/Footer';
import Hero from '../components/Hero';
import SplitSection from './SplitSection';
import PricingSection from '../components/PricingSection';

const HomePage = () => 
{
  return (
    <main>
      <Hero />
      <SplitSection />
      <PricingSection />
      <Footer />
    </main>
  );
};

export default HomePage;
