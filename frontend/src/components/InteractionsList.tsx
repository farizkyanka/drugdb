function InteractionsList (
    {
        interactions = [""]
    }
) {
    return <>
    <ul>
    {interactions.map((interaction, index) => (
    <input className="bg-blue-400 inline m-2 px-2 rounded text-white" name ="interactions" type="button" key={index} value={interaction}/>
        ))}
    </ul>
    </>
}
export default InteractionsList