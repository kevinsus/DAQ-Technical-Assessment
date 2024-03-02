import "./App.css";

interface TemperatureProps {
  temp: number;
}

function LiveValue({ temp }: TemperatureProps) {
  let valueColour = "white";

  if (temp < 20 || temp > 80) {
    valueColour = 'red'
  } else if (temp < 30 || temp > 70) {
    valueColour = 'orange'
  } else if (temp < 40 || temp > 60 ) {
    valueColour = 'yellow'
  } else {
    valueColour = 'white'
  }

  return (
    <header className="live-value" style={{ color: valueColour }}>
      {`${temp.toPrecision(3)}°C`}
    </header>
  );
}

export default LiveValue;
