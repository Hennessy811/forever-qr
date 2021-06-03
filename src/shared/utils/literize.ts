const literalize = (str: string) => {
  return str.split(" ").map((i) => i[0])
}

export default literalize
