import React, { useRef, useState } from "react";
import CardsTemplateExample from "../hero/CardsTemplateExample";
import { GrNext, GrPrevious } from "react-icons/gr";
import { motion } from "framer-motion";
const MovieSections = ({ title = "" }) => {
  const ref = useRef(null);
  const [translate, setTranslate] = useState(0);

  const handleTranslate = (direction) => {
    console.log(ref.current.innerWidth);
    if (direction === "left") {
      if(translate<0){
        setTranslate(translate +  window.innerWidth -500);
      }
      
    } else if (direction === "right") {
      setTranslate(translate - window.innerWidth + 500);
    }
  };
  return (
    <div>
      <h3 className="text-2xl ">{title}</h3>
      <div className="relative overflow-x-hidden">
        <div
          className="absolute left-0 bottom-0 bg-gradient-to-r from-primary-black to-transparent h-64 w-20 z-10 flex items-center justify-center cursor-pointer mb-8"
          onClick={() => {
            handleTranslate("left");
          }}
        >
          <GrPrevious size={40} />
        </div>
        <motion.div
          className="flex items-end gap-4 no-scrollbar py-8 px-4"
          animate={{ x: translate }}
          ref={ref}
        >
          <CardsTemplateExample />
          <CardsTemplateExample />
          <CardsTemplateExample />
          <CardsTemplateExample />
          <CardsTemplateExample />
          <CardsTemplateExample />
          <CardsTemplateExample />
          <CardsTemplateExample />
          <CardsTemplateExample />
          <CardsTemplateExample />
          <CardsTemplateExample />
          <CardsTemplateExample />
          <CardsTemplateExample />
          <CardsTemplateExample />
          <CardsTemplateExample />
          <CardsTemplateExample />
          <CardsTemplateExample />
        </motion.div>
        <div
          className="absolute right-0 bottom-0 bg-gradient-to-l from-primary-black to-transparent h-64 w-20 flex items-center justify-center cursor-pointer mb-8"
          onClick={() => handleTranslate("right")}
        >
          <GrNext size={40} />
        </div>
      </div>
    </div>
  );
};

export default MovieSections;
