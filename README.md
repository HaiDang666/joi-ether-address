
# joi-ethereum-address

A fork from [joi-objectid](https://github.com/mkg20001/joi-objectid)   

A MongoDB Ethereum address validator for Joi.   

## use

`joi-ether-address` validates that the value is an address on ethereum block chain

It's used just like you'd use any other `Joi` type.

```js
const Joi = require('@hapi/joi')
Joi.ethereumAddress = require('joi-ethereum-address')(Joi)

const schema = Joi.object({
  id: Joi.ethereumAddress(),
  name: Joi.string().max(100),
  date: Joi.date()
})

```

### Installation

```
npm install joi-ethereum-address --save
```

### Development

#### running tests

- `npm test`

## License

[MIT](https://github.com/haidang666/joi-ethereum-address/blob/master/LICENSE)
