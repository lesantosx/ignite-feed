import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

import styles from './Post.module.css'

import Comment from './Comment'
import Avatar from './Avatar'

interface Author {
	name: string
	avatarUrl: string
	role: string
}

export interface PostType {
	id: number;
	author: Author;
	publishedAt: Date;
	content: Content[];
}

interface PostProps {
	post: PostType
}

interface Content {
	type: 'paragraph' | 'link';
	content: string;
}

export function Post({ post }: PostProps) {
	const [comments, setComments] = useState(['Teste comentário.'])

	const [newCommentText, setNewCommentText] = useState('')

	const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
		locale: ptBR
	})

	const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
		locale: ptBR,
		addSuffix: true
	})

	function handleCreateNewComment(event: FormEvent) {
		event.preventDefault()
		setComments([...comments, newCommentText])	
		setNewCommentText('')
	}

	function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
		event.target.setCustomValidity('')
		setNewCommentText(event.target.value)
	}

	function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
		event.target.setCustomValidity('Esse campo é obrigatório!')
	}

	function deleteComment(commentToDelete: String) {
		setComments(comments.filter((comment) => comment !== commentToDelete))
	} 

	return (
		<article className={styles.post}>
			<header>
				<div className={styles.author}>
					<Avatar src={post.author.avatarUrl} />
					<div className={styles.authorInfo}>
						<strong>{post.author.name}</strong>
						<span>{post.author.role}</span>
					</div>
				</div>

				<time
					title={publishedDateFormatted}
					dateTime={post.publishedAt.toISOString()}
				>
					{ publishedDateRelativeToNow }
				</time>
			</header>

			<div className={styles.content}>
				{ post.content.map(line => {
					if (line.type === 'paragraph') {
						return <p key={line.content} >{ line.content }</p>
					} else if (line.type === 'link') {
						return <p key={line.content}><a href="#">{ line.content }</a></p>
					}
				})}
			</div>

			<form onSubmit={handleCreateNewComment} className={styles.commentForm}>
				<strong>Deixe seu feedback</strong>
				<textarea
					name="comment"
					placeholder="Deixe um comentário"
					value={newCommentText}
					onChange={handleNewCommentChange}
					onInvalid={handleNewCommentInvalid}
					required
				/>

				<footer>
					<button
						type="submit"
						disabled={newCommentText.length === 0}
					>
						Publicar
					</button>
				</footer>
			</form>

			<div className={styles.commentList}>
				{comments.map(comment => {
					return (
						<Comment
							key={comment}
							content={comment}
							onDeleteComment={deleteComment}
						/>
					)	
				})}
			</div>
		</article>
	)
}