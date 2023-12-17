import {ParsedOutput} from "@/app/ahc020/_components/type";

export const parseOutputValue = (outputValue: string): ParsedOutput => {

  if (outputValue == '') {
    return InitialParsedOutput
  }


  const read = outputValue.split(/\r\n|\n/);

  const PList = read[0]?.split(' ').map(x => Number(x));
  const BList = read[1]?.split(' ').map(x => Number(x));

  return {
    PList,
    BList
  }
}


export const InitialParsedOutput: ParsedOutput = {
  PList: [],
  BList: [],
}
