import { useState } from "react";
import './App.css'

// 学習項目型
type studyItem = {
  id: number;
  title: string;
  progress: number;
  completed: boolean;
}

function App(){
  // 学習内容 新規項目
  const [title, setTitle] = useState("");
  // 学習内容 リスト
  const [items, setItems] = useState<studyItem[]>([]);

  // 学習内容追加
  const addItem = () => {
    if (!title) return;

    setItems([
      ...items,
      {
        id: Date.now(),
        title,
        progress: 0,
        completed: false,
      }
    ]);

    setTitle("");
  }

  // 学習進捗更新
  const onChangeProgress = (id:number, progress:number) => {
    setItems(
      items.map((item) => (
        item.id === id
          ? {
              ...item,
              progress,
            }
          : item
      ))
    )
  }

  // 学習進捗完了
  const toggleCompleted = (id:number) => {
    setItems(
      items.map((item) => (
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item
      ))
    )
  }

  return (
    <article>
      <h1 className="study-app-title">StudyTracker</h1>

      <section id="app-wrap" className="flex-wrapper">
        <div className="flex-grid">
          <section className="d-col-8 t-col-6 m-col-12">
            <div className="glass-bg study-list">
              <h2 className="study-list-title">Task</h2>
              <ul>
                {items.map((item) => (
                  <li key={item.id}>
                    <input 
                      type="checkbox"
                      checked={item.completed}
                      onChange={() =>
                        toggleCompleted(item.id)
                      }
                    />
                      {item.title}
                    <input 
                      type="number"
                      value={item.progress}
                      onChange={(i) => 
                        onChangeProgress(item.id, Number(i.target.value))
                      }
                    />%
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="d-col-4 t-col-6 m-col-12">
            <div className="glass-bg new-study-item">
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(v) => setTitle(v.target.value)}
                placeholder="New Study"
              />
              <button onClick={addItem}></button>
            </div>
          </section>
        </div>
      </section>
    </article>
  );
}

export default App;