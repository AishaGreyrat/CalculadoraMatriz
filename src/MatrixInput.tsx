import {useEffect, useState } from 'react';
import { MatrixInputProps } from './MatrixInputProps';

const MatrixInput: React.FC<MatrixInputProps> = ({ onMatrixChange, rows, cols }) => {
  const [matrix, setMatrix] = useState<number[][]>([]);

  // Actualiza el tamaño de la matriz cuando cambian las props de filas o columnas
  useEffect(() => {
    setMatrix(Array.from({ length: rows }, () => Array(cols).fill(0)));
  }, [rows, cols]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => {
    const newMatrix = [...matrix];
    newMatrix[row][col] = parseFloat(e.target.value);
    setMatrix(newMatrix);
    onMatrixChange(newMatrix);
  };

  return (
    <div className="matrix-container">
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((value, colIndex) => (
            <input
              type="number"
              key={`${rowIndex}-${colIndex}`}
              value={value}
              onChange={(e) => handleChange(e, rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MatrixInput;