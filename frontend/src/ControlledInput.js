

const ControlledInput = ({input}) => {
    return (
      <div key={input.key}>{input.key} <input value={input.value} onChange={e=>input.callback(e.target.value)}/></div>
    )
}


export default ControlledInput