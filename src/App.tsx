import Layout from '@/components/layout';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Work from '@/components/sections/Work';

const App: React.FC = () => (
  <Layout>
    <Hero />
    <Work />
    <Projects />
    <About />
    <Contact />
  </Layout>
);

export default App;