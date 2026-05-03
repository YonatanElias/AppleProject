import React from "react";

import Header from "../Header/Header";
import Alert from "../Alert/Alert";
import SectionOne from "../SectionOne/SectionOne";
import SectionTwo from "../SectionTwo/SectionTwo";
import SectionThree from "../SectionThree/SectionThree";
import SectionFour from "../SectionFour/SectionFour";
import SectionFive from "../SectionFive/SectionFive";
import SectionSix from "../SectionSix/SectionSix";
import Footer from "../Footer/Footer";
import YoutubeVideos from "../YoutubeVideos/YoutubeVideos";



function Main() {
  return (
    <>
      <Header />
      <Alert /> 
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <SectionSix />
      {/* <YoutubeVideos /> */}
      <Footer />
    </>
  );
}

export default Main;
