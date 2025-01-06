import React, { useMemo, useRef } from 'react';
import { Application, extend, useTick } from '@pixi/react';
import { Container, Sprite, Text, Texture } from 'pixi.js';
import styles from './BlendModePage.module.css';

extend({Container, Sprite, Text, Texture})
const BlendModeDemo: React.FC = () => {
  const allBlendModes = [
    'normal',
    'add',
    'screen',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'linear-burn',
    'linear-dodge',
    'linear-light',
    'hard-light',
    'soft-light',
    'pin-light',
    'difference',
    'exclusion',
    'overlay',
    'saturation',
    'color',
    'luminosity',
    'add-npm',
    'subtract',
    'divide',
    'vivid-light',
    'hard-mix',
    'negation',
  ];

  const size = 800 / 5;

  const pandaTexture = useMemo(() => Texture.from('https://pixijs.com/assets/panda.png'), []);
  const rainbowGradient = useMemo(() => Texture.from('https://pixijs.com/assets/rainbow-gradient.png'), []);
  const pandaRefs = useRef<(Sprite | null)[]>([]);
  useTick(() => {
    pandaRefs.current.forEach((panda, i) => {
      if (panda) {
        panda.rotation += 0.01 * (i % 2 ? 1 : -1);
      }
    });
  });

  return (
    <Application
      antialias
      backgroundColor={0xffffff}
      resizeTo={window}
    >
      {allBlendModes.map((blendMode, i) => (
        <pixiContainer
          key={blendMode}
          x={(i % 5) * size}
          y={Math.floor(i / 5) * size}
        >
          <pixiSprite
            ref={(el) => (pandaRefs.current[i] = el)}
            texture={pandaTexture}
            anchor={0.5}
            width={100}
            height={100}
            x={size / 2}
            y={size / 2}
          />
          <pixiSprite
            texture={rainbowGradient}
            width={size}
            height={size}
            blendMode={blendMode}
          />
          <pixiContainer>
            <pixiSprite
              texture={Texture.WHITE}
              x={size / 2 - 50 - 2}
              y={size - 20}
              width={100 + 4}
              height={20 + 4}
            />
            <pixiText
              text={blendMode}
              x={size / 2 - 50}
              y={size - 20}
              style={{
                fontSize: 16,
                fontFamily: 'short-stack',
              }}
            />
          </pixiContainer>
        </pixiContainer>
      ))}
    </Application>
  );
};

function PixiApplication({ ...props }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const handleInit = useCallback(() => setIsInitialized(true), []);

  return (
    <Application onInit={handleInit} {...props}>
      {isInitialized && <ChildComponent />}
    </Application>
  );
}

function BlendModePage() {
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
export default BlendModePage;
