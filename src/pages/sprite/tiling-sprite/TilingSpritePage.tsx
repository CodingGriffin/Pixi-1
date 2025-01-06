import {
  Application,
  useApplication,
  extend,
  useSuspenseAssets,
} from "@pixi/react";
import { TilingSprite } from "pixi.js";
import { useCallback, useRef, useState } from "react";
import { useTick } from "@pixi/react";
import styles from "./TilingSpritePage.module.css";

extend({ TilingSprite });

function ChildComponent() {
  const [count, setCount] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const [tilingTexture] = useSuspenseAssets([
    "https://pixijs.com/assets/p2.jpeg",
  ]);
  const { app } = useApplication();

  const updateCount = useCallback(() => {
    setX((prev) => prev + 1);
    setY((prev) => prev + 1);
    setCount((prev) => prev + 0.005);
  }, []);

  useTick(updateCount);
  return (
    <pixiTilingSprite
      texture={tilingTexture}
      width={app.screen.width}
      height={app.screen.height}
      tileScale={{ x: 2 + Math.sin(count), y: 2 + Math.cos(count) }}
      tilePosition={{ x: x, y: y }}
    />
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

function TilingSpritePage() {
  const parentRef = useRef(null);
  return (
    <div className={styles["full-height"]}>
      <div className={styles["main-title"]}>
        <h1>Tiling Sprite</h1>
      </div>
      <div className={styles["main-stage"]}>
        <div className={styles["stage-container"]} ref={parentRef}>
          <PixiApplication background={"#1099bb"} resizeTo={parentRef} />
        </div>
      </div>
    </div>
  );
}

export default TilingSpritePage;
