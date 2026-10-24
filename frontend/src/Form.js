import ControlledInput from "./ControlledInput"

const Form = ({inputs, submit}) => {
    return (
    <form>
      {inputs.map(input=><ControlledInput key={input.key} input={input} />)}
      <div><button type="submit" onClick={submit}>add</button></div>
    </form>)
    
}

export default Form