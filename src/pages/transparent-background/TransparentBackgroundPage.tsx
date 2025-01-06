import {
  Application,
  useApplication,
  extend,
  useSuspenseAssets,
} from "@pixi/react";
import { Container, Graphics, Point, Sprite } from "pixi.js";
import { useCallback, useRef, useState } from "react";
import { useTick } from "@pixi/react";
import styles from './TransparentBackgroundPage.module.css';

extend({ Container, Graphics, Sprite });

const BunnySprite = (props: any) => {
  const [rotation, setRotation] = useState(0);

  const { app } = useApplication();

  const [center_point, setCenter_point] = useState<Point>(
    new Point(
      app.screen.width / 2,
      app.screen.height / 2
    )
  );

  app.renderer.addListener("resize", () => {
    setCenter_point(
      new Point(
        app.screen.width / 2,
        app.screen.height / 2
      )
    );
  });
  useTick(() => setRotation(rotation + 0.1));
  const [bunnyTexture] = useSuspenseAssets([
    "https://pixijs.com/assets/bunny.png",
  ]);
  return <pixiSprite texture={bunnyTexture} {...props} x={center_point.x} y={center_point.y} rotation={rotation} anchor={0.5}/>;
};

function PixiApplication({ ...props }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const handleInit = useCallback(() => setIsInitialized(true), []);

  return (
    <Application onInit={handleInit} {...props}>
      {isInitialized && <BunnySprite />}
    </Application>
  );
}

function TransparentBackgroundPage() {
  const parentRef = useRef(null)
    return (
        <div className={styles["full-height"]}>
            <div className={styles["main-title"]}>
                <h1>3 - Transparent Background</h1>
            </div>
            <div className={styles["main-stage"]}>
                <div className={styles["stage-container"]} ref={parentRef}>
                    <PixiApplication backgroundAlpha={0} resizeTo={parentRef}/>
                </div>
            </div>
        </div>
    )
}

export default TransparentBackgroundPage;
