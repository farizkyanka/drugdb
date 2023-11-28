function ManufacturerList (
    {
        mfr = []
    }
) {
    return <>
    <ul>
    {mfr.map((manufacture, index) => (
    <li className="bg-blue-400 inline m-2 px-2 rounded text-white" key={index}>
    {manufacture}
    </li>
        ))}
    </ul>
    </>
}
export default ManufacturerList