import { useEffect, useState } from "react";
import {
  Container,
  Sprite,
  Text,
  // Texture,
  BLEND_MODES,
  Assets,
} from "pixi.js";
import { Application, useTick, extend } from "@pixi/react";

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
  const [textures, setTextures] = useState({ panda: undefined, gradient: undefined });
  const size = 800 / 5;
  const pandas = useState<Array<Sprite>>([]);

  useEffect(() => {
    const loadAssets = async () => {
      const pandaTexture = await Assets.load("https://pixijs.com/assets/panda.png");
      const gradientTexture = await Assets.load("https://pixijs.com/assets/rainbow-gradient.png");
      setTextures({ panda: pandaTexture, gradient: gradientTexture });
    };
    loadAssets();
  }, []);

  useTick(() => {
    pandas[0].forEach((panda, i) => {
      if (panda) panda.rotation += 0.01 * (i % 2 ? 1 : -1);
    });
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
              texture={textures.gradient}
              width={size}
              height={size}
              blendMode={blendMode}
            />
            <pixiSprite
              texture={textures.panda}
              width={100}
              height={100}
              anchor={0.5}
              x={size / 2}
              y={size / 2}
              ref={(sprite) => {
                if (sprite) pandas[0][i] = sprite;
              }}
            />
            <pixiText
              text={blendMode}
              x={size / 2}
              y={size - 20}
              anchor={{ x: 0.5, y: 0 }}
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
    >
      <BlendModesDemo />
    </Application>
  );
};

export default BlendModePage;
