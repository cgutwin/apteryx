import { GraphQLError, GraphQLScalarType, Kind } from "graphql"

const upcaPattern = /^(?=.*0)[0-9]{12}$/

const validate = (value: any) => {
  if (typeof value !== "string") {
    throw new TypeError(`Value is not of type string: ${value}`)
  }

  let valid = upcaPattern.test(value)

  if (!valid) {
    throw new TypeError(`Value is not a valid UPC-A code: ${value}`)
  }

  return value
}

const GraphQLUPCA: GraphQLScalarType = new GraphQLScalarType({
  name: "UPC",
  description: "A formatted UPC-A type. Represents a code value of length 12, inclusive of the final parity digit.",
  serialize: validate,
  parseValue: validate,
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Only strings are valid UPC-A types.`)
    }

    return validate(ast.value)
  }
})

export default GraphQLUPCA
