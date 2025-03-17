import React, { useState, useEffect } from 'react';

const SudokuBoard = () => {
  // 難易度管理
  const [difficulty, setDifficulty] = useState('easy'); // 'easy', 'medium', 'hard'
  
  // 9x9の空のボードを作成
  const [board, setBoard] = useState(
    Array(9).fill().map(() => Array(9).fill(null))
  );
  
  // 初期セル（固定値）を記録
  const [initialCells, setInitialCells] = useState(
    Array(9).fill().map(() => Array(9).fill(false))
  );
  
  // 選択中のセルを追跡
  const [selectedCell, setSelectedCell] = useState(null);
  
  // クリア状態の管理
  const [isCompleted, setIsCompleted] = useState(false);
  
  // クリア時の祝福メッセージ表示状態
  const [showCelebration, setShowCelebration] = useState(false);
  
  // ページ読み込み時に自動的にパズルを生成
  useEffect(() => {
    generateNewPuzzle(difficulty);
  }, []);

  // 完成した数独ボードの生成関数
  const generateSolvedPuzzle = () => {
    // 空のボードを作成
    const grid = Array(9).fill().map(() => Array(9).fill(null));
    
    // バックトラッキングで解く
    const solve = (grid) => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          // 空のセルを見つける
          if (grid[row][col] === null) {
            // 1から9の数字をランダムな順序で試す
            const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
            
            for (const num of numbers) {
              if (isValid(grid, row, col, num)) {
                grid[row][col] = num;
                
                if (solve(grid)) {
                  return true;
                }
                
                grid[row][col] = null;
              }
            }
            
            return false;
          }
        }
      }
      
      return true;
    };
    
    // 数字が有効かチェック
    const isValid = (grid, row, col, num) => {
      // 行チェック
      for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num) {
          return false;
        }
      }
      
      // 列チェック
      for (let x = 0; x < 9; x++) {
        if (grid[x][col] === num) {
          return false;
        }
      }
      
      // 3x3ボックスチェック
      const boxRow = Math.floor(row / 3) * 3;
      const boxCol = Math.floor(col / 3) * 3;
      
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if (grid[boxRow + r][boxCol + c] === num) {
            return false;
          }
        }
      }
      
      return true;
    };
    
    // 解く
    solve(grid);
    return grid;
  };
  
  // 難易度に応じてランダムに穴をあける関数
  const createPuzzleWithHoles = (solvedGrid, difficulty) => {
    const puzzle = solvedGrid.map(row => [...row]);
    const initialCellsGrid = Array(9).fill().map(() => Array(9).fill(true));
    
    // 難易度に応じた空白セルの数
    let emptyCells;
    switch (difficulty) {
      case 'easy':
        emptyCells = 10; // 約30個のセルを空にする（簡単）
        break;
      case 'medium':
        emptyCells = 25; // 約45個のセルを空にする（中級）
        break;
      case 'hard':
        emptyCells = 40; // 約60個のセルを空にする（難しい）
        break;
      default:
        emptyCells = 30;
    }
    
    // ランダムに穴をあける
    let count = 0;
    while (count < emptyCells) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      
      if (puzzle[row][col] !== null) {
        puzzle[row][col] = null;
        initialCellsGrid[row][col] = false;
        count++;
      }
    }
    
    return { puzzle, initialCellsGrid };
  };
  
  // 難易度に応じてパズルを生成する関数
  const generateNewPuzzle = (newDifficulty) => {
    setDifficulty(newDifficulty);
    const solvedPuzzle = generateSolvedPuzzle();
    const { puzzle, initialCellsGrid } = createPuzzleWithHoles(solvedPuzzle, newDifficulty);
    
    setBoard(puzzle);
    setInitialCells(initialCellsGrid);
    setSelectedCell(null);
    // クリア状態とお祝いメッセージをリセット
    setIsCompleted(false);
    setShowCelebration(false);
  };
  
  // セルがクリックされたときの処理
  const handleCellClick = (rowIndex, colIndex) => {
    // 初期セル（固定値）はクリックできない
    if (initialCells[rowIndex][colIndex]) {
      return;
    }
    
    // 同じセルがクリックされた場合は選択を解除、そうでなければ選択
    if (selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex) {
      setSelectedCell(null);
    } else {
      setSelectedCell({ row: rowIndex, col: colIndex });
    }
  };
  
  // 数字が選択されたときの処理
  const handleNumberSelect = (number) => {
    if (selectedCell) {
      const newBoard = [...board];
      newBoard[selectedCell.row][selectedCell.col] = number;
      setBoard(newBoard);
      setSelectedCell(null); // 選択を解除
      
      // 数字を入力した後、パズルが完成したかチェック
      checkCompletion(newBoard);
    }
  };
  
  // パズルが完成したかチェックする関数
  const checkCompletion = (currentBoard) => {
    // すべてのセルが埋まっているか確認
    const isFilled = currentBoard.every(row => row.every(cell => cell !== null));
    
    if (isFilled) {
      // 行、列、3x3ブロックが正しく埋まっているか確認
      const isValid = checkValidSolution(currentBoard);
      
      if (isValid) {
        setIsCompleted(true);
        // 少し遅延を入れて祝福メッセージを表示
        setTimeout(() => {
          setShowCelebration(true);
        }, 300);
      }
    }
  };
  
  // 解答が有効かチェックする関数
  const checkValidSolution = (grid) => {
    // 1-9の全ての数字を含む配列
    const validSet = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    // 各行をチェック
    for (let row = 0; row < 9; row++) {
      const rowValues = [...grid[row]].sort((a, b) => a - b);
      if (!areArraysEqual(rowValues, validSet)) {
        return false;
      }
    }
    
    // 各列をチェック
    for (let col = 0; col < 9; col++) {
      const colValues = [];
      for (let row = 0; row < 9; row++) {
        colValues.push(grid[row][col]);
      }
      if (!areArraysEqual(colValues.sort((a, b) => a - b), validSet)) {
        return false;
      }
    }
    
    // 各3x3ブロックをチェック
    for (let boxRow = 0; boxRow < 3; boxRow++) {
      for (let boxCol = 0; boxCol < 3; boxCol++) {
        const boxValues = [];
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            boxValues.push(grid[boxRow * 3 + row][boxCol * 3 + col]);
          }
        }
        if (!areArraysEqual(boxValues.sort((a, b) => a - b), validSet)) {
          return false;
        }
      }
    }
    
    return true;
  };
  
  // 2つの配列が等しいかチェックするヘルパー関数
  const areArraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };
  
  // 数字選択のポップアップ
  const NumberSelector = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, null];
    
    // ポップアップ内のクリックがボードに伝播しないようにする
    const handlePopupClick = (e) => {
      e.stopPropagation();
    };
    
    return (
      <div 
        className="absolute bg-white/85 shadow-xl rounded-lg p-12 grid grid-cols-10 gap-10 z-10 border border-gray-200"
        onClick={handlePopupClick}
      >
        {numbers.map((num, index) => (
          <button
            key={index}
            className={`w-10 h-10 flex items-center justify-center border ${num === null ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-600'} rounded-md hover:bg-gray-200 text-lg font-medium transition-colors`}
            onClick={() => handleNumberSelect(num)}
          >
            {num === null ? "消去" : num}
          </button>
        ))}
      </div>
    );
  };
  
  return (
    <div className="flex flex-col items-center mx-auto max-w-md p-4">
      <h1 className="text-2xl font-bold mb-4">数独</h1>
      
      {/* 難易度選択と新しいゲーム開始ボタン */}
      <div className="mb-4 flex space-x-2">
        <button 
          className={`px-3 py-1 rounded-md ${difficulty === 'easy' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          onClick={() => generateNewPuzzle('easy')}
        >
          簡単
        </button>
        <button 
          className={`px-3 py-1 rounded-md ${difficulty === 'medium' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
          onClick={() => generateNewPuzzle('medium')}
        >
          中級
        </button>
        <button 
          className={`px-3 py-1 rounded-md ${difficulty === 'hard' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          onClick={() => generateNewPuzzle('hard')}
        >
          難しい
        </button>
      </div>
      
      <button 
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        onClick={() => generateNewPuzzle(difficulty)}
      >
        新しいゲーム
      </button>
      
      {/* クリア時のお祝いメッセージ */}
      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-30 bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm mx-auto animate-bounce">
            <h2 className="text-2xl font-bold text-green-600 mb-4">クリア！</h2>
            <p className="text-lg mb-4">おめでとうございます！{difficulty === 'easy' ? '簡単' : difficulty === 'medium' ? '中級' : '難しい'}モードをクリアしました。</p>
            <div className="flex justify-center space-x-2">
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                onClick={() => generateNewPuzzle(difficulty)}
              >
                新しいゲームを始める
              </button>
              <button 
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                onClick={() => setShowCelebration(false)}
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className={`grid grid-cols-9 gap-0 border-2 border-black relative ${isCompleted ? 'opacity-50' : ''}`}>
        {board.map((row, rowIndex) => (
          row.map((cell, colIndex) => {
            // 3x3サブグリッドの太い境界線
            const borderRight = (colIndex + 1) % 3 === 0 && colIndex < 8 ? "border-r-2" : "border-r";
            const borderBottom = (rowIndex + 1) % 3 === 0 && rowIndex < 8 ? "border-b-2" : "border-b";
            
            // 選択されたセルかどうか
            const isSelected = selectedCell && 
                              selectedCell.row === rowIndex && 
                              selectedCell.col === colIndex;
            
            // 初期セル（固定値）かどうか
            const isInitialCell = initialCells[rowIndex][colIndex];
            
            return (
              <div 
                key={`${rowIndex}-${colIndex}`} 
                className={`w-10 h-10 flex items-center justify-center border-gray-400 
                          ${borderRight} ${borderBottom} 
                          ${isSelected ? 'bg-blue-100' : isInitialCell ? 'bg-gray-100' : 'hover:bg-gray-100'} 
                          ${isInitialCell ? 'cursor-not-allowed' : 'cursor-pointer'} 
                          relative`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell !== null && (
                  <span className={`text-lg ${isInitialCell ? 'font-bold text-black' : isCompleted ? 'font-medium text-green-600' : 'font-medium text-blue-600'}`}>
                    {cell}
                  </span>
                )}
                
                {isSelected && !isCompleted && (
                  <div 
                    className="fixed inset-0 z-0"
                    onClick={() => setSelectedCell(null)}
                  ></div>
                )}
                
                {isSelected && !isCompleted && (
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-20">
                    <NumberSelector />
                  </div>
                )}

                {/* クリア時のセルのエフェクト - 繰り返しフェードイン/アウト */}
                {isCompleted && !showCelebration && (
                  <div className="absolute inset-0 bg-green-200 animate-pulse opacity-30"></div>
                )}
              </div>
            );
          })
        ))}
      </div>
    </div>
  );
};

export default SudokuBoard;