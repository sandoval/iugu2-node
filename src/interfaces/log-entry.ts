import { Object } from './object'

export interface LogEntry extends Object {
    description?: string

    notes?: string
}
