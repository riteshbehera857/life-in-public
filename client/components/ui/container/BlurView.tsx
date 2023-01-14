import React, { CSSProperties, JSXElementConstructor } from "react";
import cn from "clsx";
import s from "./Container.module.css";

type Type = "div" | "nav" | "header";

interface BlurViewProps {
  type?: Type;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  onClick?: () => any;
}

const BlurView: React.FC<BlurViewProps> = ({
  type = "div",
  className = "",
  style,
  children,
  onClick,
}) => {
  const componentsMap: {
    [View in Type]: React.ComponentType<any> | string;
  } = {
    div: "div",
    nav: "nav",
    header: "header",
  };
  const Component:
    | JSXElementConstructor<any>
    | React.ElementType<any>
    | React.ComponentType<any>
    | string = componentsMap[type];
  return (
    <Component
      className={cn(
        s.root,
        {
          [s.div]: type === "div",
          [s.nav]: type === "nav",
          [s.header]: type === "header",
        },
        className
      )}
      style={style}
      onClick={onClick}
    >
      {children}
    </Component>
  );
};

export default BlurView;
