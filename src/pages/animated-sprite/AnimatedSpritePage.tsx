import React, { useEffect, useState, useRef } from "react";
import {
  AnimatedSprite,
  Container as PixiContainer,
  Texture,
  Assets,
  Graphics,
  Text,
} from "pixi.js";
import { Application, useTick, extend, useApplication } from "@pixi/react";
import styles from "./AnimatedSpritePage.module.css";

extend({ AnimatedSprite, Container: PixiContainer, Graphics, Text });

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
  const [isPlaying, setIsPlaying] = useState(true);
  const {app} = useApplication();
  const spriteRef = useRef<AnimatedSprite>(null);

  useEffect(() => {
    if (spriteRef.current) {
      spriteRef.current.animationSpeed = 0.5;
      if (isPlaying) {
        spriteRef.current.play();
      } else {
        spriteRef.current.stop();
      }
    }
  }, [isPlaying]);

  useTick(() => {
    setRotation((prev) => prev + 0.01);
  });

  return (
    <pixiContainer>
      <pixiContainer x={50} y={50} interactive={true} cursor="pointer" onPointerDown={() => setIsPlaying(!isPlaying)}>
        <pixiGraphics
          draw={g => {
            g.clear();
            g.beginFill(0x0000ff);
            g.drawRoundedRect(0, 0, 80, 30, 5);
            g.endFill();
          }}
        />
        <pixiText
          text={isPlaying ? 'Stop' : 'Play'}
          x={40}
          y={15}
          anchor={0.5}
          style={{ fill: 'white', fontSize: 16 }}
        />
      </pixiContainer>
      <pixiContainer x={app.screen.width/2} y={app.screen.height/2}>
        <Textures
          spritesheet="https://pixijs.com/assets/spritesheet/fighter.json"
          textureChain={true}
        >
          {(textures) => (
            <pixiAnimatedSprite
              ref={spriteRef}
              textures={textures}
              anchor={0.5}
              rotation={rotation}
            />
          )}
        </Textures>
      </pixiContainer>
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
