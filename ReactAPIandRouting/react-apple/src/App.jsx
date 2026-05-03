import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Alert from "./components/Alert/Alert";
import SectionOne from "./components/SectionOne/SectionOne";
import SectionTwo from "./components/SectionTwo/SectionTwo";
import SectionThree from "./components/SectionThree/SectionThree";
import SectionFour from "./components/SectionFour/SectionFour";
import SectionFive from "./components/SectionFive/SectionFive";
import SectionSix from "./components/SectionSix/SectionSix";
import Footer from "./components/Footer/Footer";
import YoutubeVideos from "./components/YoutubeVideos/YoutubeVideos";
import Main from "./components/Main/Main";
import Ipad from "./Page/Ipad/Ipad";
import Mac from "./Page/Mac/Mac";
import Four04 from "./Page/Four04/Four04";
import Sharedlayout from "./components/Sharedlayout/Sharedlayout";
import  Iphone from "./components/Iphone/Iphone"
import SingleProduct from "./components/Singleproduct/Singleproduct";

function App() {
  return (
    <>
      {/* <Header /> */}

      <Routes>
        <Route path="/" element={<Sharedlayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/ipad" element={<Ipad />} />
          <Route path="/mac" element={<Mac />} />
          <Route path="*" element={<Four04 />} />
          <Route path="/iphone" element={<Iphone />} />
          <Route path="/iphone/:id" element={<SingleProduct />} />
        </Route>
      </Routes>

      {/* <Footer /> */}
    </>
  );
}

export default App;
