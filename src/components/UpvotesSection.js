import React from 'react'

const UpvotesSection = ({articleName, upvotes, setArticleInfo}) => {
    return (
        <div id="upvotes-section">
            <button onClick={async () => {
                const result = await fetch(`/api/articles/${articleName}/upvote`, {
                method: 'POST',})
                const body = await result.json()
                setArticleInfo(body)}}>Add upvote</button>
        </div>
    )
}

export default UpvotesSection