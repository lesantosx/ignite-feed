import { useState } from 'react'

import { ThumbsUp, Trash } from 'phosphor-react'
import styles from './Comment.module.css'

import Avatar from './Avatar'

interface CommentProps {
  content: string
  onDeleteComment: (comment: string) => void // Function type
}

export default function Comment({ content, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0)

  function handleDeleteComment() {
    onDeleteComment(content)
  }

  function handleLikeComment() {
    setLikeCount((count) => {
      return count + 1
    })
  }

  return (
    <div className={styles.comment}>
      <Avatar
        hasBorder={false}
        src="https://github.com/lesantosx.png"
      />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Leticia Santos</strong>
              <time dateTime="2022-05-11 08:13:30">Cerca de 1h atrás</time>
            </div>
            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>

          <p>{ content }</p>
        </div>

        <footer>
          <button onClick={handleLikeComment} >
            <ThumbsUp />
            Aplaudir <span>{ likeCount }</span>
          </button>
        </footer>
      </div>
    </div>
  )
}