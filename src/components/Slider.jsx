import { Range, getTrackBackground } from "react-range";

function Slider({ values, setValues, min = 0, max = 500000 }) {
  const [lowerBound, upperBound] = values;

  return (
    <div>
      <p>
        ${lowerBound.toLocaleString()} - ${upperBound.toLocaleString()}
      </p>

      <Range
        step={1000}
        min={min}
        max={max}
        values={values}
        onChange={setValues}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "6px",
              width: "250px",
              borderRadius: "4px",
              background: getTrackBackground({
                values,
                colors: ["#ccc", "var(--theme-color)", "#ccc"],
                min,
                max,
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            key={props.key}
            style={{
              ...props.style,
              height: "15px",
              width: "15px",
              borderRadius: "50%",
              backgroundColor: "#fff",
              border: "2px solid var(--theme-color)",
              outline: "none",
            }}
          />
        )}
      />
    </div>
  );
}

export default Slider;
