import "./css/normalize.css"
import "./css/style.css"
import "./css/all.min.css"
import Header from './components/header'
import Footer from './components/footer'
import Spinner from './components/spinner'
import Hero from "./components/hero"
import WhyChoose from "./components/WhyChoose"
import ShopByCategory from "./components/ShopByCategory"


// [Script] => Import all imgs from assets From importingScript file
import { images } from './components/importingScript';



function App() {
  return (
    <>
    <Header /> 
    <Hero />
    <WhyChoose />
    <ShopByCategory />
          {/* === End Features === */}
      <Footer />
      
      
    </>
  );
}

export default App;