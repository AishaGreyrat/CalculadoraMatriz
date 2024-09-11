import { useState } from 'react';
import MatrixInput from './MatrixInput';
import MatrixOperations from './MatrixOperations';

const Calculator: React.FC = () => {
    const [matrixA, setMatrixA] = useState<number[][] | null>(null);
    const [matrixB, setMatrixB] = useState<number[][] | null>(null);
    const [dimension, setDimension] = useState(2); // Empieza con matrices 2x2
  
    // Actualiza la dimensión de las matrices (1, 2 o 3)
    const handleDimensionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newDimension = parseInt(e.target.value);
      setDimension(newDimension);
      setMatrixA(null); // Reinicia las matrices cuando cambia la dimension
      setMatrixB(null);
    };
  
    return (
      <div className="calculator-container">
        <h1>Calculadora de Matrices</h1>
  
        <div className="matrix-type-selector">
          <label htmlFor="dimension">Selecciona el tipo de matriz: </label>
          <select id="dimension" value={dimension} onChange={handleDimensionChange}>
            <option value={1}>Unidimensional (1x1)</option>
            <option value={2}>Bidimensional (2x2)</option>
            <option value={3}>Tridimensional (3x3)</option>
          </select>
        </div>
  
        <h2>Matriz A</h2>
        <MatrixInput onMatrixChange={setMatrixA} rows={dimension} cols={dimension} />
  
        <h2>Matriz B</h2>
        <MatrixInput onMatrixChange={setMatrixB} rows={dimension} cols={dimension} />
  
        {matrixA && matrixB && <MatrixOperations matrixA={matrixA} matrixB={matrixB} />}
      </div>
    );
  };

export default Calculator;