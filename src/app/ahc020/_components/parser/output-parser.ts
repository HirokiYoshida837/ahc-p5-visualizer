import {ParsedOutput} from "@/app/ahc020/_components/type";

export const parseOutputValue = (outputValue: string): ParsedOutput[] => {

  if (outputValue == '') {
    return [InitialParsedOutput]
  }

  const ret = new Array<ParsedOutput>();
  const read = outputValue.split(/\r\n|\n/);

  for (let i = 0; i < read.length; i += 2) {

    if (read[i] == '') {
      break
    }

    const PList = read[i + 0]?.split(' ').map(x => Number(x));
    const BList = read[i + 1]?.split(' ').map(x => Number(x));
    ret.push({PList, BList})
  }

  return ret
}


export const InitialParsedOutput: ParsedOutput = {
  PList: [],
  BList: [],
}
