export interface MatrixInputProps {
    onMatrixChange: (matrix: number[][]) => void;
    rows: number;
    cols: number;
  }
  
  export interface MatrixOperationsProps {
    matrixA: number[][] | null;
    matrixB: number[][] | null;
  }