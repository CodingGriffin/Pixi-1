import { useEffect, useState, useRef } from "react";
import {
  Container,
  Sprite,
  Text,
  BLEND_MODES,
  Assets,
  Texture,
} from "pixi.js";
import { Application, useTick, extend } from "@pixi/react";
import 'pixi.js/advanced-blend-modes';

extend({ Container, Sprite, Text });

const allBlendModes:Array<BLEND_MODES> = [
  "normal",
  "add",
  "screen",
  "darken",
  "lighten",
  "color-dodge",
  "color-burn",
  "linear-burn",
  "linear-dodge",
  "linear-light",
  "hard-light",
  "soft-light",
  "pin-light",
  "difference",
  "exclusion",
  "overlay",
  "saturation",
  "color",
  "luminosity",
  "add-npm",
  "subtract",
  "divide",
  "vivid-light",
  "hard-mix",
  "negation",
];

const BlendModesDemo = () => {
  const [textures, setTextures] = useState<{ panda: Texture | undefined, gradient: Texture | undefined }>({ 
    panda: undefined, 
    gradient: undefined 
  });
  const size = 800 / 5;
  const pandas = useRef<Array<Sprite | null>>([]);
  
  useEffect(() => {
    let isMounted = true;

    const loadAssets = async () => {
      try {
        const [pandaTexture, gradientTexture] = await Promise.all([
          Assets.load("https://pixijs.com/assets/panda.png"),
          Assets.load("https://pixijs.com/assets/rainbow-gradient.png")
        ]);
        
        if (isMounted) {
          setTextures({ panda: pandaTexture, gradient: gradientTexture });
        }
      } catch (error) {
        console.error('Failed to load textures:', error);
      }
    };

    loadAssets();
    return () => { isMounted = false; };
  }, []);

  useTick(() => {  
    if (pandas.current) {
      pandas.current.forEach((panda, i) => {
        if (panda) panda.rotation += 0.01 * (i % 2 ? 1 : -1);
      });
    }
  });

  if (!textures.panda || !textures.gradient) return null;

  return (
    <pixiContainer>
      {allBlendModes.map((blendMode, i) => {
        const x = (i % 5) * size;
        const y = Math.floor(i / 5) * size;

        return (
          <pixiContainer key={blendMode} x={x} y={y}>
            <pixiSprite
              texture={textures.panda}
              width={100}
              height={100}
              anchor={0.5}
              x={size / 2}
              y={size / 2}
              ref={(sprite) => {
                pandas.current[i] = sprite;
              }}
            />
            <pixiSprite
              texture={textures.gradient}
              width={size}
              height={size}
              blendMode={blendMode}
            />
            <pixiSprite
              texture={Texture.WHITE}
              x={size / 2 - 50}
              y={size - 40}
              width={100}
              height={24}
            />
            <pixiText
              text={String(blendMode)}
              x={size / 2}
              y={size - 20}
              anchor={{ x: 0.5, y: 0.5 }}
              style={{ fontSize: 16, fontFamily: "short-stack" }}
            />
          </pixiContainer>
        );
      })}
    </pixiContainer>
  );
};

const BlendModePage = () => {
  return (
    <Application
      antialias
      backgroundColor={0xffffff}
      resizeTo={window}
      useBackBuffer
    >
      <BlendModesDemo />
    </Application>
  );
};

export default BlendModePage;
