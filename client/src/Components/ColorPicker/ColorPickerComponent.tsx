import React from "react";
import { ChromePicker } from "react-color";

interface ColorPickerComponentProps {
  setColor: (color: string) => void | undefined;
  color: string;
}

interface updatedColorProps {
  hex: string;
}

const ColorPickerComponent: React.FC<ColorPickerComponentProps> = ({
  setColor,
  color,
}): JSX.Element => {
  return (
    <>
      <ChromePicker
        color={color}
        onChange={(updatedColor: updatedColorProps) =>
          setColor(updatedColor?.hex)
        }
      />
    </>
  );
};
export default ColorPickerComponent;
