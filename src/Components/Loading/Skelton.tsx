import React from "react";
import "./Skelton.css";

interface SkeltonProps {
  classNames?: string;
  borderRadius?: string;
}

const Skelton = ({ borderRadius = "4px", classNames }: SkeltonProps) => {
  return <div className={"skeleton-loader w-96 h-[500px]"} style={{ borderRadius }} />;
};

export default Skelton;
