"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import GlowingButton from "./buttons/GlowingButton";
import ThemeButton from "./buttons/ThemeButton";
import { useParticleContext } from "@/context/ParticleContext";
import { useLocale } from "next-intl";
import { usePathname, Link as NextIntlLink, useRouter } from "@/navigation";
import projects from "@/db/static/projects";
import { useParams } from "next/navigation";

export default function Navbar() {
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
  const pathname = usePathname();
  const router = useRouter();
  const { particles, handleParticles } = useParticleContext();
  const locale = useLocale();
  return (
    <NextUINavbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll
      className="backdrop-saturate-150 bg-background/70 border-0"
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
          <motion.li variants={item}>
            <Link tabIndex={-1} className="block w-full" href="/">
              <GlowingButton selectedPath={pathname === "/"}>
                Home
              </GlowingButton>
            </Link>
          </motion.li>

          <motion.li variants={item}>
            <Link tabIndex={-1} className="block w-full" href="/projects">
              <GlowingButton selectedPath={pathname === "/projects"}>
                Projects
              </GlowingButton>
            </Link>
          </motion.li>
          <motion.li variants={item}>
            <Link tabIndex={-1} className="block w-full" href="/about">
              <GlowingButton selectedPath={pathname === "/about"}>
                About
              </GlowingButton>
            </Link>
          </motion.li>
          <motion.li variants={item}>
            <GlowingButton onClick={() => handleParticles(!particles)}>
              {particles ? "Disable Particles" : "Enable Particles"}
            </GlowingButton>
          </motion.li>
          <motion.li variants={item}>
            <ThemeButton />
          </motion.li>
          <motion.li variants={item}>
            <GlowingButton
              onClick={() => {
                router.replace(
                  {
                    pathname,
                    // TypeScript will validate that only known `params` are used in combination
                    // with a given `pathname`. Since the two will always match for the current
                    // route, we can skip runtime checks.
                    params: {
                      endpoint: projects.map((project) => project.endpoint),
                    },
                  },
                  { locale: locale === "en" ? "tr" : "en" }
                );
              }}
            >
              {locale}
            </GlowingButton>
          </motion.li>
        </NavbarContent>
      </motion.div>
      <div className="md:hidden">
        <ThemeButton />
      </div>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link
            className="block w-full"
            href="/"
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            <GlowingButton selectedPath={pathname === "/"}>Home</GlowingButton>
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className="block w-full"
            href="/projects"
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            <GlowingButton selectedPath={pathname === "/projects"}>
              Projects
            </GlowingButton>
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className="block w-full"
            href="/about"
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            <GlowingButton selectedPath={pathname === "/about"}>
              About
            </GlowingButton>
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <GlowingButton
            onClick={() => {
              setIsMenuOpen(false);
              handleParticles(!particles);
            }}
          >
            {particles ? "Disable Particles" : "Enable Particles"}
          </GlowingButton>
        </NavbarMenuItem>
      </NavbarMenu>
    </NextUINavbar>
  );
}
