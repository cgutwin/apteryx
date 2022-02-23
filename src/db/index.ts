// @ts-ignore
import knexfile from "../../knexfile"
import { knex } from "knex"

const knexInstance = knex(knexfile[process.env.NODE_ENV as unknown as string || "development"])

export default knexInstance
