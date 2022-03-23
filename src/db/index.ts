// @ts-ignore
import knexfile from "../../knexfile"
import { knex } from "knex"

// TODO: Make dynamic based on NODE_ENV. Set to production for now as some environment variables weren't loading.
const knexInstance = knex(knexfile["production"])

export default knexInstance
