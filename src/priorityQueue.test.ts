import { assertEquals } from 'https://deno.land/std@0.178.0/testing/asserts.ts'
import { PriorityQueue } from './priorityQueue.ts'

const makePriorityObject = (name: string) => {
  return {
    name,
    priority: name.length
  }
}

Deno.test('isEmpty true and size 0 after creation', () => {
	const pq = new PriorityQueue()

  assertEquals(pq.isEmpty, true)
	assertEquals(pq.size, 0)
})

Deno.test('can add item', () => {
	const pq = new PriorityQueue()

  pq.insert(makePriorityObject('Test 1'))

	assertEquals(pq.size, 1)
  assertEquals(pq.isEmpty, false)
})

Deno.test({
  name: 'can add many items',
  only: false,
  fn: () => {
    const pq = new PriorityQueue()

    pq.insert(makePriorityObject('Test1'))
    pq.insert(makePriorityObject('Test 2'))
    pq.insert(makePriorityObject('Test 13'))

    assertEquals(pq.size, 3)
    assertEquals(pq.isEmpty, false)
  }
})

Deno.test({
  name: 'can delete max item',
  only: false,
  fn:  () => {
    const pq = new PriorityQueue()
    
    const higherPriorityItem = makePriorityObject('Test 22')
    
    pq.insert(makePriorityObject('Test1'))
    pq.insert(higherPriorityItem)
    pq.insert(makePriorityObject('Test 4'))

    const retValue = pq.deleteMax()
    
    assertEquals(pq.size, 2)
    assertEquals(retValue, higherPriorityItem)
    assertEquals(pq.isEmpty, false)

    const anotherHighPriority = makePriorityObject('Test 52')
    pq.insert(anotherHighPriority)
    const retValue2 = pq.deleteMax()

    assertEquals(pq.size, 2)
    assertEquals(retValue2, anotherHighPriority)
    assertEquals(pq.isEmpty, false)
  }
})
