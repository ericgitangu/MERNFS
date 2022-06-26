import React, {useState} from 'react'

const AddCommentForm = ({articleName, setArticleInfo}) => {
    const [username, setUserName] = useState('')
    const [commentText, setCommentText] = useState('')

    return(
        <div id="add-comment-form">
            <label>
                Name:
                <input type="text" value={username} onChange={(event) => setUserName(event.target.value)}/>
            </label>
            <label>
                Comment:
                <textarea rows={4} cols={50} value={commentText} onChange={(event) => setCommentText(event.target.value)} />
            </label>         
            <button onClick={async () => {
                const result = await fetch(`/api/articles/${articleName}/add-comment`, {
                method: 'POST',
                body: JSON.stringify({username, comment: commentText}),
                headers: {
                    'Content-Type' : 'application/json'
                },
                })
                const body = await result.json()
                setArticleInfo(body)
                setUserName('')
                setCommentText('')}}>Add Comment</button>
        </div>
    )
}

export default AddCommentForm

