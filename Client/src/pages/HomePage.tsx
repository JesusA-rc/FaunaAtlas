import Hero from '../components/Hero';
import DiscoverySection from '../components/DiscoverySection';
import SplitSection from './SplitSection';
import PricingSection from '../components/PricingSection';

const HomePage = () => 
{
  return (
    <main>
      <Hero />
      <DiscoverySection />
      <SplitSection />
      <PricingSection />
    </main>
  );
};

export default HomePage;
