'use client'
import './input.css';

const Input = (props) => {
    return <input type={props.type} placeholder={props.placeholder} value={props.value} className="input" onChange={props.onChange}></input>
}

export default Input