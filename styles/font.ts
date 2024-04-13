const fontGenerator = (
  weight: number,
  size: number,
  lineHeight: number,
  letterSpacing: number,
) => ({
  fontWeight: weight,
  fontSize: `${size}rem`,
  lineHeight: `${lineHeight}%`,
  letterSpacing: `${letterSpacing}px`,
});

const font = {
  D1: fontGenerator(700, 4.5, 130, -1.5),
  D2: fontGenerator(700, 3.75, 130, -0.5),
  D3: fontGenerator(700, 3, 130, 0),
  D4: fontGenerator(700, 2.75, 130, 0),
  D5: fontGenerator(700, 2.5, 130, 0),

  H1: fontGenerator(700, 2.25, 140, 0.25),
  H2: fontGenerator(700, 1.75, 140, 0),
  H3: fontGenerator(600, 1.5, 140, 0.15),
  H3_1: fontGenerator(600, 1.3, 140, 0.15),
  H4: fontGenerator(600, 1.25, 140, 0.15),
  H5: fontGenerator(600, 1.125, 140, 0.15),
  H6: fontGenerator(600, 1, 140, 0.15),

  p1: fontGenerator(400, 1.125, 140, 0.15),
  p2: fontGenerator(400, 1, 160, -0.15),
  p3: fontGenerator(400, 0.875, 160, -0.1),
  p4: fontGenerator(400, 0.625, 160, -0.1),

  btn1: fontGenerator(500, 1.125, 130, 0),
  btn2: fontGenerator(500, 1, 130, 0),
  btn3: fontGenerator(400, 0.875, 130, 0),
  btnBold: fontGenerator(700, 0.875, 130, 0),

  caption: fontGenerator(400, 0.75, 140, 0),
  context: fontGenerator(500, 1, 130, 0),
  code: fontGenerator(400, 1, 130, 0),
};

export default font;
