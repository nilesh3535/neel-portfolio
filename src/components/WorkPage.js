import React, { useEffect, useRef } from "react";
import styled, { ThemeProvider } from "styled-components";
import { DarkTheme } from "./Themes";
import { motion } from "framer-motion";

import LogoComponent from "../subComponents/LogoComponent";
import SocialIcons from "../subComponents/SocialIcons";
import PowerButton from "../subComponents/PowerButton";

import { Work } from "../data/WorkData";
import Card from "../subComponents/Card";
import { YinYang } from "./AllSvgs";
import BigTitlte from "../subComponents/BigTitlte";

const Box = styled.div`
  background-color: ${(props) => props.theme.body};
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
`;

const Main = styled(motion.ul)`
  position: fixed;
  top: 12rem;
  left: calc(10rem + 15vw);
  right: 2rem;
  height: 50vh;
  display: flex;
  color: white;

  /* ✅ horizontal scroll */
  overflow-x: scroll;
  overflow-y: hidden;

  /* ✅ white scrollbar under cards */
  ::-webkit-scrollbar {
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: white;
    border-radius: 10px;
  }
`;

const Rotate = styled.span`
  display: block;
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  width: 80px;
  height: 80px;
  z-index: 1;
`;

// Framer-motion Configuration
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      duration: 0.5,
    },
  },
};

const WorkPage = () => {
  const ref = useRef(null);
  const yinyang = useRef(null);

  useEffect(() => {
    const element = ref.current;

    // ✅ mouse wheel → horizontal scroll
    const handleWheel = (e) => {
      e.preventDefault();
      element.scrollBy({ left: e.deltaY * 2, behavior: "smooth" });
    };

    // ✅ yin yang rotation on horizontal scroll
    const handleScroll = () => {
      yinyang.current.style.transform = "rotate(" + element.scrollLeft + "deg)";
    };

    // ✅ arrow keys scroll
    const handleKey = (e) => {
      if (e.key === "ArrowRight") {
        element.scrollBy({ left: 300, behavior: "smooth" });
      }
      if (e.key === "ArrowLeft") {
        element.scrollBy({ left: -300, behavior: "smooth" });
      }
    };

    element.addEventListener("wheel", handleWheel, { passive: false });
    element.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKey);

    return () => {
      element.removeEventListener("wheel", handleWheel);
      element.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <ThemeProvider theme={DarkTheme}>
      <Box>
        <LogoComponent theme="dark" />
        <SocialIcons theme="dark" />
        <PowerButton />

        <Main ref={ref} variants={container} initial="hidden" animate="show">
          {Work.map((d) => (
            <Card key={d.id} data={d} />
          ))}
        </Main>

        <Rotate ref={yinyang}>
          <YinYang width={80} height={80} fill={DarkTheme.text} />
        </Rotate>

        <BigTitlte text="WORK" top="10%" right="20%" />
      </Box>
    </ThemeProvider>
  );
};

export default WorkPage;
