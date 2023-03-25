import React, { createContext } from "react";

export const SectionContext = createContext("elements");

function Section({ children, className, context }) {
  return (
    <SectionContext.Provider value={context}>
      <section className={className}>{children}</section>
    </SectionContext.Provider>
  );
}

export default Section;
