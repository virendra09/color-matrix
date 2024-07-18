import React, { useState } from 'react';
import './App.css';

const BoxColor = () => {
  const array = Array.from({ length: 9 });

  // use of hooks, state management.
  const [colors, setColors] = useState(array.fill(''));
  const [sequence, setSequence] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [finalIndex, setFinalIndex] = useState(null);

  const handleClick = (index) => {
    if (isClicked || finalIndex === null) return;

    const updatedColors = [...colors];

    if (updatedColors[index] === '') {
      updatedColors[index] = 'green';
      setColors(updatedColors);
      setSequence([...sequence, index]);

      if (index === finalIndex) {
        setIsClicked(true);
        changeToOrange([...sequence, index], updatedColors);
      }
    }
  };

  const changeToOrange = (seq, updatedColors) => {
    seq.forEach((idx, i) => {
      setTimeout(() => {
        updatedColors[idx] = 'orange';
        setColors([...updatedColors]);
      }, i * 500);
    });

    setTimeout(() => {
      setColors(Array.from({ length: 9 }).fill(''));
      setSequence([]);
      setIsClicked(false);
      setFinalIndex(null);
    }, (seq.length + 1) * 600);
  };

  const handleTargetChange = (event) => {
    const index = parseInt(event.target.value, 10);
    setFinalIndex(index);
    setSequence([]);
    setIsClicked(false);
  };

  return (
    <div>
    <label className='label1'>Let's change the color's of boxes.</label>

      <div className="grid">
        {colors.map((color, index) => (
          <div
            key={index}
            className="cell"
            style={{ backgroundColor: color }}
            onClick={() => handleClick(index)}
          ></div>
        ))}
      </div>
      <div>
        <label className='label'>Select Last Cell: </label>
        <select onChange={handleTargetChange} value={finalIndex ?? ''}>
          <option value="" disabled>Select cell</option>
          {Array.from({ length: 9 }, (e, i) => (
            <option key={i} value={i}>{i + 1}</option>
          ))}
          </select><br/>
          <label className='label'>Please select the cell number which you want to be last cell.</label>

      </div>
    </div>
  );
};

export default BoxColor;
