import { test } from 'node:test'
import * as assert from 'node:assert'
import { build } from '../helper'

test('GET cupcake', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/v2/cupcake'
  })
  assert.deepStrictEqual(JSON.parse(res.payload), { root: true })
})
