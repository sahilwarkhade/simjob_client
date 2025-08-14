import '../App.css'
import HeroSection from '../components/HomePage/HeroSection'
import LogoSlider from '../components/HomePage/LogoSlider'
import Features from '../components/General/Features'
import CTASection from '../components/General/CTASection'
import Footer from '../components/General/Footer'
import HowItWorks from '../components/HomePage/HowItWorks'
import Benefits from '../components/HomePage/BenifitSection'
import FAQ from '../components/General/FAQSection'
const Home = () => {
  return (
    <div>
      <HeroSection/>
      <LogoSlider/>
      <Features/>
      <HowItWorks/>
      <Benefits/>
      <FAQ/>
      <CTASection/>
      <Footer/>
    </div>
  )
}

export default Home
