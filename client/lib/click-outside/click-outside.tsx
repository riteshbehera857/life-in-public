import React, {
  FC,
  forwardRef,
  MouseEvent,
  ReactElement,
  ReactNode,
  Ref,
  useEffect,
  useRef,
} from "react";
import { mergeRefs } from "react-merge-refs";

interface ClickOutsideProps {
  active?: boolean;
  onClick?: (e: MouseEvent) => void;
  ref?: Ref<any>;
  children?: ReactNode;
}

const hasParent = (element, root) => {
  return root && root.contains(element) && Boolean(element.closest("body"));
};

const ClickOutside: FC<ClickOutsideProps> = forwardRef(
  ({ active = true, onClick, ref, children }, forwardedRef) => {
    const innerRef = useRef();

    const child = children ? (React.Children.only(children) as any) : undefined;

    if (!child || child.type === React.Fragment) {
      throw new Error("A valid non Fragment React Children should be provided");
    }

    if (typeof onClick != "function") {
      throw new Error("onCLick must be a valid function");
    }

    useEffect(() => {
      if (active) {
        document.addEventListener("mousedown", handleClick);
        document.addEventListener("touchstart", handleClick);
      }

      return () => {
        if (active) {
          document.removeEventListener("mousedown", handleClick);
          document.removeEventListener("touchstart", handleClick);
        }
      };
    });

    const handleClick = (event) => {
      if (!hasParent(event.target, innerRef.current)) {
        onClick(event);
      }
    };

    const composedRefCallback = (element: ReactElement) => {
      if (typeof child.ref === "function") {
        child.ref(element);
      } else if (child.ref) {
        child.ref.current = element;
      }
    };

    return React.cloneElement(child, {
      ref: mergeRefs([composedRefCallback, innerRef, forwardedRef]),
    });
  }
);

ClickOutside.displayName = "ClickOutside";
export default ClickOutside;
