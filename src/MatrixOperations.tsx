import { useState } from 'react';
import { MatrixOperationsProps } from './MatrixInputProps';

const MatrixOperations: React.FC<MatrixOperationsProps> = ({ matrixA, matrixB }) => {
    const [operation, setOperation] = useState<string>(''); // Estado para la operación seleccionada
  
    // Suma de matrices
    const addMatrices = (): number[][] => {
      if (!matrixA || !matrixB || matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) return [];
      return matrixA.map((row, i) => row.map((val, j) => val + matrixB[i][j]));
    };
  
    // Resta de matrices
    const subtractMatrices = (): number[][] => {
      if (!matrixA || !matrixB || matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) return [];
      return matrixA.map((row, i) => row.map((val, j) => val - matrixB[i][j]));
    };
  
    // Multiplicación de matrices
    const multiplyMatrices = (): number[][] => {
      if (!matrixA || !matrixB || matrixA[0].length !== matrixB.length) return [];
      const result = Array(matrixA.length).fill(0).map(() => Array(matrixB[0].length).fill(0));
  
      for (let i = 0; i < matrixA.length; i++) {
        for (let j = 0; j < matrixB[0].length; j++) {
          for (let k = 0; k < matrixB.length; k++) {
            result[i][j] += matrixA[i][k] * matrixB[k][j];
          }
        }
      }
  
      return result;
    };
  
    // Transposición de matriz
    const transposeMatrix = (matrix: number[][]): number[][] => {
      if (!matrix || matrix.length === 0) return [];
      return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
    };
  
    // Determinante para matriz 3x3
    const determinant3x3 = (matrix: number[][]): number => {
      if (!matrix || matrix.length !== 3 || matrix[0].length !== 3) return 0;
      const [a, b, c, d, e, f, g, h, i] = matrix.flat();
      return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
    };
  
    // Inversa para matriz 3x3
    const inverseMatrix3x3 = (matrix: number[][]): number[][] => {
      if (!matrix || matrix.length !== 3 || matrix[0].length !== 3) return [];
      const det = determinant3x3(matrix);
      if (det === 0) return []; // No existe la inversa si el determinante es cero
  
      const [a, b, c, d, e, f, g, h, i] = matrix.flat();
      return [
        [
          (e * i - f * h) / det,
          (c * h - b * i) / det,
          (b * f - c * e) / det
        ],
        [
          (f * g - d * i) / det,
          (a * i - c * g) / det,
          (c * d - a * f) / det
        ],
        [
          (d * h - e * g) / det,
          (b * g - a * h) / det,
          (a * e - b * d) / det
        ]
      ];
    };
  
    // Multiplicacion por un escalar
    const multiplyByScalar = (matrix: number[][], scalar: number): number[][] => {
      if (!matrix) return [];
      return matrix.map(row => row.map(val => val * scalar));
    };
  
    // Renderizacion de matriz
    const renderMatrix = (matrix: number[][]) => (
      <div className="matrix-container">
        {matrix.map((row, i) => (
          <div key={i} className="result-row">
            {row.map((val, j) => (
              <span key={j} className="result-cell">
                {val.toFixed(2)}
              </span>
            ))}
          </div>
        ))}
      </div>
    );
  
    // Renderiza segun la operación seleccionada
    const renderOperationResults = () => {
      switch (operation) {
        case 'add':
          return (
            <>
              <h3>Suma de Matrices</h3>
              {matrixA && matrixB && renderMatrix(addMatrices())}
            </>
          );
        case 'subtract':
          return (
            <>
              <h3>Resta de Matrices</h3>
              {matrixA && matrixB && renderMatrix(subtractMatrices())}
            </>
          );
        case 'multiply':
          return (
            <>
              <h3>Multiplicación de Matrices</h3>
              {matrixA && matrixB && renderMatrix(multiplyMatrices())}
            </>
          );
        case 'transpose':
          return (
            <>
              <h3>Transposición de Matriz A</h3>
              {matrixA && renderMatrix(transposeMatrix(matrixA))}
            </>
          );
        case 'determinant':
          return (
            <>
              <h3>Determinante de Matriz A</h3>
              <p>{matrixA && matrixA.length === 3 && matrixA[0].length === 3 ? determinant3x3(matrixA) : 'N/A'}</p>
            </>
          );
        case 'inverse':
          return (
            <>
              <h3>Inversa de Matriz A</h3>
              {matrixA && matrixA.length === 3 && matrixA[0].length === 3 ? renderMatrix(inverseMatrix3x3(matrixA)) : <p>N/A</p>}
            </>
          );
        case 'scalar':
          return (
            <>
              <h3>Multiplicación de Matriz A por un Escalar (con 2)</h3>
              {matrixA && renderMatrix(multiplyByScalar(matrixA, 2))}
            </>
          );
        default:
          return <p>Selecciona una operación.</p>;
      }
    };
  
    return (
      <div className="matrix-operations">
        <div className="operation-selector">
          <button onClick={() => setOperation('add')}>Sumar</button>
          <button onClick={() => setOperation('subtract')}>Restar</button>
          <button onClick={() => setOperation('multiply')}>Multiplicar</button>
          <button onClick={() => setOperation('transpose')}>Transponer</button>
          <button onClick={() => setOperation('determinant')}>Determinante</button>
          <button onClick={() => setOperation('inverse')}>Inversa</button>
          <button onClick={() => setOperation('scalar')}>Multiplicación por Escalar</button>
        </div>
        {renderOperationResults()}
      </div>
    );
  };
  

export default MatrixOperations;
