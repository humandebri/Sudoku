import React, { useState } from 'react';

const SudokuBoard = () => {
  // 9x9の空のボードを作成
  const [board, setBoard] = useState(
    Array(9).fill().map(() => Array(9).fill(null))
  );
  
  // 選択中のセルを追跡
  const [selectedCell, setSelectedCell] = useState(null);
  
  // セルがクリックされたときの処理
  const handleCellClick = (rowIndex, colIndex) => {
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
    }
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
      <div className="grid grid-cols-9 gap-0 border-2 border-black relative">
        {board.map((row, rowIndex) => (
          row.map((cell, colIndex) => {
            // 3x3サブグリッドの太い境界線
            const borderRight = (colIndex + 1) % 3 === 0 && colIndex < 8 ? "border-r-2" : "border-r";
            const borderBottom = (rowIndex + 1) % 3 === 0 && rowIndex < 8 ? "border-b-2" : "border-b";
            
            // 選択されたセルかどうか
            const isSelected = selectedCell && 
                              selectedCell.row === rowIndex && 
                              selectedCell.col === colIndex;
            
            return (
                              <div 
                key={`${rowIndex}-${colIndex}`} 
                className={`w-10 h-10 flex items-center justify-center border-gray-400 
                          ${borderRight} ${borderBottom} 
                          ${isSelected ? 'bg-blue-100' : 'hover:bg-gray-100'} 
                          cursor-pointer relative`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell !== null && (
                  <span className="text-lg font-medium">
                    {cell}
                  </span>
                )}
                
                {isSelected && (
                  <div 
                    className="fixed inset-0 z-0"
                    onClick={() => setSelectedCell(null)}
                  ></div>
                )}
                
                {isSelected && (
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-20">
                    <NumberSelector />
                  </div>
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