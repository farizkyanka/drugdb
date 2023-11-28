function InteractionsList (
    {
        interactions = [""]
    }
) {
    return <>
    <ul>
    {interactions.map((interaction, index) => (
    <li className="bg-blue-400 inline m-2 px-2 rounded text-white" key={index}>
    {interaction}
    </li>
        ))}
    </ul>
    </>
}
export default InteractionsList