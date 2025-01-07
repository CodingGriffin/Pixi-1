import {
  Application,
  useApplication,
  extend,
  useSuspenseAssets,
} from "@pixi/react";
import { Container, Graphics, Sprite } from "pixi.js";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./SliderPage.module.css";

extend({ Container, Graphics, Sprite });

const BunnySprite = ({ ...props }) => {
  const [bunnyTexture] = useSuspenseAssets([
    "https://pixijs.com/assets/bunny.png",
  ]);
  return <pixiSprite texture={bunnyTexture} {...props} />;
};

const Slider = ({ ...props }) => {
  return (
    <pixiGraphics
      {...props}
      draw={(graphics) => {
        graphics.clear();
        graphics.rect(0, 0, props.sliderWidth, 4);
        graphics.fill({ color: 0x272d37 });
      }}
    ></pixiGraphics>
  );
};

function ChildComponent() {
  const sliderRef = useRef<Graphics>(null);
  const handleRef = useRef<Graphics>(null);
  const [slider, setSlider] = useState<any>(null);
  const [handle, setHandle] = useState<any>(null);
  const [bunnyScale, setBunnyScale] = useState<number>(3);

  const { app } = useApplication();
  app.stage.hitArea = app.screen;
  const sliderWidth = 320;

  useEffect(() => {
    if (sliderRef.current && handleRef.current) {
      setSlider(sliderRef.current);
      setHandle(handleRef.current);
    }
  }, []);

  const onDrag = (e: any) => {
    const halfHandleWidth = handle.width / 2;
    handle.x = slider.x + Math.max(halfHandleWidth, Math.min(slider.toLocal(e.global).x, sliderWidth - halfHandleWidth));
    const t = 2 * (handle.x / sliderWidth - 0.5);
    setBunnyScale(3*(1.1 + t));
  };

  const onDragStart = () => {
    app.stage.eventMode = "static";
    app.stage.addEventListener("pointermove", onDrag);
  };

  const onDragEnd = (e: any) => {
    console.log(e);
    app.stage.eventMode = "auto";
    app.stage.removeEventListener("pointermove", onDrag);
  };

  return (
    <>
      <BunnySprite
        scale={bunnyScale}
        anchor={0.5}
        x={app.screen.width / 2}
        y={app.screen.height / 2}
      />
      <Slider
        ref={sliderRef}
        x={(app.screen.width - sliderWidth) / 2}
        y={app.screen.height * 0.75}
        sliderWidth={sliderWidth}
      />
      <pixiGraphics
        ref={handleRef}
        draw={(graphics) => {
          graphics.clear();
          graphics.circle(0, 0, 8).fill({ color: 0xffffff });
        }}
        x={slider&&slider.x}
        y={slider&&slider.y}
        eventMode="static"
        cursor="pointer"
        onPointerDown={onDragStart}
        onPointerUp={onDragEnd}
        onPointerUpOutside={onDragEnd}
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

function SliderPage() {
  const parentRef = useRef(null);
  return (
    <div className={styles["full-height"]}>
      <div className={styles["main-title"]}>
        <h1>8 - Event Slider</h1>
      </div>
      <div className={styles["main-stage"]}>
        <div className={styles["stage-container"]} ref={parentRef}>
          <PixiApplication
            antialias={true}
            background={"#1099bb"}
            resizeTo={parentRef}
          />
        </div>
      </div>
    </div>
  );
}

export default SliderPage;
