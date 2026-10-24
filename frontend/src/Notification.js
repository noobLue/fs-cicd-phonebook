

const Notification = ({obj}) => {
    if(!obj || obj.length === 0) return <div></div>

    const successStyle = {
        color: "green",
        background: "lightgreen",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    const failStyle = {
        color: "red",
        background: "lightred",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (<div className='error' style={obj[1] ? failStyle : successStyle}>{obj[0]}</div>);
}

export default Notification