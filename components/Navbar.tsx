import {
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarItem,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import GlowingButton from "./buttons/GlowingButton";
import ThemeButton from "./buttons/ThemeButton";

export default function Navbar2({
  path,
  particles,
  setParticles,
}: {
  path: string;
  particles: boolean;
  setParticles: () => void;
}) {
  const container = {
    hide: {
      y: -100,
      opacity: 0,
      transition: {
        staggerDirection: -1,
      },
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        staggerDirection: 1,
      },
    },
  };
  const item = {
    hide: {
      y: -100,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
    },
  };
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const NavbarItemWrapped = motion(NavbarItem);
  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll
      className="bg-background md:bg-background/60 shadow-accent z-50 transition-shadow-bg duration-300"
      isBlurred
    >
      <motion.div
        variants={container}
        initial="hide"
        animate="show"
        className="w-full h-full"
      >
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarContent className="w-full hidden md:flex" justify="center">
          <NavbarItemWrapped variants={item}>
            <Link className="block w-full" href="/">
              <GlowingButton
                props={{
                  text: "Home",

                  selectedPath: path === "/",
                }}
              />
            </Link>
          </NavbarItemWrapped>
          <NavbarItemWrapped variants={item}>
            <Link className="block w-full" href="/projects">
              <GlowingButton
                props={{
                  text: "Projects",
                  selectedPath: path === "/projects",
                }}
              />
            </Link>
          </NavbarItemWrapped>
          <NavbarItemWrapped variants={item}>
            <Link className="block w-full" href="/about">
              <GlowingButton
                props={{
                  text: "About",

                  selectedPath: path === "/about",
                }}
              />
            </Link>
          </NavbarItemWrapped>
          <NavbarItemWrapped variants={item}>
            <GlowingButton
              props={{
                text: particles ? "Disable Particles" : "Enable Particles",
                onClick: () => setParticles(),
              }}
            />
          </NavbarItemWrapped>
          <NavbarItemWrapped className="cursor-pointer" variants={item}>
            <ThemeButton />
          </NavbarItemWrapped>
        </NavbarContent>
      </motion.div>
      <div className="md:hidden">
        <ThemeButton />
      </div>
      <NavbarMenu style={{ zIndex: "100" }}>
        <NavbarMenuItem>
          <Link className="block w-full" href="/">
            <GlowingButton
              props={{
                text: "Home",

                selectedPath: path === "/",
              }}
            />
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link className="block w-full" href="/projects">
            <GlowingButton
              props={{
                text: "Projects",

                selectedPath: path === "/projects",
              }}
            />
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link className="block w-full" href="/about">
            <GlowingButton
              props={{
                text: "About",

                selectedPath: path === "/about",
              }}
            />
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <GlowingButton
            props={{
              text: particles ? "Disable Particles" : "Enable Particles",
              onClick: () => {
                setIsMenuOpen(false);
                setParticles();
              },
            }}
          />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
