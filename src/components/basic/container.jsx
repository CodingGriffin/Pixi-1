import React, { useState, useEffect } from "react";
import { Stage, Container, Sprite } from "@pixi/react";
import * as PIXI from "pixi.js";

const PixiBunnies = () => {
  const [texture, setTexture] = useState(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const loadTexture = async () => {
      const bunnyTexture = await PIXI.Assets.load(
        "https://pixijs.com/assets/bunny.png"
      );
      setTexture(bunnyTexture);
    };

    loadTexture();
  }, []);

  useEffect(() => {
    let frameId;

    const animate = () => {
      setRotation((prev) => prev - 0.01); // Rotate slightly each frame
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(frameId);
  }, []);

  // if (!texture) return null;

  const bunnies = [];
  for (let i = 0; i < 25; i++) {
    bunnies.push(
      <Sprite
        key={i}
        // texture={texture}
        image="https://pixijs.com/assets/bunny.png"
        x={(i % 5) * 40}
        y={Math.floor(i / 5) * 40}
      />
    );
  }

  return (
    <Stage
      width={800}
      height={600}
      options={{ backgroundColor: 0x1099bb, resizeTo: window }}
    >
      <Container
        x={800 / 2}
        y={600 / 2}
        pivot={{ x: (5 * 40) / 2, y: (5 * 40) / 2 }}
        rotation={rotation}
      >
        {bunnies}
      </Container>
    </Stage>
  );
};

export default PixiBunnies;
