# iugu2-node
Another API wrapper for IUGU.com

iugu2-node is a [promisified](https://promisesaplus.com/), self-contained library, that interfaces with the [IUGU](https://iugu.com/) payment API.
It has no other runtime dependencies, relying only on NodeJS Promise and HTTPS libraries.

Also, since this is developed using TypeScript, everything has its type definitions. Even if you do not use TypeScript, you can simply import the library and it will work normally!

## Build status
[![Travis](https://img.shields.io/travis/shirayukikitsune/iugu2-node.svg)](https://travis-ci.org/shirayukikitsune/iugu2-node)
[![Coverage Status](https://coveralls.io/repos/github/shirayukikitsune/iugu2-node/badge.svg?branch=master)](https://coveralls.io/github/shirayukikitsune/iugu2-node?branch=master)
[![npm](https://img.shields.io/npm/v/iugu2-node.svg)](https://www.npmjs.com/package/iugu2-node)
![Dev Dependencies](https://img.shields.io/david/dev/shirayukikitsune/iugu2-node.svg)

## How to use

Using iugu2-node is as simple as importing the module, instantiate it, and start doing calls!

In Typescript, you can do it like this:

```
import { Iugu } from 'iugu2-node'
import { Customer } from 'iugu2-node/interfaces/customer'

const iugu = new Iugu('MY API TOKEN')

let customer: Customer = {
    name: 'Bruno Ferreira',
    email: 'email@server.com'
}
iugu.customer.create(customer).then(newCustomer => {
    customer = newCustomer
}).catch(error => {
    console.error(error)
})
```

For complete reference, see our [TypeDoc](https://shirayukikitsune.github.io/iugu2-node/)
