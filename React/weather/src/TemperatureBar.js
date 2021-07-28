const TemperatureBar = (props) => {
  const curr = Math.round(props.temp);
  const min = Math.round(props.temp_min);
  const max = Math.round(props.temp_max);
  const leftPos = 100 * ((curr - min) / (max - min));
  const currentStyles = {
    left: leftPos + '%'
  };

  return (
    <div className="temp-bar">
      {curr !== min && (
        <div className="min temp-item">
          <i className="bar"></i>
          <span className="temp">{min}&deg;C</span>
        </div>
      )}

      <div className="curr temp-item" style={currentStyles}>
        <i className="bar"></i>
        <span className="temp">{curr}&deg;C</span>
      </div>

      {curr !== max && (
        <div className="max temp-item">
          <i className="bar"></i>
          <span className="temp">{max}&deg;C</span>
        </div>
      )}
    </div>
  );
};

export default TemperatureBar;
