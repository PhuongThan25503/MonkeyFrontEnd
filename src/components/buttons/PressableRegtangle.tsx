import React, { useRef, useEffect } from 'react';
import { Pressable } from 'react-native';
import Canvas from 'react-native-canvas';

type Props = {
  onPress: () => void;
}

const PressableRectangle = ({ onPress }:Props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = Canvas.getContext('2d');
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 100, 100);
  }, []);

  return (
    <Pressable onPress={onPress}>
      <Canvas ref={canvasRef} />
    </Pressable>
  );
};