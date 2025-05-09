
const DotWithLine = ({
  dotColor = "#3b82f6",
  lineColor = "#3b82f6",
  dotSize = 12,
  lineWidth = 2,
  lineLength = 30,
  className = "",
}) => {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: lineLength * 2, height: lineLength * 2 }}
    >
      {/* The Dot */}
      <div
        className="absolute rounded-full"
        style={{
          backgroundColor: dotColor,
          width: dotSize,
          height: dotSize,
          left: 0,
          top: 0,
          zIndex: 10,
        }}
      />

      {/* Line going downward */}
      <div
        className="absolute"
        style={{
          backgroundColor: lineColor,
          width: lineWidth,
          height: lineLength,
          left: dotSize / 2 - lineWidth / 2,
          top: dotSize,
        }}
      />

      {/* Line going to the right */}
      <div
        className="absolute"
        style={{
          backgroundColor: lineColor,
          height: lineWidth,
          width: lineLength,
          left: dotSize,
          top: dotSize / 2 - lineWidth / 2,
        }}
      />
    </div>
  );
};

const DotWithRightLine = ({
    dotColor = "#3b82f6",
    lineColor = "#3b82f6",
    dotSize = 12,
    lineWidth = 2,
    lineLength = 30,
    className = "",
  }) => {

    return (
      <div
        className={`relative ${className}`}
        style={{ width: lineLength * 2, height: lineLength * 2 }}
      >
        {/* The Dot */}
        <div
          className="absolute rounded-full"
          style={{
            backgroundColor: dotColor,
            width: dotSize,
            height: dotSize,
            left: 0,
            top: 0,
            zIndex: 10,
          }}
        />

        {/* Line going to the right */}
        <div
          className="absolute"
          style={{
            backgroundColor: lineColor,
            height: lineWidth,
            width: lineLength,
            left: dotSize,
            top: dotSize / 2 - lineWidth / 2,
          }}
        />
      </div>
    );
  }


export { DotWithLine, DotWithRightLine };
export default DotWithLine;