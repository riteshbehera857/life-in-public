import React, {
  FunctionComponent,
  JSXElementConstructor,
  CSSProperties,
} from "react";
import cn from "clsx";
import s from "./Text.module.css";

type Variant = "heading" | "paragraph" | "pageHeading" | "sectionHeading";

interface TextProps {
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  html?: string;
  onClick?: () => any;
}

const Text: FunctionComponent<TextProps> = ({
  variant = "paragraph",
  className = "",
  style,
  children,
  html,
  onClick,
}: TextProps) => {
  const componentsMap: {
    [P in Variant]: React.ComponentType<any> | string;
  } = {
    paragraph: "p",
    heading: "h1",
    pageHeading: "h1",
    sectionHeading: "h2",
  };

  const Component:
    | JSXElementConstructor<any>
    | React.ElementType<any>
    | React.ComponentType<any>
    | string = componentsMap[variant];
  return (
    <Component
      className={cn(
        s.root,
        {
          [s.sectionHeading]: variant === "sectionHeading",
          [s.paragraph]: variant === "paragraph",
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

export default Text;
