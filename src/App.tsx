import { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import useStore from "./stores/app";

function App() {
  const output = useStore((state) => state.output);
  const addText = useStore((state) => state.addText);

  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "o") {
        addText();
      }
      if (event.key === "t") {
        addText();
      }
      if (event.key === "s") {
        addText();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [addText]);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <Box
      ref={boxRef}
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        overflow: "auto",
      }}
    >
      <Typography variant="h3" padding={"64px"}>
        {/* <Typography variant="h3"> */}
        {output.split("").map((char: string, index: number) => {
          if (char === ".") {
            return <br key={`br-${index}`}></br>;
          } else {
            return <span key={`char-${index}`}>{char}</span>;
          }
        })}
      </Typography>
    </Box>
  );
}

export default App;
