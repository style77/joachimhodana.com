import { FaDocker, FaFigma, FaPython, FaSnowflake } from "react-icons/fa";
import { SiVisualstudiocode } from "react-icons/si";
import { SiAdobephotoshop } from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";
import { FaReact } from "react-icons/fa";
import { DiMongodb } from "react-icons/di";
import { SiMysql } from "react-icons/si";
import { BiLogoTailwindCss } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";
import { FaGolang } from "react-icons/fa6";
import { TbSql } from "react-icons/tb";

const LOGOS = [
    <RiNextjsFill size={24}  />,
    <FaReact size={24}  />,
    <BiLogoTailwindCss size={24}/>,
    <FaGithub size={24} />,
    <FaGolang size={24} />,
    <FaPython size={24} />,
    <FaSnowflake size={24} />,
    <TbSql size={24} />,
    <FaDocker size={24} />,
];

export default function Slider() {
  return (
    <div className="relative py-4 m-auto w-8/12 overflow-hidden before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-full before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-full after:-scale-x-100 after:content-['']">
      <div className="animate-infinite-slider flex w-[calc(250px*10)]">
        {LOGOS.map((logo, index) => (
          <div
            className="slide flex w-full items-center justify-center"
            key={index}
          >
            {logo}
          </div>
        ))}
        {LOGOS.map((logo, index) => (
          <div
            className="slide flex w-full items-center justify-center"
            key={index}
          >
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
}
