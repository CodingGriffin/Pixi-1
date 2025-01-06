import {
  Application,
  useApplication,
  extend,
  useSuspenseAssets,
} from "@pixi/react";
import { Container, Graphics, Point, Sprite } from "pixi.js";
import { useCallback, useRef, useState } from "react";
import { useTick } from "@pixi/react";
import styles from './ContainerPage.module.css';

extend({ Container, Graphics, Sprite });

const BunnySprite = (props: any) => {
  const [bunnyTexture] = useSuspenseAssets([
    "https://pixijs.com/assets/bunny.png",
  ]);
  return <pixiSprite texture={bunnyTexture} {...props} />;
};

function ChildComponent() {
  const [rotation, setRotation] = useState(0);

  const { app } = useApplication();
  const bunnies: Array<any> = [];
  for (let i = 0; i < 25; i++) {
    bunnies.push(
      <BunnySprite
        key={`bunny-${i}`}
        x={(i % 5) * 40}
        y={Math.floor(i / 5) * 40}
        anchor={0.5}
      />
    );
  }

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
  useTick(() => setRotation(rotation + 0.01));
  return (
    <pixiContainer x={center_point.x} y={center_point.y} pivot={{ x: (5 * 40) / 2, y: (5 * 40) / 2 }} rotation={rotation}>
      {bunnies}
    </pixiContainer>
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

function BasicContainer() {
  const parentRef = useRef(null)
    return (
        <div className={styles["full-height"]}>
            <div className={styles["main-title"]}>
                <h1>1 - Container</h1>
            </div>
            <div className={styles["main-stage"]}>
                <div className={styles["stage-container"]} ref={parentRef}>
                    <PixiApplication background={'#1099bb'} resizeTo={parentRef}/>
                </div>
            </div>
        </div>
    )
}

export default BasicContainer;
