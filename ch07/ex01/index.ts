export function addMatrix(matrixA: number[][], matrixB:number[][]) {
    // 入力行列が加算可能か確認
    validateForMatrixAdd(matrixA, matrixB);
    // 行列要素毎に和算した行列を生成
    let resultMatrix = createMatrixFilledWithZero(matrixA.length, matrixA[0].length)
    for (let row = 0; row < resultMatrix.length; row++) {
        for (let col = 0; col < resultMatrix[row].length; col++) {
            resultMatrix[row][col] = matrixA[row][col] + matrixB[row][col];
        }
    }
    return resultMatrix;
}

export function multiplyMatrix(matrixA: number[][], matrixB: number[][]) {
    // 入力行列が乗算可能か確認
    validateForMatrixMultiply(matrixA, matrixB);
    // 行列積のサイズはA×Bの場合、Aの行数×Bの列数
    let resultMatrix = createMatrixFilledWithZero(matrixA.length, matrixB[0].length)
    // 行列要素毎に積算した行列を生成
    for (let row = 0; row < resultMatrix.length; row++) {
        for (let col = 0; col < resultMatrix[row].length; col++) {
            for (let i = 0; i < matrixA[row].length; i++) {
                // 行a×列bの要素は、行列Aのa行と行列Bのb列のそれぞれの要素の積の足し合わせ
                resultMatrix[row][col] += matrixA[row][i] * matrixB[i][col];
            }
        }
    }
    return resultMatrix;
}

function validateForMatrixAdd(matrixA: number[][], matrixB: number[][]) {
    // 入力行列の確認
    validateMatrix(matrixA);
    validateMatrix(matrixB);
    // 列数がマッチしなければエラー
    if (matrixA.length !== matrixB.length) {
        throw Error(`matrix size unmatch for col: ${matrixA}, ${matrixB}`);
    }
    // 行数がマッチしなければエラー
    if (matrixA[0].length !== matrixB[0].length) {
        throw Error(`matrix size unmatch for row: ${matrixA}, ${matrixB}`);
    }
}

function validateForMatrixMultiply(matrixA: number[][], matrixB: number[][]) {
    // 入力行列の確認
    validateMatrix(matrixA);
    validateMatrix(matrixB);
    // matrixAの列数とmatrixBの行数が一致していなければエラー
    if (matrixA.length !== matrixB[0].length) {
        throw Error(`matrix size unmatch for multiplication: ${matrixA}, ${matrixB}`); 
    }
}

// validation: NaNがないこと、行列がa行×b列として均一になっていることを確認
function validateMatrix(matrix: number[][]) {
    for (const row of matrix) {
        // 各行の長さが同じでなければエラー
        if (row.length !== matrix[0].length) {
            throw Error(`length of rows are not uniform in matrix: ${matrix}`);
        }
        for (const element of row) {
            // 要素にNaNがあればエラー
            if (isNaN(element)) {
                throw Error(`NaN in matrix: ${matrix}`);
            }
        }
    }
}

function createMatrixFilledWithZero(rowSize: number, colSize:number) {
    // 行: row
    let matrix = new Array(rowSize);
    for (let i = 0; i < matrix.length; i++) {
        // 列: col
        matrix[i] = new Array(colSize);
    }
    // 全要素に0を代入
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = 0;
        }
    }
    return matrix;
}