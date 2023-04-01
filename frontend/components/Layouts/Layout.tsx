import React from "react";

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

function Layout({ children, className }: LayoutProps) {
  return <div className={"px-72" + " " + className}>{children}</div>;
}

export default Layout;
