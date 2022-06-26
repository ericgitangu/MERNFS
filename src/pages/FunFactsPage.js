import React, {useState} from 'react'

const FunFactsPage = () => {

    const [planet, setPlanetName] = useState('')
    const [planetStats, setPlanetStats] = useState('')

    return (
        
        <div id="add-comment-form">
            <h5>Enter the name (First Character Capitalized e.g Uranus) one of the 8 recognized planets in the input field and get nerdy stats about them.</h5>
            <h6> ~ Data Source Mongo Atlas Sample Set [sample_guide.planets] </h6>
            <label>
                Planet:
                <input type="text" value={planet} onChange={(event) => setPlanetName(event.target.value)}/>
            </label>
            <label>
                Stats:
                <textarea rows={10} cols={150} value={planetStats} onChange={(event) => setPlanetStats(event.target.value)} />
            </label>         
            <button onClick={async () => {
                const result = await fetch(`/api/planets/${planet}`, {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json'
                },
                })
                const body = await result.json()
                setPlanetStats(JSON.stringify(body))
                }}>Show me planet stats</button>
        </div>    

    )

}

export default FunFactsPage