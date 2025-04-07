# Sudoku App | 数独アプリ

[English](#english) | [日本語](#japanese)

![Sudoku App Screenshot](/api/placeholder/800/450)

<a name="english"></a>
## English

A modern, interactive Sudoku game built with React and Tailwind CSS.

**Live Demo:** [https://sudoku-two-mocha.vercel.app/](https://sudoku-two-mocha.vercel.app/)

### Features

- **Multiple Difficulty Levels**: Choose between Easy, Medium, and Hard puzzles
- **Dynamic Puzzle Generation**: Each game creates a unique, solvable Sudoku puzzle
- **Intuitive Interface**: Clean design with number selector and cell highlighting
- **Built-in Validation**: Automatic checking for puzzle completion
- **Responsive Design**: Optimized for both desktop and mobile play
- **Celebration Effect**: Displays a congratulatory message upon successful completion

### Technology Stack

- **React 19**: Utilizes the latest React features and hooks for efficient state management
- **Tailwind CSS**: Custom styling with utility-first CSS framework
- **JavaScript ES6+**: Modern JavaScript with advanced array manipulation and algorithms
- **Backtracking Algorithm**: Implements a sophisticated algorithm for puzzle generation

### Implementation Details

#### Puzzle Generation

The application generates puzzles using a backtracking algorithm that:
1. Creates a fully solved Sudoku board
2. Strategically removes numbers based on the selected difficulty level
3. Ensures the puzzle has a unique solution

#### Game Logic

- **Board State Management**: Tracks the state of each cell and distinguishes between initial (fixed) values and user inputs
- **Cell Selection**: Implements an intuitive cell selection system with appropriate visual feedback
- **Number Input**: Provides a clean popup interface for number selection
- **Validation**: Continuously checks for rule violations and puzzle completion

#### UI/UX Considerations

- Visually distinguishes fixed cells from user-editable cells
- Highlights the 3x3 grids for better visual organization
- Provides immediate feedback on user actions
- Implements subtle animations for better user experience

### Local Development

#### Prerequisites

- Node.js (v16+)
- npm or yarn

#### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/sudoku-app.git
   cd sudoku-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Project Structure

```
sudoku-app/
├── public/              # Static files
├── src/                 # Source code
│   ├── App.js           # Main application component
│   ├── SudokuBoard.js   # Core game logic and UI
│   ├── index.js         # Entry point
│   └── ...              # Other React components and styles
├── package.json         # Project dependencies and scripts
└── tailwind.config.js   # Tailwind CSS configuration
```

### Future Enhancements

- Save game progress in local storage
- Timer and score tracking
- Dark mode support
- More advanced difficulty levels
- Hint system for players who get stuck
- Share completed puzzles with friends

### Deployment

The application is deployed on Vercel, offering:
- Continuous deployment from the main branch
- Global CDN for fast loading
- HTTPS by default

### License

MIT

---

<a name="japanese"></a>
## 日本語

React と Tailwind CSS で構築された、モダンでインタラクティブな数独ゲームです。

**ライブデモ:** [https://sudoku-two-mocha.vercel.app/](https://sudoku-two-mocha.vercel.app/)

### 機能

- **複数の難易度レベル**: 簡単、中級、難しいの3つの難易度から選択可能
- **動的パズル生成**: 毎回ユニークで解答可能な数独パズルを生成
- **直感的なインターフェース**: 数字選択とセル強調表示を備えたクリーンなデザイン
- **バリデーション機能**: パズル完成の自動チェック
- **レスポンシブデザイン**: デスクトップとモバイルの両方に最適化
- **クリアエフェクト**: パズル完成時にお祝いメッセージを表示

### 技術スタック

- **React 19**: 最新のReact機能とフックを使用した効率的な状態管理
- **Tailwind CSS**: ユーティリティファーストのCSSフレームワークによるカスタムスタイリング
- **JavaScript ES6+**: 高度な配列操作とアルゴリズムを使用したモダンなJavaScript
- **バックトラッキングアルゴリズム**: パズル生成のための洗練されたアルゴリズムを実装

### 実装の詳細

#### パズル生成

アプリケーションはバックトラッキングアルゴリズムを使用してパズルを生成します:
1. 完全に解かれた数独ボードを作成
2. 選択された難易度レベルに基づいて戦略的に数字を削除
3. パズルが一意の解答を持つことを保証

#### ゲームロジック

- **ボード状態管理**: 各セルの状態を追跡し、初期値（固定値）とユーザー入力を区別
- **セル選択**: 適切なビジュアルフィードバックを備えた直感的なセル選択システム
- **数字入力**: 数字選択のためのクリーンなポップアップインターフェース
- **検証**: ルール違反とパズル完成を継続的にチェック

#### UI/UX の考慮事項

- 固定セルとユーザー編集可能セルを視覚的に区別
- より良い視覚的構成のための3x3グリッドの強調表示
- ユーザーアクションに対する即時フィードバック
- より良いユーザー体験のための微妙なアニメーション

### ローカル開発

#### 前提条件

- Node.js (v16+)
- npm または yarn

#### セットアップ手順

1. リポジトリをクローン:
   ```bash
   git clone https://github.com/your-username/sudoku-app.git
   cd sudoku-app
   ```

2. 依存関係をインストール:
   ```bash
   npm install
   # または
   yarn install
   ```

3. 開発サーバーを起動:
   ```bash
   npm start
   # または
   yarn start
   ```

4. ブラウザで [http://localhost:3000](http://localhost:3000) を開く

### プロジェクト構造

```
sudoku-app/
├── public/              # 静的ファイル
├── src/                 # ソースコード
│   ├── App.js           # メインアプリケーションコンポーネント
│   ├── SudokuBoard.js   # コアゲームロジックとUI
│   ├── index.js         # エントリーポイント
│   └── ...              # その他のReactコンポーネントとスタイル
├── package.json         # プロジェクトの依存関係とスクリプト
└── tailwind.config.js   # Tailwind CSS設定
```

### 将来の拡張予定

- ローカルストレージにゲームの進行状況を保存
- タイマーとスコア追跡機能
- ダークモードサポート
- より高度な難易度レベル
- 行き詰まったプレイヤー向けのヒントシステム
- 完成したパズルを友達と共有する機能

### デプロイメント

アプリケーションはVercelにデプロイされ、以下を提供しています:
- メインブランチからの継続的デプロイメント
- 高速読み込みのためのグローバルCDN
- デフォルトでのHTTPS

### ライセンス

MIT

---

このプロジェクトは [Create React App](https://github.com/facebook/create-react-app) でブートストラップされました。
