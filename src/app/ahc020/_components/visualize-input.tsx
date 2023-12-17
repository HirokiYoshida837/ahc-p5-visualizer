import {ParsedInput} from "@/app/ahc020/type";


type Props = {
  input: ParsedInput,
}

export const VisualizeInput:React.FC<Props> =(props)=> {
  return(
    <>
      <>
        N: {props.input.N},
        M: {props.input.M},
        K: {props.input.K},
      </>
    </>
  )
}
