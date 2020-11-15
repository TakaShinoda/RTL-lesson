import React, { useState } from 'react'
import axios from 'axios'

export const MockServer = () => {
    const [clicked, setClicked] = useState(false)
    const [username, setUsername] = useState('')
    const [error, setError] = useState('')

    const fetchUser = async() => {
        axios.get('https://jsonplaceholder.typicode.com/users/1')
        .then((res) => {
            const {usename} = res.data
            setUsername(usename)
            setClicked(true)
        }).catch(() => {
            setError('Fetching Failed !')
        })
    }

    const buttonText = clicked ? 'Loaded' : 'Start'

    return (
        <div>
            <button onClick={fetchUser} disabled={clicked} >
                {buttonText}
            </button>
            {username && <h3>{username}</h3>}
            {error && <p data-testid='error'>{error}</p>}
        </div>
    )
}
