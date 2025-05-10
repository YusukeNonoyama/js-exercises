export function addMatrix(matrixA, matrixB) {
    // 入力行列の確認
    let isValid =  checkColUniformity(matrixA) || checkColUniformity(matrixB) || checkMatrixSizeForAdd(matrixA, matrixB);
    if (isValid) return isValid;

    // 行列要素毎に和算した行列を生成
    let resultMatrix = createEmptyMatrix(matrixA.length, matrixA[0].length)
    for (let row = 0; row < resultMatrix.length; row++) {
        for (let col = 0; col < resultMatrix[row].length; col++) {
            if (isNaN(matrixA[row][col]) || isNaN(matrixB[row][col])) return "NaN element found"
            resultMatrix[row][col] = matrixA[row][col] + matrixB[row][col];
        }
    }
    return resultMatrix;
}

export function multiplyMatrix(matrixA, matrixB) {
    // 入力行列の確認
    let isValid =  checkColUniformity(matrixA) || checkColUniformity(matrixB) || checkMatrixSizeForMultiply(matrixA, matrixB);
    if (isValid) return isValid;

    // 行列積の計算をしやすくするためmatrixBの転置行列を定義
    let matrixBT = transposeMatrix(matrixB);

    // 行列要素毎に積算した行列を生成
    let resultMatrix = createEmptyMatrix(matrixA.length, matrixBT.length)
    resultMatrix = zeroInitializeMatrix(resultMatrix);
    for (let row = 0; row < resultMatrix.length; row++) {
        for (let col = 0; col < resultMatrix[row].length; col++) {
            for (let i = 0; i < matrixA[row].length; i++) {
                resultMatrix[row][col] += matrixA[row][i] * matrixBT[col][i];
            }
        }
    }
    return resultMatrix;
}

function checkColUniformity(matrix) {
    for (const i in matrix) {
        if (matrix[0].length !== matrix[i].length) return "ununiform matrix cols";
    }
}

function checkMatrixSizeForAdd(matrixA, matrixB) {
    if (matrixA.length !== matrixB.length) return "matrix size unmatched for row";
    for (const i in matrixA) {
        if (matrixA[i].length !== matrixB[i].length) return "matrix size unmatched for col";
    }
}

function checkMatrixSizeForMultiply(matrixA, matrixB) {
    console.log("multi:", matrixA.length, matrixB[0].length);
    if (matrixA.length !== matrixB[0].length) return "matrix size unmatched for multiplicaion";
}

function createEmptyMatrix(rowSize, colSize) {
    let emptyMatrix = new Array(rowSize);
    for (let i = 0; i < emptyMatrix.length; i++) {
        emptyMatrix[i] = new Array(colSize);
    }
    return emptyMatrix;
}

function zeroInitializeMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = 0;
        }
    }
    return matrix;
}

function transposeMatrix(matrix) {
    let matrixT = new Array(matrix[0].length);
    for (let i = 0; i < matrix[0].length; i++) {
        matrixT[i] = new Array(matrix.length);
    }
    for (let row = 0; row < matrixT.length; row++) {
        for (let col = 0; col < matrixT[row].length; col++) {
            matrixT[row][col] = matrix[col][row];
        }
    }
    return matrixT;
}
