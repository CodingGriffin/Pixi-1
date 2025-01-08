import React, { useEffect, useState, useRef } from "react";
import {
  AnimatedSprite,
  Container as PixiContainer,
  Texture,
  Assets,
} from "pixi.js";
import { Application, useTick, extend, useApplication } from "@pixi/react";
import styles from "./AnimatedSpritePage.module.css";

extend({ AnimatedSprite, Container: PixiContainer });

const getTextures = (
  textures: Record<string, Texture>,
  asTextureChain: boolean
): Texture[] =>
  asTextureChain ? Object.values(textures) : Object.values(textures);

interface UseTexturesProps {
  spritesheet: string;
  textureChain?: boolean;
}

const useTextures = (
  spritesheet: string,
  asTextureChain = false
): Texture[] | undefined => {
  const [textures, setTextures] = useState<Texture[]>();

  useEffect(() => {
    const loadTextures = async () => {
      const sheet = await Assets.load(spritesheet);
      if (sheet.textures) {
        setTextures(getTextures(sheet.textures, asTextureChain));
      }
    };

    loadTextures();
  }, [spritesheet, asTextureChain]);

  return textures;
};

interface TexturesProps extends UseTexturesProps {
  children: (textures: Texture[]) => React.ReactNode;
}

const Textures: React.FC<TexturesProps> = ({
  children,
  spritesheet,
  textureChain = false,
}) => {
  const textures = useTextures(spritesheet, textureChain);
  return <>{textures && children(textures)}</>;
};

const JetFighter: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  // useTick((delta) => {
  //   if (delta) setRotation((prev) => prev + 0.01 * delta);
  // });
  const [lastTime, setLastTime] = useState(performance.now());

  useTick(() => {
    const currentTime = performance.now();
    const elapsed = (currentTime - lastTime) / 1000; // Convert ms to seconds
    setRotation((prev) => prev + 0.01 * elapsed * 60); // Normalize to 60 FPS
    setLastTime(currentTime);
  });

  const {app} = useApplication();
  return (
    <pixiContainer rotation={rotation} x={app.screen.width/2} y={app.screen.height/2}>
      <Textures
        spritesheet="https://pixijs.io/examples/examples/assets/spritesheet/fighter.json"
        textureChain={true}
      >
        {(textures) => (
          <pixiAnimatedSprite
            animationSpeed={0.5}
            isPlaying={true}
            textures={textures}
            anchor={0.5}
          />
        )}
      </Textures>
    </pixiContainer>
  );
};

function PixiApplication({ ...props }) {
  const [isInitialized, setIsInitialized] = React.useState(false);
  const handleInit = React.useCallback(() => setIsInitialized(true), []);

  return (
    <Application onInit={handleInit} {...props}>
      {isInitialized && <JetFighter />}
    </Application>
  );
}

function AnimatedSpritePage() {
  const parentRef = React.useRef(null);
  return (
    <div className={styles["full-height"]}>
      <div className={styles["main-title"]}>
        <h1>4 - Animated Sprite</h1>
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

export default AnimatedSpritePage;
