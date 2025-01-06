import { Application, extend } from "@pixi/react";
import {
  Container,
  Graphics,
  Text,
  FillGradient,
  Color,
  TextStyle,
} from "pixi.js";
import { useCallback, useRef, useState } from "react";
import styles from "./TextPage.module.css";

extend({ Container, Graphics, Text });

function ChildComponent() {
  const fill = new FillGradient(0, 0, 0, 36 * 1.7 * 7);

  const colors = [0xffffff, 0x00ff99].map((color) =>
    Color.shared.setValue(color).toNumber()
  );
  colors.forEach((number, index) => {
    const ratio = index / colors.length;

    fill.addColorStop(ratio, number);
  });
  const style = new TextStyle({
    fontFamily: "Arial",
    fontSize: 36,
    fontStyle: "italic",
    fontWeight: "bold",
    fill: { fill },
    stroke: { color: "#4a1850", width: 5, join: "round" },
    dropShadow: {
      color: "#000000",
      blur: 4,
      angle: Math.PI / 6,
      distance: 6,
    },
    wordWrap: true,
    wordWrapWidth: 440,
  });

  const skewStyle = new TextStyle({
    fontFamily: "Arial",
    dropShadow: {
      alpha: 0.8,
      angle: 2.1,
      blur: 4,
      color: "0x111111",
      distance: 10,
    },
    fill: "#ffffff",
    stroke: { color: "#004620", width: 12, join: "round" },
    fontSize: 60,
    fontWeight: "lighter",
  });

  return (
    <>
      <pixiText text={"Basic text in pixi"} x={50} y={100} />
      <pixiText
        text={"Rich text with a lot of options and across multiple lines"}
        style={style}
        x={50}
        y={220}
      />
      <pixiText
        text={"SKEW IS COOL"}
        style={skewStyle}
        skew={{ x: 0.65, y: -0.3 }}
        anchor={0.5}
        x={300}
        y={400}
      />
    </>
  );
}

function PixiApplication({ ...props }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const handleInit = useCallback(() => setIsInitialized(true), []);

  return (
    <Application onInit={handleInit} {...props}>
      {isInitialized && <ChildComponent />}
    </Application>
  );
}

function TextPage() {
  const parentRef = useRef(null);
  return (
    <div className={styles["full-height"]}>
      <div className={styles["main-title"]}>
        <h1>5 - Text</h1>
      </div>
      <div className={styles["main-stage"]}>
        <div className={styles["stage-container"]} ref={parentRef}>
          <PixiApplication background={"#1099bb"} resizeTo={parentRef} />
        </div>
      </div>
    </div>
  );
}

export default TextPage;
